import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import styled from "styled-components";
import {ArrowRight} from "@phosphor-icons/react"

const RandomRecommendation = () =>{
     //maximum 15 ingredients created the array from 1 to 15 so that we can map through the list
    const ingredientsNumList = Array.from({length: 15}, (value, i) => i + 1)

    const [randomRecipe,setRandomRecipe] = useState(null);
    const [isHover ,  setIsHover] = useState(false);
    console.log(isHover)

    useEffect(()=>{
        fetch("/api/randomCocktail")
        .then(res=>res.json())
        .then(resData=>setRandomRecipe(resData.data))
    },[])

    let ingredients = ingredientsNumList.filter((num)=>{
        if(randomRecipe){
            let ingredientKey = "strIngredient" + num ;
            return randomRecipe[ingredientKey]
        }
        
    })

    console.log(ingredients)
    
    return (
        <>
        {randomRecipe &&
            <Wrapper onMouseLeave={()=>setIsHover(false)}>
                    <DrinkPicture src={randomRecipe.strDrinkThumb} onMouseEnter={()=>setIsHover(false)}/>
                    
                    <TextSection ishover={isHover} >
                        
                        <CheckSection to={`/recipes/${randomRecipe.idDrink}`}>More Detail</CheckSection>
                        <InfoSection onMouseEnter={()=>{setIsHover(true)}} >
                        <DrinkName ><Title>" Tail me, </Title>{randomRecipe.strDrink}"
                        </DrinkName>
                        <IngredientSection >
                        {ingredients.map((ingredient,index)=>{
                            let ingredientKey = "strIngredient" + ingredient ;
                            let measureKey = "strMeasure" + ingredient ;
                            if(index <= 5){
                                return (
                                    <SingleIngredient key={ingredientKey}>
                                    <div >{randomRecipe[ingredientKey]} :</div>
                                    {randomRecipe[measureKey] && <Measurement>{randomRecipe[measureKey]}</Measurement>}
                                    </SingleIngredient>
                                )
                            }
                            
                        
                        })}
                        </IngredientSection>
                        {ingredients.length > 6 && <Message><ArrowRight size={30}/>More Ingredients</Message>}
                        </InfoSection>
                        
                    </TextSection>
            </Wrapper>}
        
        
        </>
    )
}

const Message = styled.div`
    align-self:flex-end;
    font-size: 30px;
    margin-right: 5%;
    display: flex;
    align-items: center;
    font-family: "Patrick Hand";
    color: #e9f5db;
`

const Wrapper = styled.div`
    display: flex;
`

const TextSection = styled.div`
    width: 50%;
    position: relative;
    transition: all 0.3s ease-in;
    transform-style: preserve-3d;
    transform: ${props=>props.ishover && "rotateY(180deg)"};
    
    &:hover{
        cursor: pointer;
    }
    
`

const InfoSection = styled.div`
    background-color: #6c847e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10%;
    backface-visibility: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    perspective: 1000px;
`

const CheckSection = styled(Link)`
    backface-visibility: hidden;
    background-color: #27312e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 100px;
    font-family: "Patrick Hand";
    color: white;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    text-decoration: underline 2px solid white;
    transform:rotateY(180deg);
    &:hover{
        color: #dedbd2;
    }
`

const DrinkName = styled.div`
    font-family: "Patrick Hand";
    font-size: 65px;
    color: #aaf8db;
    
`

const Title = styled.span`
    font-family: "Patrick Hand";
    font-size: 65px;
    color: #21120a;
`


const DrinkPicture = styled.img`
    width:50%;
    height: 90vh;
    object-fit: cover;
`

const IngredientSection = styled.div`
width: 50%;
height: 40%;
display: flex;
flex-direction: column;
justify-content: center;
gap: 10%;
`

const SingleIngredient = styled.div`
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px dashed #b6ad90;
    gap: 2%;
    font-family: "Titillium Web";
    color: #272727;
    
`

const Measurement = styled.div`
    color: #cbc7c1;
`

export default RandomRecommendation;