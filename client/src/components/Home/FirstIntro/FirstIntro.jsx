import { useContext } from "react";
import { RecipesContext } from "../../Context/RecipesContext";
import { useState } from "react";
import { Wrapper,TextSection,Title,
    PictureContainer,DrinkPicture,CrossTwo,
    SecondTitle,CrossOne,TextOne,
    TextTwo,Inner,InnerTwo } from "./FirstIntroStyle";

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


export default FirstIntro