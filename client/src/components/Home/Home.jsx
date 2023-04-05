import { useEffect, useState } from "react"
import { Link  } from "react-router-dom";

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
        {randomRecipe &&
            <div>
                <div>You might Like</div>
                <Link to={`/recipes/${randomRecipe.idDrink}`}><img src={randomRecipe.strDrinkThumb}/></Link>
                
            </div>}
        </>
    )
}
export default Home