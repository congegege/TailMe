import React, { useState } from 'react';
import { useEffect , useContext } from 'react';
import { Link  } from "react-router-dom";
import { CommunityContext } from '../Context/CommunityContext';
import PostForm from './PostForm';
import UserSideBar from './UserSideBar';
import styled, { keyframes } from 'styled-components';


const Community = () =>{
    const {communityState, allPostsList , setAllPostsList, isClick} = useContext(CommunityContext);
    const [category,setCategory] = useState("All");
    const [isFilter , setIsFilter] = useState(false)

    useEffect(()=>{
        fetch("/api/community/posts")
        .then(res=>res.json())
        .then(resData=>setAllPostsList(resData.data))
    },[communityState.status])

    return (
        <Wrapper>
            <UserSideBar/>
            <Title>
                <FirstPart>
                    Share
                </FirstPart>
                    Your Own Drink
            </Title>
            <FilterSection>
            <FilterButton onClick={()=>setIsFilter(!isFilter)}>
                Filter by : 
                <DefaultCategory>{category}</DefaultCategory>
            </FilterButton>
            {isFilter && <div>
                <div>Alcoholic</div>
                <div>Non Alcoholic</div>
            </div>}
            </FilterSection>
        <PostContainer>
        {allPostsList && allPostsList.map((post)=>{
            return(
                <SinglePostContainer to={`/community/${post.id}`} key={post.id}>
                <RecipePicture src={post.img}/>
                <DrinkName>{post.strDrink}</DrinkName>
                </SinglePostContainer>
            )
        })}
        </PostContainer>
        {isClick &&<PostForm/>}
        </Wrapper>
    )
    
}

const Wrapper = styled.div`
    background-color: #dad7cd;
`

const Title = styled.h1`
    font-size: 60px;
    margin: 2%;
    color: #656d4a;
    font-family: 'Lexend Deca', sans-serif;
`

const FirstPart = styled.p`
    font-size: 33px;
    color: transparent;
    -webkit-text-stroke: 1.5px #818166;
    
`

const FilterSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FilterButton = styled.button`
background-color:transparent;
color: #6b705c;
font-size: 25px;
width: 15%;
`

const DefaultCategory = styled.span`
    margin: 0 8%;
`

const PostContainer = styled.div`
    margin: 4%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items:center;
    
`

const SinglePostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2%;
`

const waterWave = keyframes`
    0%{
        border-radius: 50% 20% / 20% 30%;
    }
    50%{
        border-radius: 40% 20% / 20% 50%
    }
    100%{
        border-radius: 50% 20% / 20% 30%;
    }
`

const RecipePicture = styled.img`
    width: 450px;
    max-height: 500px;
    border-radius: 50% 20% / 20% 30%;
    &:hover{
        animation: ${waterWave} infinite 2.5s;
    }
`

const DrinkName = styled.div`
    text-align: center;
    color: #403d39;
    opacity: 0.8;
    font-family: "Comic Neue";
    font-size: 25px;
`

export default Community;