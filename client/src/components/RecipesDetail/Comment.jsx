import { useContext } from "react";
import { useState } from "react";
import { RecipesContext } from "../Context/RecipesContext";
import styled from "styled-components";

const PostComment = ({id,setIsPosted}) =>{
    //to store the comment when user typing
    const [comment,setComment] = useState("");
    
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
        <Wrapper>
        {/* when user is typing set the posted to default false, and storing the value what user typed */}
        <BasicInfo>
            <ProfilePicture src={state.user.picture}/>
            <Name>{state.user.name}</Name>
        </BasicInfo>
        <Comment placeholder="It taste..." onChange={(ev)=>{setComment(ev.target.value);setIsPosted(false)}} value={comment}/>
        <PostButton onClick={handleClick}>Post</PostButton>

        {/* subcomponent to get all the other comments underneath the same drink */}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 0 3%;
    display: flex;
    flex-direction: column;
    height: 30%;
    background-color: #eae2b7;
    border-radius: 30px;
`

const ProfilePicture = styled.img`
    border-radius: 50%;
    height: 70px;
    border: 3px solid #3a5a40;
`

const Name = styled.div`
    font-size: 28px;
    font-family: "Comic Neue" ;
    text-shadow: 0px 0px 2px black;
`

const BasicInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1%;
`

const Comment = styled.textarea`
    padding: 2% 0;
    height: 100px;
    background-color: transparent;
    border: none;
    font-size: 22px;
    font-family: "Nunito Sans";
    outline: none;
    resize: none;
    
`

const PostButton = styled.button`
    align-self: flex-end;
    width: 90px;
    height: 50px;
    border-radius: 40px;
    background-color: #354f52;
    border: 2px solid green;
    color: beige;
    margin-bottom: 20px;
`

export default PostComment;