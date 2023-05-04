import { useContext, useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom";
import AverageRate from "./AverageRate";
import CollectButton from "./CollectButton";
import styled, { keyframes } from "styled-components";
import AlcoholicPictureHandler from "../IconHandlers/AlcoholicHandler";
import CategoryPictureHandler from "../IconHandlers/CategoryIconHandler";
import { RecipesContext } from "../Context/RecipesContext";
import GetComments from "./GetComments";
import StarRating from "./StarRating";
import { useAuth0 } from "@auth0/auth0-react";
import DetailHeader from "../Header/DetailHeader";


const RecipesDetail = () =>{
    //to store the drink id so that we can fetch the info by id
    const {id} = useParams();
    //maximum 15 ingredients created the array from 1 to 15 so that we can map through the list
    const ingredientsNumList = Array.from({length: 15}, (value, i) => i + 1)
    //to store the recipeInfo
    const [recipeInfo,setRecipeInfo] = useState(null);
    //to jusdge whether user hover on the ingresients
    const [isHover ,  setIsHover] = useState(false);
    //to store the ingresient img url when user hover on one
    const [hoverIngredient , setHoverIngredient] = useState(null);
    //get the user info from the context
    const {state} = useContext(RecipesContext);
    //to judge the status whether the comment is posted
    const [isPosted , setIsPosted] = useState(false);
    // to store the average rate when fetching
    const [averageRate ,  setAverageRate] = useState(null);
    //limit the access if use is not login
    const {isAuthenticated} = useAuth0();


    let ingredients = ingredientsNumList.filter((num)=>{
        if(recipeInfo){
            let ingredientKey = "strIngredient" + num ;
            return recipeInfo[ingredientKey]
        }
        
    })

    //fetch the data bt id
    useEffect(()=>{
        fetch(`/api/cocktails/${id}`)
        .then(res=>res.json())
        .then(resData=>setRecipeInfo(resData.data))
    },[])
    

    //will replace with loading componet , put it there first to avoid the error
    if(isAuthenticated){
        if(!recipeInfo || !state.user){
            return <>Loading</>
        }
    }
    else{
        if(!recipeInfo){
            return <>Loading</>
        }
    }
    
    return (
        <>
        <DetailHeader/>
        <Wrapper>
            <RecipeContainer>
                <BasicInfoSection>
                    <Title>
                        <DrinkName>{recipeInfo.strDrink}</DrinkName>
                        <AverageRate id={id} averageRate={averageRate} setAverageRate={setAverageRate}/>
                    </Title> 

                    <CategorySection>
                        <Category to={`/categories/?strAlcoholic=${recipeInfo.strAlcoholic}`}>
                                <CategoryName>{recipeInfo.strAlcoholic}</CategoryName>
                                <AlcoholicPictureHandler Alcoholic={recipeInfo.strAlcoholic}/>
                        </Category> 
                                
                        <Category to={`/categories/?strCategory=${recipeInfo.strCategory}`}>
                            <CategoryName>{recipeInfo.strCategory}</CategoryName>
                            <CategoryPictureHandler category={recipeInfo.strCategory}/>
                        </Category>
                                
                    </CategorySection>
                            
                            
                            <Instrution>{recipeInfo.strInstructions.slice(0,1).toUpperCase()}{recipeInfo.strInstructions.slice(1)}</Instrution>
                            <CollectButton id={id} recipeInfo={recipeInfo}/>
                        </BasicInfoSection>

                        <PictureSection>
                            <PictureContainer>
                                <RecipePicture src={!isHover ? recipeInfo.strDrinkThumb : `https://www.thecocktaildb.com/images/ingredients/${hoverIngredient}.png`} />
                            </PictureContainer>
                            {isAuthenticated && <StarRating id={id}/>}
                        </PictureSection>

                        
                        

                        <IngredientSection>
                        {ingredients.map((ingredient)=>{
                            let ingredientKey = "strIngredient" + ingredient ;
                            let measureKey = "strMeasure" + ingredient ;
                            
                                return (
                                    <SingleIngredient key={ingredientKey} onMouseEnter={()=>{setIsHover(true) ;setHoverIngredient(recipeInfo[ingredientKey])}} onMouseLeave={()=>{setIsHover(false);setHoverIngredient(null)}}>
                                    <div >{recipeInfo[ingredientKey]} :</div>
                                    {recipeInfo[measureKey] && <Measurement>{recipeInfo[measureKey]}</Measurement>}
                                    </SingleIngredient>
                                )
                        
                        })}
                        </IngredientSection>
                        
        </RecipeContainer>

        <ReviewSection>
            <CommentsContainer>
            
                <GetComments id={id} isPosted={isPosted} setIsPosted={setIsPosted} averageRate={averageRate}/>
            
            </CommentsContainer>
        </ReviewSection>

        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fdfbec;
`

const RecipeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100vh;
    align-items: center;
    justify-items: center;
`

const PictureSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PictureContainer = styled.div`
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
            #fff calc(100% - 2px + 1px)
        );
        mask: radial-gradient(
            farthest-side,
            transparent calc(100% - 2px),
            #fff calc(100% - 2px + 1px)
    );
    }
`

const RecipePicture = styled.img`
    border-radius: 50%;
    position: relative;
    height: 650px;
    width: 650px;
    object-fit: cover;
`

const BasicInfoSection = styled.div`
    height: 90%;
    display: flex;
    flex-direction: column;
    gap: 5%;
    justify-content: center;
    padding: 10%;
    line-height: 35px;
    width: 80%;
`

const Title = styled.div`
    padding: 5% 0;
    display: flex;
    flex-direction: column;
    border-bottom: 5px dashed #b6ad90;
`

const IngredientSection = styled.div`
width: 70%;
height: 40%;
display: flex;
flex-direction: column;
justify-content: center;
gap: 8%;
position: relative;
top: -5%;
`

const SingleIngredient = styled.div`
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px dashed #b6ad90;
    gap: 2%;
    font-family: "Titillium Web";
    &:hover{
        cursor: pointer;
        color:#a3b18a ;
    }
`

const Measurement = styled.div`
    color: #a68a64;
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

const DrinkName = styled.h1` 
    margin: 2% 0 ;
    font-family: var(--font-category-heading);
    font-size:60px;
    width: 120%;
    text-transform: uppercase;
	color: transparent;
	-webkit-text-stroke: #08361b;
	-webkit-text-stroke-width: 3px;
	text-shadow: 2px 2px 5px #cbdfbd;
	letter-spacing: 0.2em;
	animation: ${flicker} 0.5s ease-in-out infinite alternate;
`

const CategorySection = styled.div`
    display: flex;
    gap: 5%;
    
`

const Category = styled(Link)`
    width: 100%;
    display: flex;
    gap: 2%;
    align-items: center;
    font-size: 20px;
    &:hover{
        text-decoration: underline wavy 1px green;
    }
`

const CategoryName = styled.div`
    color: black;
    font-family: var(--font-category);
    text-shadow: 1px 1px white, -1px -1px #616661;
    &:hover{
        color:#cbdfbd ;
    }
`

const Instrution = styled.div`
    font-family: "Architects Daughter";
    font-size: 20px;
`

const ReviewSection = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 30%;
`

const CommentsContainer = styled.div`
    width: 100%;
    border-top: 5px dashed #b5ae95;
    display: flex;
    justify-content: center;
    background-color: #ccd5ae;
`

const Comments = styled.div`
    
`



export default RecipesDetail;