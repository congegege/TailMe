import LoginButton from "../auth0/LoginButton";
import LogoutButton from "../auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link  } from "react-router-dom";
import CategoryList from "../Category/CategoryList";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRef } from "react";


const CommunityHeader = () =>{
    //judge whether user login
    const { isAuthenticated } = useAuth0();
    //judge whether user hover on the category
    const [isCategoryHover , setIsCategoryHover] = useState(false);
    //judge user is scrolling up or down
    const [scrolledDirection , setScrolledDirection] = useState(null);
    // store the pre postion
    let lastPosition = useRef(0);

    //when user scroll down header will disappear when user scroll up header will appear
    useEffect(()=>{
        lastPosition.current = window.pageYOffset;

        const scrollDirectionHandler = () => {
            const scrollY = window.pageYOffset;

            //when user at the beginning set the header appear
            if(scrollY == 0){
                setScrolledDirection(null)
            }
            else if (Math.abs(scrollY - lastPosition.current) > 0) {
            
            const newScrollDirection = scrollY > lastPosition.current ? 'down' : 'up';
                
            setScrolledDirection(newScrollDirection);
            lastPosition.current = scrollY > 0 ? scrollY : 0;
            }
            
    };

    window.addEventListener('scroll', scrollDirectionHandler);

    return () => window.removeEventListener('scroll', scrollDirectionHandler);
}, [scrolledDirection]);

    
    return (
        <>
        { scrolledDirection !== "down" &&<Wrapper scrollDirection = {scrolledDirection}>
            <Container>
                <Home to={"/"}>Home</Home>
                <Category onMouseEnter={()=>{setIsCategoryHover(true)}} to={`/categories`}>Category</Category>
                <Logo to={"/"} src="https://cdn.discordapp.com/attachments/688213778206294154/1102081298312462356/Aegyoking_minimalist_cocktail_with_a_wizard_hat_and_a_magical_s_2eee772e-47e1-4886-9bc9-954a47860ca0-removebg-preview.png"/>
                <WebName to={"/"}>Tail.Me</WebName>
                <UserSection>
                    {isAuthenticated ? 
                    <LogoutButton/> : <LoginButton/>}
                </UserSection>
            </Container>
            {isCategoryHover && 
                <CategorySection onMouseLeave={()=>{setIsCategoryHover(false)}}>
                    <TextSection>
                        <CategoryList/>
                    </TextSection>
                    <PictureSection>
                        <PictureContainer to={`/categories`}>
                            <Picture src="https://media.discordapp.net/attachments/688213778206294154/1102096537720471582/grid_0.png?width=903&height=903"/>
                            <Text>All recipes</Text>
                        </PictureContainer>
                        <PictureContainer to={`/categories/?strAlcoholic=Non+alcoholic`}>
                            <Picture src="https://cdn.discordapp.com/attachments/688213778206294154/1102096211420401714/Aegyoking_a_magical_cocktail_shaker_17bd6212-f58b-4fab-99c0-703ba75619f8.png"/>
                            <Text>Non Alcoholic</Text>
                        </PictureContainer>
                
                    </PictureSection>
                </CategorySection>}
        </Wrapper>}
        </>
    )
}

const Home = styled(Link)`
    background-color: transparent;
    color: #c9fbca;
    position: absolute;
    left: 2%;
    
    &:hover{
        color: #b3c49a;
    }
`

const Wrapper = styled.div`
    position: ${props=>props.scrollDirection =="up" && "fixed"};   
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #344e41;
    z-index: 8;
`

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Nunito Sans";
    font-size: 23px;
    
`

const Logo = styled(Link)`

    width: 120px;
    height: 120px;
    filter: invert(80%) sepia(10%) saturate(100%) hue-rotate(35deg) brightness(120%) contrast(500%);
    background-size: cover;
    background-image: url("https://cdn.discordapp.com/attachments/688213778206294154/1102081298312462356/Aegyoking_minimalist_cocktail_with_a_wizard_hat_and_a_magical_s_2eee772e-47e1-4886-9bc9-954a47860ca0-removebg-preview.png");
    
`

const WebName = styled(Link)`
    font-family: "Patrick Hand";
    font-size: 43px;
    color: #c9fbca;
    margin-right: 2%;
    &:hover{
        color: #e5ffa3;
    }
`

const Category = styled(Link)`
    background-color: transparent;
    color: #c9fbca;
    position: absolute;
    left: 8%;
    
    &:hover{
        color: #b3c49a;
    }
`



const CategorySection = styled.div`
    position: absolute;
    width: 100%;
    background-color: white;
    display: flex;
    font-size: 22px;
    opacity: 0.98;
    z-index: 10;
`

const UserSection = styled.div`
    position: absolute;
    right: 5%;
`

const TextSection = styled.div`
    background-color: #7ca27c;
    width: 50%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 5% 2%;
    align-items:center;
`

const PictureSection = styled.div`
    width: 50%;
    padding: 2% 0%;
    display: flex;
    gap: 10%;
    justify-content: center;
    align-items: center;
`

const Picture = styled.img`
    width: 300px;
    border-radius: 40px;
`

const Text = styled.div`
    margin-top: 3%;
    color:#7ca27c ;
    &:hover{
        color: black;
    }
`

const PictureContainer = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default CommunityHeader