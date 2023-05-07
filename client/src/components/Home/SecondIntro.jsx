import styled ,{css, keyframes} from "styled-components";
import {Plus ,NavigationArrow} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SecondIntro = () =>{
    const [isTypeWritterPlayed , setIsTypeWritterPlayed] = useState(false);
    const intro = useRef(null);

useEffect(()=>{

    const animationHandler = (entry) =>{
        setIsTypeWritterPlayed(entry[0].isIntersecting)
    }

    const observer = new IntersectionObserver(
        animationHandler,{
        threshold:1,
    })
    observer.observe(intro.current);

    return()=>{
        observer.disconnect();
    }
},[]);

    return (
        <Wrapper >
                <Picture isPlayed={isTypeWritterPlayed}  src="https://media.discordapp.net/attachments/688213778206294154/1102122858664169562/corgidreams_dramatic_dynamic_photograph_of_a_magical_sparkling__e55256fe-b85d-49dd-8dfa-13ec09f82c62.png?width=397&height=597"/>
                <TitleContainer ref={intro}>
                    {isTypeWritterPlayed && <Title>TAIL ME A DRINK</Title>}
                    <SecondTitle><Num>400<Plus weight="bold" stroke="#08361b" strokeWidth="10px"/></Num>Recipes</SecondTitle>
                    <ThirdTitle>450<Plus />Ingredients to explore</ThirdTitle>
                    <Content>Bring the bar to your home.</Content>
                    <Content>Detailed recipes are provided for every occasion, go dive in!! perpare your shaker!!</Content>
                    <Content>It's shake time!</Content>
                    <Explore to={`/categories`}>Explore Now<NavigationArrow size={30} weight="bold"/></Explore>
                </TitleContainer>
                <PictureTwo isPlayed={isTypeWritterPlayed} src="https://media.discordapp.net/attachments/688213778206294154/1102134774103015444/Aegyoking_None_dd219057-7393-4857-a538-76c914758a90.png?width=597&height=597"/>
        </Wrapper>
    )
}

const TitleContainer = styled.div`
    width: 39%;
    height: 52.6%;
    position: absolute;
    background-color: #bec4ab;
    left: 31%;
    z-index:0;
    
`

const typing = keyframes`
    from{
        width:0%;
    }
    to{
        width:90%;
    }
`

const blinkingCursor = keyframes`
    0%{
        border-color: transparent;
    }
    50%{
        border-color: #425047;
    }
    100%{
        border-color:transparent;
    }
`

const Title = styled.div`
    border-right: 5px solid #425047;
    white-space: nowrap;
    font-size: 80px;
    position: absolute;
    top: -25%;
    padding-left: 1%;
    overflow: hidden;
    animation: ${typing} 2s steps(30) ,${blinkingCursor} 0.8s step-end infinite;
`

const SecondTitle = styled.div`
    font-size: 60px;
    display: flex;
    padding: 3%;
    font-family: "Lexend Deca";
`
const ThirdTitle = styled.div`
    font-size: 30px;
    display: flex;
    padding: 3%;
    font-family: "Titillium Web";
`

const Content = styled.div`
    padding: 0 3%;
    line-height: 50px;
    font-family: "Titillium Web";
    font-size: 20px;
`

const Explore = styled(Link)`
    margin: 3%;
    display: flex;
    height: 30px;
    font-size:40px ;
    align-items: flex-end;
    justify-content: center;
    gap: 1%;
    font-family: "Patrick Hand";
    color: #49571b;
    &:hover{
        cursor: pointer;
        color: white;
    }
`

const Num = styled.span`
    display: flex;
    align-items: center;
    color: #bfecdf;
    -webkit-text-stroke: #08361b;
	-webkit-text-stroke-width: 3px;
`

const sideUp = keyframes`
    from {
        opacity: 0.3;
        transform: translateY(20%);
    }

    to {
        opacity: 1;
    transform: translate(0);
    }
`

const PictureTwo = styled.img`
    position: absolute;
    width: 20%;
    height: 70%;
    object-fit: cover;
    left: 70%;
    padding-left: 1%;
    padding-bottom: 1%;
    border-left: 1px solid green ;
    border-bottom: 1px solid green ;
    z-index:1;
    animation: ${props=>props.isPlayed && css`${sideUp} 0.8s ease-in 1 forwards`};
`


const Wrapper = styled.div`
    height: 85vh;
    color: black;
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 18%;
`

const sideIn = keyframes`
    from {
        opacity: 0.3;
        transform: translateY(-20%);
    }

    to {
        opacity: 1;
    transform: translate(0);
    }
`

const Picture = styled.img`
    width: 20%;
    height: 70%;
    object-fit: cover;
    position: absolute;
    top: -20%;
    left: 10%;
    padding-right: 1%;
    padding-bottom: 1%;
    border-right: 1px solid green ;
    border-bottom: 1px solid green ;
    z-index:1;
    animation: ${props=>props.isPlayed && css`${sideIn} 0.5s ease-in 1 forwards`};
`

export default SecondIntro;