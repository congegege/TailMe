import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header/Header"
import CommunityIntro from "./CommunityIntro";
import FirstIntro from "./FirstIntro";
import PopularDrink from "./PopularDrink";
import RandomRecommendation from "./RandomRecommendation";
import SecondIntro from "./SecondIntro";

const Home = () =>{
    
    return (
        <Wrapper>
        <Header/>
        <Container>
        <FirstIntro/>
        <SecondIntro/>
        <PopularDrink/>
        <RandomRecommendation/>
        <CommunityIntro/>
        </Container>
        
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
    margin-top: 120px;
`
export default Home