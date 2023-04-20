import TextEditor from "./TextEditor";
import React, { useContext } from 'react';
import PictureUpload from "./PictureUpload";
import { RecipesContext } from '../Context/RecipesContext';
import { CommunityContext } from "../Context/CommunityContext";
import styled from "styled-components"
import BasicDrinkInfo from "./BasicDrinkInfo";

const PostForm = () =>{
    const {state} = useContext(RecipesContext)
    const { actions:{createPost}, currentPage , setCurrentPage , formData , setIsClick} = useContext(CommunityContext);
    const {img} = formData

    const formPagesList = [
        <BasicDrinkInfo/>,
        <TextEditor />,
        <PictureUpload/>,
    ];

    const handleSubmit = (event) =>{
        event.preventDefault();

        console.log({"sub":state.sub})
        fetch("/api/community",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sub:state.user.sub, ...formData
            }),
        })
        .then((res)=>res.json())
        .then((resData)=>{
            createPost(resData.data);
            setIsClick(false);
            setCurrent
        })
    }

    return (
        <Container>
        <FormWrapper onSubmit={handleSubmit}>
            {formPagesList[currentPage]}
            {currentPage == formPagesList.length - 1 && <button disabled={img.length == 0 || img.length == 0 ? true :  false}>submit</button>}
        </FormWrapper>
        </Container>
    )
    
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormWrapper = styled.form`
    background-color: #b3bcb2;
    border-radius: 30px;
    width: 40%;
    height: 60%;
    
`

export default PostForm;