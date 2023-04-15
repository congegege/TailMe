import { useContext } from "react";
import { RecipesContext } from "../Context/RecipesContext";
import Collection from "./Collection";
import { format } from "date-fns";

const Profile = () =>{
    const {state} = useContext(RecipesContext);
    const {name,picture,email,updated_at,sub} = state.user;

    return (
        <>
        <img src={picture}/>
        <div>{name}</div>
        <div>{email}</div>
        <div>{format(new Date(updated_at), "yyyy.MM.dd")}</div>
        <Collection sub={sub}/>
        </>
    )
}
export default Profile