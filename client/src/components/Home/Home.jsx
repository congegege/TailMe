import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import LoginButton from "../auth0/LoginButton";
import LogoutButton from "../auth0/LogoutButton";
import CategoryList from "../Category/CategoryList";

const Home = () =>{
    const [randomRecipe,setRandomRecipe] = useState(null);
    useEffect(()=>{
        fetch("/api/randomCocktail")
        .then(res=>res.json())
        .then(resData=>setRandomRecipe(resData.data))
    },[])
    console.log(randomRecipe)
    
    return (
        <>
        <LoginButton/>
        <LogoutButton/>
        <CategoryList/>
        {randomRecipe &&
            <div>
                <div>You might Like</div>
                <Link to={`/recipes/${randomRecipe.idDrink}`}><img src={randomRecipe.strDrinkThumb}/></Link>
            </div>}
        </>
    )
}
export default Home