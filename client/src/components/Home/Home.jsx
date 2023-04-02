import { useEffect, useState } from "react"

const Home = () =>{
    const [randomRecipe,setRandomRecipe] = useState(null);
    useEffect(()=>{
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(res=>res.json())
        .then(resData=>setRandomRecipe(resData.drinks[0]))
    },[])
    console.log(randomRecipe)
    
    return (
        <>
    {randomRecipe &&<div>
    <div>You might Like</div>
    <img src={randomRecipe.strDrinkThumb
}/>
    </div>}
    </>
    )
}
export default Home