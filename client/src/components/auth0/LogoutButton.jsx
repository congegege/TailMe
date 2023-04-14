import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useContext } from "react"
import { RecipesContext } from "../Context/RecipesContext";

const LogoutButton = () =>{
    const { logout } = useAuth0();
    const {state} = useContext(RecipesContext);

    return  (
        <>
        <button onClick={()=>logout()}>
            Log Out
        </button>
        <Link to={`/Profile/${state.user.sub}`}><button>Profile</button></Link>
        </>
    )  
}

export default LogoutButton;