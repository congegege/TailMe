import TextEditor from "./TextEditor";
import React, { useContext} from 'react';
import PictureUpload from "./PictureUpload";
import { RecipesContext } from '../Context/RecipesContext';
import { CommunityContext } from "../Context/CommunityContext";
import styled from "styled-components"
import BasicDrinkInfo from "./BasicDrinkInfo";
import { useRef , useEffect } from "react";
import LoadingButton from "../Loading/LoadingButton";
import StepBar from "./StepBar";
import { useAuth0 } from "@auth0/auth0-react";

const PostForm = () =>{
    const {state } = useContext(RecipesContext);
    const {communityState, actions:{createPost , submitPost}, currentPage , setCurrentPage , formData , isClick , setIsClick} = useContext(CommunityContext);
    const postFormRef = useRef();
    const {img} = formData;
    const {isAuthenticated , loginWithRedirect} = useAuth0();

    const formPagesList = [
        <BasicDrinkInfo/>,
        <TextEditor />,
        <PictureUpload/>,
    ];

    console.log({"sub":state.user.sub},formData)
    const handleSubmit = (event) =>{
        event.preventDefault();
        submitPost()

        
        fetch("/api/community",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sub:state.user.sub,name:state.user.name, userPicture:state.user.picture,...formData
            }),
        })
        .then((res)=>res.json())
        .then((resData)=>{
            createPost(resData.data);
            setIsClick(false);
            setCurrentPage(0);
        })
    }

    useEffect(()=>{
        let closeSideBarHandler = (ev) =>{
            if(postFormRef.current && !postFormRef.current.contains(ev.target)){
                setIsClick(false);
            }
        }
        document.addEventListener("mousedown", closeSideBarHandler)

        return()=>{
            document.removeEventListener("mousedown", closeSideBarHandler)
        }
    })

    return (
        
        <Container>
            <Form ref={postFormRef}>
                <StepBar />
                <FormWrapper onSubmit={handleSubmit} >
                    {isAuthenticated?<>
                    {formPagesList[currentPage]}
                    {communityState.status !== "submit-post"?
                    currentPage == formPagesList.length - 1 &&
                    <Submit disabled={img.length == 0 || img.length == 0 ? true :  false} >submit</Submit>
                    :<LoadingButton/>}
                    </> : 
                    <LogInSection><Face src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682666408/sad_tp3cwj.png"/>
                    <Text>"Oh...Please log in <Login onClick={()=>loginWithRedirect()}>HERE</Login></Text>
                    <Text>to gain the access for this feature"</Text></LogInSection>}
                </FormWrapper>
            </Form>
        </Container>
    )
    
}

const LogInSection = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3%;
`

const Face = styled.img`
    width: 50px;
`

const Text = styled.div`
    font-family: "Architects Daughter";
    font-size: 30px;
`

const Login = styled.span`
color: #dcf9d5;
text-decoration: underline wavy 2px black;
    &:hover{
        color: #eaffb6;
        cursor: pointer;
    }
`

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgb(31,31,31,0.8);
    z-index: 5;
`

const Form = styled.div`
    width: 45%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormWrapper = styled.form`
    height: 100%;
    width: 100%;
    position: relative;
    cursor:auto;
    clip-path: polygon(30px 0,
            calc(100% - 30px) 0,
            100% 30px,
            100% calc(100% - 30px),
            calc(100% - 30px) 100%,
            0px 100%,
            0 calc(100% - 30px),
            0 0px);
    background-color: rgb(179, 188, 178,0.9);
    z-index: 5;
    
`

const Submit = styled.button`
    position: absolute;
    bottom: 5%;
    right: 5%;
    background-color: transparent;
    font-size: 20px;
    font-family: var(--font-category-heading);
`

export default PostForm;