import { useContext , useState, useEffect } from "react";
import { RecipesContext } from "../Context/RecipesContext";
import styled from "styled-components";
import { useParams ,Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { CommunityContext } from "../Context/CommunityContext";
import CategoryLoading from "../Loading/CategoryLoading";
import DateSelector from "./DatePicker";

const DashBoard = () =>{
    const {id} = useParams()
    const {state} = useContext(RecipesContext);
    const[collectionList,setCollectionList] = useState(null);
    const[ratedList , setRatedList] = useState(null);
    const[userCommentsList, setUserCommentsList] = useState(null);
    const {clickedSection,setClickedSection} = useContext(CommunityContext);


    

    useEffect(()=>{
        fetch(`/api/users/collections/${id}`)
        .then(res=>res.json())
        .then(resData=>setCollectionList(resData.data))
    },[])

    useEffect(()=>{
        fetch(`/api/ratedDrink/${id}`)
        .then(res=>res.json())
        .then(resData=>setRatedList(resData.data))
    },[])

    useEffect(()=>{
        fetch(`/api/userComments/${id}`)
        .then(res=>res.json())
        .then(resData=>setUserCommentsList(resData.data))
    },[])

    if(!collectionList || !ratedList || !userCommentsList || !state.user){
        return <CategoryLoading/>
    }

    
        const {name,picture,email,updated_at,nickname} = state.user;
        const today = new Date().getTime();
        const joinDate = new Date(updated_at).getTime();
        const joinDays = Math.floor((today-joinDate)/(1000*60*60*24));
        
        
        return (
            <>
            <FirstSection>
                <TextSection>
                <Greeting>Hello {name.length > nickname.length ? nickname : name},</Greeting>
                {joinDays !== 0 ? <JoinDays><Days>{joinDays}</Days> days! since you joined, </JoinDays> : <JoinDays>Welcome to join us!</JoinDays>}
                <JoinDays>Which drink you want for today? </JoinDays>
                </TextSection>
                <Picture src="https://cdn.discordapp.com/attachments/688213778206294154/1101752414941491220/Aegyoking_a_young_female_wizard_wearing_a_wizard_drinking_green_6c4d7436-5c3d-4e4f-9dbc-79874fb9d288-removebg-preview.png"/>
            </FirstSection>
            <DashBoardContainer>
                <Content>
                <UserInfo>
                <UserProfile src={picture}/>
                    <div>
                        <Name>{name.length > nickname.length ? nickname : name}</Name>
                        <Email>{email}</Email>
                    
                    </div>
                </UserInfo>
                <div>
                    <Title>Your Activity</Title>
                    <ActivitySection onClick={()=>setClickedSection("Collection")}>
                        <SingleActivity index = {1}>
                            <Type>Rate</Type>
                            <Num>{ratedList.length}</Num>
                        </SingleActivity>
                        <SingleActivity index = {2}>
                            <Type index={2}>Comment</Type>
                            <Num index={2}>{userCommentsList.length}</Num>
                        </SingleActivity>
                        <SingleActivity index = {3} >
                            <Type>Collections</Type>
                            <Num>{collectionList.length}</Num>
                        </SingleActivity>
                    </ActivitySection>
                </div>
                <Title>Your collections</Title>
                <CollectionSection isCollected ={collectionList.length == 0}>
                {collectionList.map((collection,index)=>{
                    if(index < 2){
                        return (
                            <Container order={-index} key={collection.id} to={`/recipes/${collection.id}`}>
                            <RecipePicture src={collection.strDrinkThumb}/>
                            <DrinkName>{collection.strDrink}</DrinkName>
                            </Container>
                        ) 
                    }
                    
                
                    })}
                    {collectionList.length == 0 
                    ?<ExploreMassage to={"/categories"}>No collection yet, explore time!<ArrowRight size={28}/></ExploreMassage> 
                    : <CheckMoreButton onClick={()=>setClickedSection("Collection")}>To check more<ArrowRight size={28}/></CheckMoreButton>}
            </CollectionSection>
            </Content>
             <CalendarSection><DateSelector /></CalendarSection> 
            </DashBoardContainer>
            </>
        )
    
    
    
}

const ExploreMassage = styled(Link)`
    color : black;
    display: flex;
    align-items: center;
    font-size: 20px;
    padding: 2%;
    opacity: 0.4;
    font-family: "Comic Neue";
    &:hover{
        opacity: 0.8;
        color:black;
    }
`

const CheckMoreButton = styled.button`
    background-color: transparent;
    display: flex;
    align-items: center;
    font-size: 20px;
    padding: 2%;
    opacity: 0.4;
    font-family: "Comic Neue";
    &:hover{
        opacity: 0.6;
    }
`

const CollectionSection = styled.div`
    width: 85%;
    display: ${props=>props.isCollected ? "flex" : "grid"};
    grid-template-columns: repeat(3, 1fr);
    padding: 3% 0;
    align-items:center;
`

const Container = styled(Link)`
    margin: 2%;
    order: ${props=>props.order};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const DrinkName = styled.div`
    text-align: center;
    font-family: "Comic Neue";
    font-size: 30px;
    color: #6b9080;
`

const RecipePicture = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 30%;
`

const FirstSection = styled.div`
    width: 115%;
    height: 400px;
    background-color: #cad2c5;
    margin-left: -15%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10%;
    
`

const TextSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 35%;
`

const JoinDays = styled.div`
    text-align: end;
    font-size:25px;
    padding: 1%;
    background-image: url(https://img.freepik.com/free-photo/abstract-pattern-colored-oil-bubbles-water_23-2147876149.jpg?w=1480&t=st=1682800836~exp=1682801436~hmac=005c7c851b7f41feceef8be68d3637edda9c477b878cdf1ac805b23cc91c0d6d);
    color: transparent;
    background-size: cover;
    background-clip: text;
    -webkit-background-clip: text;
    font-family: 'Kanit', sans-serif;

`

const Days = styled.span`
    font-size: 90px;
    padding: 2%;
    background-image: url(https://img.freepik.com/free-vector/watercolor-abstract-background-with-grunge-effect_1340-4293.jpg?w=1060&t=st=1682803861~exp=1682804461~hmac=80f3cbe05bb5149af223e7512085dc15bde8bcaeacd1970a843e753740a55996);
    color: transparent;
    background-size: cover;
    background-clip: text;
    -webkit-background-clip: text;
    font-family:'Kanit', sans-serif;
`

const Greeting = styled.div`
    font-size: 70px;
    background-image: url(https://img.freepik.com/free-photo/abstract-pattern-colored-oil-bubbles-water_23-2147876149.jpg?w=1480&t=st=1682800836~exp=1682801436~hmac=005c7c851b7f41feceef8be68d3637edda9c477b878cdf1ac805b23cc91c0d6d);
    color: transparent;
    background-size: cover;
    background-clip: text;
    -webkit-background-clip: text;
    font-family:'Kanit', sans-serif;
    
    
`

const Picture = styled.img`
    width: 400px;
    margin-right: 15%;
`

const DashBoardContainer = styled.div`
    margin-left: 5%;
    width: 90%;
    display: flex;
    justify-content: space-between;
`

const UserInfo = styled.div`
    margin-top: -60px;
    display: flex;
    gap: 4%;
    align-items: center;
    height: 100px;
`

const Info = styled.div`
    
`

const Name = styled.div`
    font-size: 27px;
    color: #f6f9e5;
    padding: 1% 0;
`

const Email = styled.div`
    font-size: 15px;
    color: #52796f;
`

const UserProfile = styled.img`
    height: 100px;
    border-radius: 50%;
`

const CalendarSection = styled.div`
    padding: 4%;
`

const Content = styled.div`
    width: 60%;
`

const Title = styled.div`
    font-family:"Lexend Deca";
    font-size: 30px;
    align-self: flex-start;
    padding: 2% 0;
    border-bottom: 5px dashed #ddbea9;
    width: 80%;
    color: #6c584c;
`
const SingleActivity =  styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    background-color:${props=>props.index ==1 ? "#cad2c5" : props.index ==2 ? "#52796f" : "#e6ccb2"};
    border-radius: 50px;
    position: relative;
    &:hover{
        cursor: pointer;
        background-color:#b7c189;
    }
`

const Type = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 20px;
    color: ${props=>props.index ==2 ? "white" : "#52796f"};
    font-family: 'Kanit', sans-serif;
    
`

const Num = styled.div`
    font-size: 70px;
    padding: 2%;
    background-image: url(https://img.freepik.com/free-photo/abstract-pattern-colored-oil-bubbles-water_23-2147876149.jpg?w=1480&t=st=1682800836~exp=1682801436~hmac=005c7c851b7f41feceef8be68d3637edda9c477b878cdf1ac805b23cc91c0d6d);
    color: ${props=>props.index ==2 ? "white" : "transparent"};
    background-size: cover;
    background-clip: text;
    -webkit-background-clip: text;
    font-family:'Kanit', sans-serif;
`

const ActivitySection = styled.div`
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: center;
    gap: 4%;
    padding: 2% 0;
`

export default DashBoard