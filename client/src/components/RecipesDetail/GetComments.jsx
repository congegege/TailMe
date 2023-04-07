import { useState } from "react";
import { useEffect } from "react";


const GetComments = ({id,isPosted}) =>{
    const [commentList, setCommentList] = useState([])

    //to get all the comments when user post a new one it will fetch too
    useEffect(()=>{
        fetch(`/api/comments/${id}`)
        .then(res=>res.json())
        .then(resData=>setCommentList(resData.data))
    },[isPosted])

    //when there is no comments yet
    if(!commentList){
        return<>No comment yet</>
    }

return (
    <>
    <div>Comments</div>
    {commentList.map((comment ,  index)=>{
        return <div key={index}>{comment}</div>
    })}
    </>
)
}

export default GetComments;