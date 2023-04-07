import { useEffect,useState } from "react";
import GetComments from "./GetComments";

const PostComment = ({id}) =>{
    //to store the comment when user typing
    const [comment,setComment] = useState("");
    //to judge the status whether the comment is posted
    const [isPosted , setIsPosted] = useState(false);
    
    //onclick function to post the comment to the database
    const handleClick = () =>{
            fetch("/api/comments",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:id,comment:comment
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