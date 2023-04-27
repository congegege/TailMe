import React, { useState } from 'react';
import { useEffect , useContext } from 'react';
import { Link, useSearchParams  } from "react-router-dom";
import { CommunityContext } from '../Context/CommunityContext';
import PostForm from './PostForm';
import UserSideBar from './UserSideBar';
import styled, { css, keyframes } from 'styled-components';
import { CaretDown } from '@phosphor-icons/react';


const Community = () =>{
    const {communityState, allPostsList , setAllPostsList, isClick} = useContext(CommunityContext);
    const [category,setCategory] = useState(null);
    const [isFilter , setIsFilter] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams(window.location.search);

    useEffect(()=>{
        setSearchParams(searchParams.toString())
        {searchParams.get("strAlcoholic") ? setCategory(searchParams.get("strAlcoholic")) : setCategory("All")}
        fetch(`/api/community/posts?${searchParams.toString()}`)
        .then(res=>res.json())
        .then(resData=>setAllPostsList(resData.data))
    },[category,communityState.status])

    const handleClick = (type) =>{
        if(type == "All"){
            setCategory("All")
            searchParams.delete("strAlcoholic")
            setSearchParams(searchParams.toString())
        }
        else{
            setCategory(type)
            searchParams.set("strAlcoholic",type)
            setSearchParams(searchParams.toString())
        }
        setIsFilter(false)
    }

    return (
        <Wrapper>
            <UserSideBar/>
            <Content>
            <Title>
                <FirstPart>
                    Share
                </FirstPart>
                    Your Own Drink
            </Title>
            <FilterSection>
            <FilterButton onClick={()=>setIsFilter(!isFilter)}>
                Filter by : 
                <DefaultCategory>{category} </DefaultCategory>
                <Icon isExpand={isFilter}><CaretDown/></Icon>
            </FilterButton>
            {isFilter && <Dropdown>
                <Option onClick={()=>handleClick("All")}>All</Option>
                <Option onClick={()=>handleClick("Alcoholic")}>Alcoholic</Option>
                <Option onClick={()=>handleClick("Non Alcoholic")}>Non Alcoholic</Option>
            </Dropdown>}
            </FilterSection>
        <PostContainer>
        {allPostsList && allPostsList.map((post,index)=>{
            return(
                <SinglePostContainer order={-index} to={`/community/${post.id}`} key={post.id}>
                <RecipePicture src={post.img}/>
                <DrinkName>{post.strDrink}</DrinkName>
                </SinglePostContainer>
            )
        })}
        </PostContainer>
        {isClick &&<PostForm/>}
        </Content>
        </Wrapper>
    )
    
}

const Wrapper = styled.div`
    background-color: #dad7cd;
    display: flex;
    
`

const Content = styled.div`
    width: 100%;
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
    margin: auto;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FilterButton = styled.button`
background-color:transparent;
color: #6b705c;
font-size: 25px;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`

const DefaultCategory = styled.span`
    margin: 0 8%;
    color:#9b7662;
`

const PostContainer = styled.div`
    padding: 4%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-end: revert;
    align-items:center;
    
`

const SinglePostContainer = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2%;
    order: ${props=>props.order};
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
        cursor: pointer;
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

const Rotate = keyframes`
    to {
        transform: rotate(180deg);
    }
`

const Icon = styled.div`
    animation:${props=>props.isExpand && css`${Rotate} 0.2s ease-in 1 forwards` };
    color:#9b7662;
    font-size:30px;
`

const Dropdown = styled.div`
    align-self: flex-end;
    margin-right: 15%;
    background-color: #bcb5a066;
    width: 40%;
    border-radius: 30px;
    padding: 3%;
`

const Option = styled.div`
    font-family: "Lexend Deca" sans-serif;
    font-size: 25px;
    color:#9b7662 ;
    &:hover{
        cursor: pointer;
        color: #f5f8e6;
    }
`

export default Community;