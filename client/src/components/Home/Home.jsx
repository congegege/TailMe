import { useEffect, useState , useContext } from "react";
import { Link  } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header/Header"
import Loading from "../Loading/Loading";
import CommunityIntro from "./CommunityIntro";
import FirstIntro from "./FirstIntro/FirstIntro";
import PopularDrink from "./PopularDrink";
import RandomRecommendation from "./RandomRecommendation";
import SecondIntro from "./SecondIntro/SecondIntro";
import { RecipesContext } from "../Context/RecipesContext";
import Footer from "../Footer/Footer";
import Error from "../error/Error";

const Home = () =>{
    //get the randomRecipe Info
    const [randomRecipe,setRandomRecipe] = useState(null);
    //get the category List
    const {categoryList} = useContext(RecipesContext);
    //set the error when catch one
    const [isError,setIsError] = useState(false);

    //get the randomRecipe Info
    useEffect(()=>{
        fetch("/api/randomCocktail")
        .then(res=>res.json())
        .then(resData=>setRandomRecipe(resData.data))
        .catch(err=>setIsError(true))
    },[])

    if(!randomRecipe || !categoryList){
        return <Loading/>
    }

    if(isError){
        return <Error/>
    }

    return (
        <Wrapper>
            <Header/>
            <Container>
                <FirstIntro/>
                <SecondIntro/>
                <PopularDrink/>
                <RandomRecommendation randomRecipe={randomRecipe}/>
                <CommunityIntro/>
            </Container>
            <Footer/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #e6e8e6;
`

const Container = styled.div`
    
`
export default Home