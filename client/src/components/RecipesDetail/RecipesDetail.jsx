import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";
import PostComment from "./Comment";
import AverageRate from "./AverageRate";
import CollectButton from "./CollectButton";
import { RecipesContext } from "../Context/RecipesContext";


const RecipesDetail = () =>{
    //to store the drink id so that we can fetch the info by id
    const {id} = useParams();
    //maximum 15 ingredients created the array from 1 to 15 so that we can map through the list
    const ingredientsList = Array.from({length: 15}, (value, i) => i + 1)
    //to store the recipeInfo
    const {recipeInfo,setRecipeInfo} = useContext(RecipesContext);

    //fetch the data bt id
    useEffect(()=>{
        fetch(`/api/cocktails/${id}`)
        .then(res=>res.json())
        .then(resData=>setRecipeInfo(resData.data))
    },[])

    console.log(recipeInfo)

    //will replace with loading componet , put it there first to avoid the error
    if(!recipeInfo){
        return <>Loading</>
    }
    
    return (
        <>
        <div>{recipeInfo.strDrink}</div>
        <div>{recipeInfo.strAlcoholic}</div>
        <div>{recipeInfo.strCategory}</div>
        <AverageRate />
        <img src={recipeInfo.strDrinkThumb} />
        <div>{recipeInfo.strInstructions}</div>
        {ingredientsList.map((ingredient)=>{
            let ingredientKey = "strIngredient" + ingredient ;
            let measureKey = "strMeasure" + ingredient ;
            
            if(recipeInfo[ingredientKey]){
                return (
                    <div key={ingredientKey}>
                    <div >{recipeInfo[ingredientKey]}</div>
                    {recipeInfo[measureKey] && <div>{recipeInfo[measureKey]}</div>}
                    </div>
                )
            }
        })}

        <CollectButton id={id}/>

        <StarRating id={id}/>
        <PostComment id={id}/>
        
        
        </>
    )
}

export default RecipesDetail;