import { useEffect , useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import Error from "../error/Error";
import DetailLoadingButton from "../Loading/DetailLoadingButton";

const PopularDrink = () =>{
    //to store the popular drink Info
    const [popularDrinkList , setpopularDrinkList] = useState(null);
    //judge whether user hover on the drink name
    const [hoverDrink ,  setHoverDrink] = useState(null);
    //catch the error if there is one
    const [isError , setIsError] = useState(false);

    useEffect(()=>{
        fetch("/api/popularDrink")
        .then(res=>res.json())
        .then(resData=>{
            setpopularDrinkList(resData.data);
        })
        .catch(err=>{setIsError(true)})
    },[])
    

    if(!popularDrinkList){
        return <DetailLoadingButton/>
    }

    if(isError){
        return <Error/>
    }
    
    return (
        <Wrapper>
            <PopularDrinkContainer>
                <Frame src={"https://cdn.discordapp.com/attachments/688213778206294154/1102263559041327195/realistic-burned-paper-texture_52683-73921-removebg-preview.png"} />
            
                <NameContainer>
                    <Title>Trending Drink</Title>
                    {popularDrinkList.map((popularDrink)=>{
                        const {idDrink,strDrink,strDrinkThumb} = popularDrink
                        return (
                                    <DrinkName key={idDrink} to={`/recipes/${idDrink}`} ishover={strDrinkThumb == hoverDrink ? true : false}>
                                        <div onMouseEnter={()=>{setHoverDrink(strDrinkThumb)}}>{strDrink}</div>
                                    </DrinkName>
                                )
                    })}
                </NameContainer>
            
            </PopularDrinkContainer>
            <DrinkPicture src={hoverDrink ? hoverDrink : popularDrinkList[0]["strDrinkThumb"]}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
`

const PopularDrinkContainer = styled.div`
    position: relative;
    width:50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 0;
    background-image: url(https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682875795/3185113_ucsxzs.jpg);
`

const DrinkPicture = styled.img`
    width:50%;
    height: 100vh;
    object-fit: cover;
`

const Frame = styled.img`
    width: 90%;
    height: 90%;
    position: absolute;
    margin: 2%;
    z-index: 0;
    opacity: 0.95;
    filter:    brightness(90%) contrast(80%);
`

const Title = styled.h1`
    font-family: "Patrick Hand";
    font-size: 65px;
    color: #21120a;
`

const DrinkName = styled(Link)`
font-size: 40px;
color: black;
margin: 0.3%;
font-family: "Architects Daughter", cursive;
text-decoration: ${props=>props.ishover && "underline solid 3px black"} ;

&:hover{
    color: #131f12;
}
`


const NameContainer = styled.div`
    z-index: 1;
    position: absolute;
    margin: 2%;
    height: 60%;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center ;
`

export default PopularDrink;