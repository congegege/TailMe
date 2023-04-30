import { useContext , useState , useEffect } from "react";
import { RecipesContext } from "../Context/RecipesContext";
import Collection from "./Collection";
import UserSideBar from "./UserSideBar";
import styled from "styled-components";
import { CommunityContext } from "../Context/CommunityContext";
import CommunitySection from "./CommunitySection";
import DashBoard from "./DashBoard";

const Profile = () =>{
    const {state} = useContext(RecipesContext);
    const {clickedSection} = useContext(CommunityContext);
    

    if(state.user){
        const {sub} = state.user;
        return (
            <Wrapper>
            <UserSideBar/>
            <Content>
            {!clickedSection && <DashBoard/>}
            {clickedSection == "DashBoard" && <DashBoard/>}
            {clickedSection == "Collection" && <Collection sub={sub}/>}
            {clickedSection == "Community" && <CommunitySection sub={sub}/>}
            </Content>
            </Wrapper>
        )
    }
    else{
        return <>Loading</>
    }
}

const Content = styled.div`
width: 85%;
margin-left: 15%;
`

const Wrapper = styled.div`
    background-color: #fdefe4;
    min-height: 100vh;
`

export default Profile