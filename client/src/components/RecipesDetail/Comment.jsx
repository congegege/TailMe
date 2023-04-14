import { useContext } from "react";
import { useState } from "react";
import { RecipesContext } from "../Context/RecipesContext";
import GetComments from "./GetComments";

const PostComment = ({id}) =>{
    //to store the comment when user typing
    const [comment,setComment] = useState("");
    //to judge the status whether the comment is posted
    const [isPosted , setIsPosted] = useState(false);
    //to get the user info
    const {state} = useContext(RecipesContext);
    
    //onclick function to post the comment to the database
    const handleClick = () =>{
        if(state){
            const {name,picture,sub} = state.user
            fetch("/api/comments",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:id,comment:comment,name:name,picture:picture,sub:sub
                }),
            })
            .then((res)=>res.json())
            .then((resData)=>{
                //When its posted set the isPosted to true
                setIsPosted(true);
                //clean the textarea when the comment is posted
                setComment("");
            })
        }
            
    }

    return (
        <>
        {/* when user is typing set the posted to default false, and storing the value what user typed */}
        <textarea onChange={(ev)=>{setComment(ev.target.value);setIsPosted(false)}} value={comment}/>
        <button onClick={handleClick}>Post</button>

        {/* subcomponent to get all the other comments underneath the same drink */}
        <GetComments id={id} isPosted={isPosted}/>
        </>
    )
}

export default PostComment;