import React, { useContext ,useState } from 'react';
import { CommunityContext } from '../Context/CommunityContext';
import styled from 'styled-components';
import {CloudArrowUp , ArrowLeft} from "@phosphor-icons/react";

const PictureUpload = () =>{
    const {formData , setFormData , currentPage , setCurrentPage ,fileName , setFileName } = useContext(CommunityContext)
    
    

    const uploadPicture = (selectedPic) =>{
        const reader = new FileReader();
        reader.readAsDataURL(selectedPic[0]);
        reader.onloadend = () =>{
            setFormData({...formData,"img":reader.result})
        }
    }

    return (
        <Wrapper>
            
                {!formData.img 
                ? 
                <FileUploadSection>
                    <CloudArrowUp size={40} color={"#485d51"}/>
                    <FileInput type="file" name="myImage" onChange={(ev)=>{uploadPicture(ev.target.files);setFileName(ev.target.value.split("\\")) }}/>
                </FileUploadSection>
                :
                fileName && <UploadedImageSection>
                    <RecipeImage src={formData.img}/>
                    <Massage>
                        <FileName>{fileName[fileName.length-1]}</FileName>
                        Uploaded!</Massage>
                    <ChangePictureSection>
                        <FileInput type="file" name="myImage" onChange={(ev)=>{uploadPicture(ev.target.files);setFileName(ev.target.value.split("\\")) }}/>
                    </ChangePictureSection>
                </UploadedImageSection>
                }
                
            
        
        <PreButton type='button' onClick={()=>setCurrentPage(currentPage - 1)}><ArrowLeft weight='light'/></PreButton>
        </Wrapper>
    )
    
}

const Wrapper = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const FileUploadSection = styled.label`
    cursor: pointer;
    margin: auto;
    border: 3px dashed #8a817c;
    border-radius: 20px;
    height: 50%;
    width: 80%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 20px;
::before {
    
    content: 'Choose your recipe image here';
    color: #1f2d04;
    font-size: 18px;
    display: inline-block;
    
    text-shadow:   
        1px 1px 0px #485d51, 
        2px 2px 0px #9ed1bf;
    font-family:var(--font-category) ;
}
`

const FileInput = styled.input`
    display: none;
`

const UploadedImageSection = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    height: 80%;
`

const RecipeImage = styled.img`
    max-width: 80%;
    max-height: 75%;
    border-radius: 30px;
`

const FileName = styled.span`
    padding-right: 5px;
    color: #31684b;
    text-decoration: underline wavy #4a6371 1.5px;
`

const Massage = styled.div`
font-family: "Comic Sans MS";
font-size: 20px;
`

const ChangePictureSection = styled.label`
cursor:pointer;
margin-top:20px ;
border: 2px dashed #81e0b5;
border-radius: 20px;
padding: 20px;
background-color: #171a11;
color: #b0d66a;
::before {
    content: 'change your mind?';
    font-size: 18px;
    display: inline-block;
    text-shadow:   
    1px 1px 0px #9ed1bf;
    font-family:var(--font-category) ;
}
&:hover{
    background-color: #080808;
    color: #cce3de;
    border: 2px dashed #cce3de;;
}
`

const PreButton = styled.button`
    align-self: flex-start;
    margin:5%;
    background-color: transparent;
    font-size: 25px;
    padding: 0;
`

export default PictureUpload;