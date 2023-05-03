import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import {User} from "@phosphor-icons/react"

const LoginButton = () =>{
    
    const { loginWithRedirect } = useAuth0();

    return  (
        <Wrapper>
            <User size={25}/>
            <UserButton onClick={()=>loginWithRedirect()}>
                Log In
            </UserButton>
        </Wrapper>
        
    )  
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    &:hover{
        cursor: pointer;
        color: #b3c49a;
    }
`

const UserButton = styled.button`
    font-size: 20px;
    width: 105px;
    background-color: transparent;
    &:hover{
        cursor: pointer;
        color: #b3c49a;
    }
`

export default LoginButton;