import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import { useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { CommunityContext } from "../Context/CommunityContext";

const LogoutButton = () =>{
    const { logout , user } = useAuth0();
    const [isHover , setIsHover] = useState(false);
    const {setClickedSection} = useContext(CommunityContext)
    
    return  (
        <Wrapper>
            <UserPicture src={user.picture} onMouseEnter={()=>{setIsHover(true)}}/>
        {isHover && <DropDownMenu onMouseLeave={()=>{setIsHover(false)}}>
        <UserButton onClick={()=>logout()}>
            Log Out
        </UserButton>
        <Link to={`/profile/${user.sub}`} onClick={()=>{setClickedSection("DashBoard")}}><UserButton>Profile</UserButton></Link>
        </DropDownMenu>}
        </Wrapper>
    )  
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 30px;
    position: relative;
    z-index: 10;
`

const DropDownMenu = styled.div`
    position: absolute;
    top: 70px;
    background-color: white;
    border-radius: 30px;
    opacity: 0.98;
`

const UserPicture = styled.img`
    border-radius:50%;
    height: 50px;
    border: 3.5px solid #3a5a40;
    &:hover{
        cursor: pointer;
    }
`

const UserButton = styled.button`
    font-size: 20px;
    width: 140px;
    background-color: transparent;
`

export default LogoutButton;