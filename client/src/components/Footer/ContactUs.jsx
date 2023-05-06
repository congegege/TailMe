import Header from "../Header/Header";
import styled from "styled-components";
import { useState } from "react";
import DetailLoadingButton from "../Loading/DetailLoadingButton"
import { Check } from "@phosphor-icons/react";
import {ArrowLeft} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";


const ContactUs = () =>{
    const [formData,setFormData] = useState({
        firstName:null,
        lastName:null,
        email:null,
        subject:null,
        content:null,
    });
    const [isLoading,setIsLoading] = useState(false);
    const [isSubmit,setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();
        setIsLoading(true);
        fetch("/api/contact",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData
            }),
        })
        .then((res)=>res.json())
        .then((resData)=>{
           setIsLoading(false);
           setIsSubmit(true)
        })
    }



    return (
        <Wrapper>
            <Header/>
            <GoBackButton onClick={()=>navigate(-1)}><ArrowLeft size={40} /></GoBackButton>
            <Title>Love to hear form you!</Title>
            <ContactForm onSubmit={handleSubmit}>
                <NameSection>
                <div>
                    <NameTag>First Name*</NameTag>
                    <NameInput required={true} onChange={(ev)=>{setFormData({...formData,"firstName": ev.target.value})}}/>
                </div>
                <div>
                    
                    <NameTag>Last Name</NameTag>
                    <NameInput onChange={(ev)=>{setFormData({...formData,"lastName": ev.target.value})}}/>
                </div>
                </NameSection>
                <div>
                    <NameTag>Email*</NameTag>
                    <BigInfoInput type="email" required={true} onChange={(ev)=>{setFormData({...formData,"email": ev.target.value})}}/>
                </div>
                <div>
                    <NameTag>Subject</NameTag>
                    <BigInfoInput onChange={(ev)=>{setFormData({...formData,"subject": ev.target.value})}}/>
                </div>
                <div>
                    <NameTag>Content</NameTag>
                    <ContentInput onChange={(ev)=>{setFormData({...formData,"content": ev.target.value})}}/>
                </div>
                {!isLoading ? <SubmitButton>{isSubmit ? <Check size={30}/> : <>Submit</>}</SubmitButton> : isSubmit ? <></> : <LoadingButton><DetailLoadingButton/></LoadingButton>}
                {isSubmit && <NameTag>We will soon contact you!</NameTag>}
            </ContactForm>
            
        </Wrapper>
    )
}

const SubmitButton = styled.button`
    width: 150px;
    height: 80px;
    align-self: center;
    background-color: transparent;
    border-radius: 50%;
    border: 3px dashed #3a5a40;
    font-size: 23px;
    font-family: var(--font-category);
    color: #6c584c;
    &:hover{
        background-color: #2e6128;
        color: #f5fad7;
        
    }
`

const GoBackButton = styled.div`
    position: absolute;
    left: 3%;
    margin-top: 8%;
    color: #08361b;
    padding: 5px;
    display: flex;
    align-items: center;

    &:hover{
        cursor: pointer;
        color: #f1faf5;
        background-color: #08361b9e;
        border-radius: 50%;
        
    }
`

const LoadingButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 80px;
    align-self: center;
    background-color: transparent;
    border-radius: 50%;
    border: 3px dashed #3a5a40;
`



const Wrapper = styled.div`
    background-color: #e6e8e6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const Title = styled.h1`
    font-family: 'Bruno Ace', cursive;
    color: #113a31;
    text-align:right;
    margin-bottom: 80px;
`

const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 5%;
`

const NameSection = styled.div`
    display: flex;
    width: 600px;
    justify-content: space-between;
`

const BigInfoInput = styled.input`
    width: 600px;
    height: 40px;
    border-radius: 20px;
    background-color: #839a83;
    color: white;
    border: none;
    font-size: 25px;
    font-family:"Space Grotesk" ;
`

const ContentInput = styled.textarea`
    width: 600px;
    border-radius: 20px;
    height: 80px;
    background-color: #839a83;
    color: white;
    font-size: 25px;
    font-family:"Space Grotesk" ;
`

const NameTag = styled.div`
    font-family:"Space Grotesk" ;
    font-size: 20px;
`

const NameInput = styled.input`
    width: 250px;
    height: 40px;
    border-radius: 20px;
    background-color: #839a83;
    color: white;
    font-size: 25px;
    border: none;
    font-family:"Space Grotesk" ;
`

export default ContactUs