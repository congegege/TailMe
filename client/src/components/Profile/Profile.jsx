import { useContext } from "react";
import { RecipesContext } from "../Context/RecipesContext";
import Collection from "./Collection";

const Profile = () =>{
    const {state} = useContext(RecipesContext);
    const {name,picture,email,updated_at,sub} = state.user;

    return (
        <>
        <img src={picture}/>
        <div>{name}</div>
        <div>{email}</div>
        <div>{updated_at}</div>
        <Collection sub={sub}/>
        </>
    )
}
export default Profile