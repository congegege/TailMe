import LoginButton from "../auth0/LoginButton";
import LogoutButton from "../auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () =>{
    const { isAuthenticated } = useAuth0();

    
    return (
        <>
        {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
        </>
    )
}
export default Header