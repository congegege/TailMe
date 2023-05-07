import { useContext } from "react";
import styled, { keyframes } from "styled-components"
import { RecipesContext } from "../Context/RecipesContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const FirstIntro = () =>{
    //to render many text for scrolling text
    const textList = Array.from({length: 12}, (value, i) => i);
    //get the category list
    const {categoryList} = useContext(RecipesContext);
    //judge whther user hover on the second scrolling text
    const [isScrollingHover , setIsScrollingHover] = useState(false);

    return(
    <Wrapper>
        <TextSection>
            <Title>Tail</Title>
        </TextSection>
        <PictureContainer>
            <DrinkPicture src="https://cdn.discordapp.com/attachments/688213778206294154/1102125437884317706/chrism1_summer_drink_cocktail_white_background_Cinematic_35mm_l_7f8bddd7-477d-4133-b448-75b012697300-removebg-preview.png"/>
        </PictureContainer>
        <TextSection>
            <SecondTitle>Me</SecondTitle>
        </TextSection>
        <CrossOne>
            {/* duplicated so that when the first one rolled on the half the second one can fill it up */}
            {textList.map((text)=>{
                return <TextOne key={text}>Tail Me</TextOne>
            })}
            {textList.map((text,index)=>{
                return <TextOne key={index}>Tail Me</TextOne>
            })}
        </CrossOne>

        <CrossTwo onMouseEnter={()=>setIsScrollingHover(true)} onMouseLeave={()=>setIsScrollingHover(false)}>
            <Inner ishover={isScrollingHover}>
                {categoryList && categoryList.map((category)=>{
                    return <TextTwo to={`/categories/?strCategory=${category}` }key={category}>{category}</TextTwo>
                })}
            </Inner>
            <InnerTwo ishover={isScrollingHover}>
                    {categoryList && categoryList.map((category,index)=>{
                        return <TextTwo to={`/categories/?strCategory=${category}`} key={index}>{category}</TextTwo>
                    })}
            </InnerTwo>
        </CrossTwo>
    </Wrapper>
    )
}

const scrollingOne = keyframes`
    0% {
    transform: translateX(-100%)
    }
    100% {
    transform: translateX(100%)
}
`
const scrollingTwo = keyframes`
    0% {
    left: -100%;
    }
    100% {
    left: 100%;
}
`
const scrollingThree = keyframes`
    0% {
    opacity: 1;
    left: -100%;
    }
    100% {
    opacity: 1;
    left: 100%;
}
`

const TextOne = styled.span`
    display: inline-block;
    font-size: 30px;
    -webkit-text-stroke: #2e3e34;
	-webkit-text-stroke-width: 1px;
    font-family: 'Segoe UI', sans-serif;
    animation: ${scrollingOne} 3s linear infinite ;
    
`

const TextTwo = styled(Link)`
    
    display: inline-block;
    color: #e9edc9;
    font-size: 20px;
    font-family: 'Segoe UI', sans-serif;
    
    
    &:hover{
        cursor: pointer;
        color: white;
    }
`

const Inner = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    animation: ${scrollingTwo} 20s linear infinite ;
    animation-play-state: ${props=>props.ishover && "paused"};
`
const InnerTwo = styled.div`
    opacity: 0;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    animation-delay: 10s;
    animation: ${scrollingThree} 20s linear 10s infinite ;
    animation-play-state: ${props=>props.ishover && "paused"};
`

const CrossOne = styled.div`
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    bottom: 3px;
    width: 100%;
    height: 70px;
    background-color: #ffffff;
    transform: skewY(3deg);
    display: flex;
    align-items: center;
    color: transparent;
    justify-content: space-around;
	
`

const CrossTwo = styled.div`
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    bottom: 2px;
    width: 100%;
    height: 70px;
    background-color: #262726;
    transform: skewY(-3deg);
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    &:hover{
        color: white;
    }
`

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    position: relative;
    grid-template-columns: 3fr 4fr 3fr;
    align-items: center;
    justify-content: center;
    height: 75vh;
`

const TextSection = styled.div`
    align-self: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
`

const Title = styled.div`
    font-size: 100px;
    font-family: 'Bruno Ace', cursive;
    color: white;
    text-align:right;
`
const SecondTitle = styled.div`
    font-size: 100px;
    font-family: 'Bruno Ace', cursive;
    color: Black;
    transform: rotate(180deg);
    text-align: right;
    position: absolute;
    bottom: 20%;
    left: -10%;
`

const PictureContainer = styled.div`
    
`

const DrinkPicture = styled.img`
    width: 700px;
    
    
`

export default FirstIntro