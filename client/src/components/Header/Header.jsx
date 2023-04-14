import { useContext } from "react"
import { RecipesContext } from "../Context/RecipesContext";
import LoginButton from "../auth0/LoginButton";
import LogoutButton from "../auth0/LogoutButton";

const Header = () =>{
    const {state} = useContext(RecipesContext)
    console.log(state.user)
    return (
        <>
        {state.user ? <LogoutButton/> : <LoginButton/>}
        </>
    )
}
export default Header