import { useEffect ,  useState } from "react";
import styled from "styled-components";
import {NavigationArrow} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const CommunityIntro = () =>{
    const [postUser,setPostUser] = useState(null)
    useEffect(()=>{
        fetch("/api/randomUsers/")
        .then(res=>res.json())
        .then(resData=>setPostUser(resData.data))
    },[])

    return(
        <Wrapper>
        <IntroPicture src="https://cdn.discordapp.com/attachments/688213778206294154/1102722955668115506/Aegyoking_drinks_cheering_hand_in_the_style_of_expressive_manga_b07f7c70-5a98-4006-b871-6bf3a8babb93.png"/>
        <TextArea>
            <Title>Join the Community!! </Title>
            <Content>"Wanna see something rare?
            <br/>
            They are sharing their own recipes here too."</Content>
            <UserSection>
                <PictureSection>
            {postUser && postUser.map((userPicture)=>{
                return <User src={userPicture["_id"]}/>
            })}
            </PictureSection>
            </UserSection>
            <Explore to={`/community`}>Join Now<NavigationArrow size={30} weight="bold"/></Explore>
        </TextArea>
        </Wrapper>
    )
}

const PictureSection = styled.div`
    display: flex;
`

const Wrapper = styled.div`
    width: 100%;
    background-color: #b7d1cd;
    height: 90vh;
    overflow: hidden;
    display: flex;
`
const IntroPicture = styled.img`
    height: 106vh;
    
`

const Title = styled.div`
    font-family: 'Bruno Ace', cursive;
    font-size: 70px;
`

const Content = styled.div`
    font-size:30px;
    font-family: "Comic Neue";
`

const TextArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    gap: 12%;
    
`

const UserSection = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const User = styled.img`
    width: 80px;
    border-radius: 50%;
`

const Explore = styled(Link)`
margin-left: -8%;
    display: flex;
    height: 30px;
    font-size:40px ;
    align-items: flex-end;
    justify-content: center;
    gap: 1%;
    font-family: "Patrick Hand";
    color: #415d45;
    &:hover{
        cursor: pointer;
        color: white;
    }
`

export default CommunityIntro;