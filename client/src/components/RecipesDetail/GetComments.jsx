import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import RateIconHandler from "../IconHandlers/RateIconHandler";
import RateStringHandler from "../IconHandlers/RateStringHandler";
import PostComment from "./Comment";


const GetComments = ({id,isPosted,averageRate,setIsPosted}) =>{
    //to store the user input for posting comment
    const [commentList, setCommentList] = useState([]);
    //to judge whether user click on the post reviews button or not
    const [isClick,setIsClick] = useState(false);
    //to limit the access if user is not login
    const {isAuthenticated} = useAuth0();

    //to get all the comments when user post a new one it will fetch too
    useEffect(()=>{
        fetch(`/api/comments/${id}`)
        .then(res=>res.json())
        .then(resData=>setCommentList(resData.data))
    },[isPosted])

    console.log(isClick)

return (
    <Wrapper>
    <Title>Reviews <Count>({commentList ? commentList.length : 0})</Count> </Title>
    {isAuthenticated &&<Button onClick={()=>{setIsClick(true)}}>Write a review</Button>}
    <Container>
        {averageRate > 0 &&
        <RateSection>
            
            <SecondTitle>Glodbal Rating</SecondTitle>
            <RateIcon><RateIconHandler averageRate={averageRate}/></RateIcon>
            <RateStringHandler averageRate={averageRate} />
        </RateSection>
        }
        
        <ReviewContainer>
            {isClick &&<PostReview>
                <PostComment id={id} setIsPosted={setIsPosted} setIsClick={setIsClick}/>
            </PostReview>}
            {commentList ?
        commentList.map((comment ,  index)=>{
            const{content,name,picture,date} = comment;
            console.log(picture)
            return (
                <ReviewSection key={index}>
                    <BasicInfo>
                        <ProfilePicture src={picture}/>
                        <Name>{name}</Name>  
                    </BasicInfo>
                    <Comment>{content}</Comment>
                    <Date>{date}</Date>
                </ReviewSection>
                )
        
        })
        :
        <NoReviews>No reviews yet</NoReviews>}
        </ReviewContainer>
        
    </Container>
    </Wrapper>
)
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`
const Button = styled.button`
    background-color: #6b705c;
    color: white;
    border-radius: 50px;
    font-family: var(--font-category-heading);
    margin-left: -2%;
    margin-top: 1.5%;
    font-size: 20px;
    height: 55px;
    &:hover{
        color: black;
        background-color: #fefae0;
    }
`

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`

const RateSection = styled.div`
width: 30%;
padding: 5% 0;
display: flex;
flex-direction: column;
align-items: center;
margin-left: -5%;
`

const SecondTitle = styled.h2`
    color: #373838;
    font-family: var(--font-category);
    font-size: 40px;
    text-shadow: 1px 1px 2px #354f52;
`

const RateIcon = styled.div`
width: 40%;
`

const ReviewContainer = styled.div`
    width: 50%;
    padding: 5% 0;
`

const Title = styled.h1`
    color: #354f52;
    font-family: var(--font-category);
    display: flex;
    gap: 5%;
`

const Count = styled.span`
    font-size: 28px;
`

const PostReview = styled.div`
    
`

const ReviewSection = styled.div`
    display: flex;
    flex-direction: column;
    margin: 4% 3%;
    width: 80%;
`

const ProfilePicture = styled.img`
    border-radius: 50%;
    height: 70px;
    border: 3px solid #3a5a40;
`
const BasicInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1%;

`

const Name = styled.div`
    font-size: 28px;
    font-family: "Comic Neue" ;
    text-shadow: 0px 0px 2px black;
`

const Comment = styled.div`
padding: 2%;
word-wrap: break-word;
font-size: 22px;
font-family: "Nunito Sans";
`

const Date =styled.div`
    align-self: flex-end;
    font-family: "Comic Neue";
    border-bottom:1px solid #8a817c;
`

const NoReviews = styled.div`
    width: 100%;
    text-align: center;
    padding: 5% 0;
    margin-left: -2%;
    color: #8a817c;
    font-family: var(--font-category);
    font-size: 30px;
    text-shadow: 1px 1px 2px #354f52;
`



export default GetComments;