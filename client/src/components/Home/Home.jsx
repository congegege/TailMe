import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import CategoryList from "../Category/CategoryList";
import Header from "../Header/Header"

const Home = () =>{
    const [randomRecipe,setRandomRecipe] = useState(null);
    useEffect(()=>{
        fetch("/api/randomCocktail")
        .then(res=>res.json())
        .then(resData=>setRandomRecipe(resData.data))
    },[])
    
    return (
        <>
        <Header/>
        <Link to={"/community"}>Community</Link>
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