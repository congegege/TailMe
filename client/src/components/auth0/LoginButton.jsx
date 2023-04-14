import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { useEffect } from "react";
import { useContext } from "react";
import { RecipesContext } from "../Context/RecipesContext";

const LoginButton = () =>{
    const { loginWithRedirect , user } = useAuth0();
    const { actions: { userLogIn }} = useContext(RecipesContext)
    
    useEffect(()=>{
        if(user){
            const userData = {...user,updated_at:format(new Date(), "yyyy.MM.dd"),collection:[]};
            

            fetch("/api/users",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })
            .then((res)=>res.json())
            .then((resData)=>{userLogIn(resData.data)})
            .catch((err)=>console.log(err))
        }
    },[user])
    

    return  (
        <button onClick={()=>loginWithRedirect()}>
            Log In
        </button>
    )  
}

export default LoginButton;