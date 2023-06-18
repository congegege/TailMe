import {Plus ,NavigationArrow} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { TitleContainer,Title,SecondTitle,ThirdTitle,Content,
Explore,Num,PictureTwo,Wrapper,Picture } from "./SecondIntroStyle";

const SecondIntro = () =>{
    //to judge whether the animation should be played
    const [isTypeWritterPlayed , setIsTypeWritterPlayed] = useState(false);
    //to store the postion where user Scrolled to will run the animation
    const intro = useRef(null);

// to observer whether user scroll to the certain position
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



export default SecondIntro;