import React from 'react';
import { useContext , useState } from 'react';
import { CommunityContext } from '../Context/CommunityContext';
import styled from 'styled-components';
import { RecipesContext } from '../Context/RecipesContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';


const UserSideBar = () =>{
    const {sectionList, clickedSection , setClickedSection} = useContext(CommunityContext);
    const {state} = useContext(RecipesContext);
    const [isHover , setIsHover] = useState(false);
    
    

    if(state.user){
        const {picture,name,email,nickname} = state.user;
        
        return (
            <Wrapper isHover={isHover} onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}}>
            <ProfileSection>
                <ProfilePicture src={picture}/>
                <Info>
                    {isHover && <Name>{name.length > nickname.length ? nickname : name}</Name>}
                    {isHover && <Email>{email}</Email>}
                </Info>
            </ProfileSection>
            <Container>
                {sectionList.map((section)=>{
                    return(
                <IconSection 
                to={section.name == "Home" && "/"}
                onClick={()=>{setClickedSection(section.name)}}>
                    <Icon src={section.icon}/>
                    {isHover && <IconName>{section.name}</IconName>}
                </IconSection>
                    )
                })}
            </Container>
            </Wrapper>
        )
    }
    
    else{
        return (
            <Loading/>
        )
    }
    
}

const Wrapper = styled.div`
    display: flex;
    left: 0px;
    flex-direction: column;
    align-items: ${props=>props.isHover ? "left" : "center"};
    height: 100vh;
    background-color: #cfaa8a;
    position: fixed;
    gap: 5%;
    padding: 20px;
    width: ${props=>props.isHover ? "15%" : "3%"};
    &:hover{
        cursor: pointer;
    }
`

const ProfileSection = styled.div`
    display: flex;
    align-items: ${props=>props.isHover ? "left" : "center"};
    margin-top: 50px;
    gap: 10%;
    
`

const Info = styled.div`
    display: flex;
    flex-direction:column ;
`

const Name = styled.div`
    font-size: 25px;
    color: #6c584c;
`

const Email = styled.div`
    font-size: 13px;
    color: #746452;
`

const ProfilePicture = styled.img`
    width: 70px;
    border-radius: 50%;
    border: solid 4px #6c584c;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`

const IconSection = styled(Link)`
    display: flex;
    align-items: center;
    gap: 10%;
    &:hover{
        filter: invert(96%) sepia(6%) saturate(261%) hue-rotate(307deg) brightness(92%) contrast(87%);
    }
`

const Icon = styled.img`
    width: 40px;
    filter: invert(97%) sepia(10%) saturate(1033%) hue-rotate(330deg) brightness(107%) contrast(86%);

`

const IconName = styled.div`
    font-size: 20px;
    color: #6c584c;
`


export default UserSideBar;