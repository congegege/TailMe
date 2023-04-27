import { useParams } from "react-router-dom";
import { useEffect ,  useState } from "react";
import CommunityCollectButton from "./CommunityCollectButton";
import styled, { keyframes } from "styled-components";
import AlcoholicPictureHandler from "../../IconHandlers/AlcoholicHandler";
import { useContext } from "react";
import { RecipesContext } from "../../Context/RecipesContext";
import Parser from "html-react-parser"

const PostDetail = () =>{
    const {id} = useParams();
    const [singlePostInfo , setSinglePostInfo] = useState(null);
    const {state} = useContext(RecipesContext)
    
    useEffect(()=>{
        fetch(`/api/community/posts/${id}`)
        .then(res=>res.json())
        .then(resData=>setSinglePostInfo(resData.data))
    },[singlePostInfo])

    if(!singlePostInfo || !state.user){
        return <>Loading</>
    }
    

    return (
        <Wrapper>
            <PictureContainer>
                <RecipePicture src={singlePostInfo.img}/>
            </PictureContainer>
            <RecipeInfoSection>
                <Title>
                <Category>
                    <DrinkName>{singlePostInfo.strDrink}</DrinkName>
                    <AlcoholicPictureHandler Alcoholic={singlePostInfo.strAlcoholic}/>
                    <CategoryName>{singlePostInfo.strAlcoholic}</CategoryName>
                </Category>
                </Title>
                
            <PostContent>
                <BasicInfo>
                        <ProfilePicture src={state.user.picture}/>
                        <Name>{state.user.name}</Name>
                        <Date>{singlePostInfo.date}</Date>
                </BasicInfo>        
                <Instruction id="post" >{Parser(singlePostInfo.post)}</Instruction>
            </PostContent>
            
        <CommunityCollectButton id={id} recipeInfo = {singlePostInfo}/>
        </RecipeInfoSection>
        </Wrapper>

    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns:  1fr 9fr;
    align-items: center;
    justify-items: center;
    background-color: #eff4e0;
    position: relative;
`

const RecipeInfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    padding: 30px;
    line-height: 35px;
    width: 60%;
`

const PictureContainer = styled.div`
    margin-left: 30%;
    display: flex;
    justify-content: center;
    position: relative;
    padding: 30px;
    margin-bottom: 6%;
    ::after {
        content: '';
        border-radius: 50%;
        display: block;
        position: absolute;
        top: 0;
        left: 2px;
        background-color: #b6ad90;
        height: 100%;
        width: 100%;
        
        -webkit-mask: radial-gradient(
            farthest-side,
            transparent calc(100% - 2px),
            #fff calc(100% - 2px)
        );
        mask: radial-gradient(
            farthest-side,
            transparent calc(100% - 2px),
            #fff calc(100% - 2px)
    );
    }
`

const RecipePicture = styled.img`
    height: 400px;
    border-radius: 50%;
    position: relative;

`

const flicker = keyframes`
    0% {
		opacity: 0.5;
		text-shadow: 2px 2px 5px #cbdfbd;
	}
	100% {
		opacity: 1;
		text-shadow: 2px 2px 8px #cbdfbd;
	}
`

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 5px dashed #b6ad90;
    align-items: center;
`

const DrinkName = styled.h1` 
    margin: 2% 0 ;
    font-family: var(--font-category-heading);
    font-size:60px;
    width: 100%;
    text-transform: uppercase;
	color: transparent;
	-webkit-text-stroke: #08361b;
	-webkit-text-stroke-width: 3px;
	text-shadow: 2px 2px 5px #cbdfbd;
	letter-spacing: 0.2em;
	animation: ${flicker} 0.5s ease-in-out infinite alternate;
`

const ProfilePicture = styled.img`
    border-radius: 50%;
    height: 70px;
    border: 3px solid #3a5a40;
`

const Date =styled.div`
    position: absolute;
    font-family: "Comic Neue";
    font-size: 20px;
    right: 4%;
`

const Category = styled.div`
    display: flex;
    gap: 2%;
    align-items: center;
    font-size: 20px;
`

const CategoryName = styled.div`
    color: black;
    font-family: var(--font-category);
    text-shadow: 1px 1px white, -1px -1px #616661;
`

const Name = styled.div`
    font-size: 25px;
    font-family: "Comic Neue" ;
    text-shadow: 0px 0px 2px black;
`

const BasicInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1%;
    width: 100%;
    position: relative;
    padding: 2%;
`

const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2%;
    
`

const Instruction = styled.div`
    padding: 2% 0;
    border: none;
    font-size: 22px;
    font-family: "Nunito Sans";
    word-wrap: break-word;
`

export default PostDetail;