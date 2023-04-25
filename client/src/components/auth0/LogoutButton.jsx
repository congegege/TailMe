import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LogoutButton = () =>{
    const { logout , user } = useAuth0();

    return  (
        <>
        <button onClick={()=>logout()}>
            Log Out
        </button>
        <Link to={`/profile/${user.sub}`}><button>Profile</button></Link>
        </>
    )  
}

export default LogoutButton;