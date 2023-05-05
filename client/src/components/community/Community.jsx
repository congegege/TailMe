import React, { useState } from 'react';
import { useEffect , useContext } from 'react';
import { Link, useSearchParams  } from "react-router-dom";
import { CommunityContext } from '../Context/CommunityContext';
import PostForm from './PostForm';
import styled, { css, keyframes } from 'styled-components';
import { CaretDown } from '@phosphor-icons/react';
import CommunityHeader from '../Header/CommunityHeader';
import CategoryLoading from '../Loading/CategoryLoading';
import Footer from '../Footer/Footer';



const Community = () =>{
    const {communityState, allPostsList , setAllPostsList, isClick, setIsClick} = useContext(CommunityContext);
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

    if(!allPostsList){
        return<CategoryLoading/>
    }

    return (
        <Wrapper>
            <CommunityHeader/>
            <IntroContainer>
                <IntroSection>
                    <TextSection>
                        <div>Drink,</div>
                        <Right>Share</Right>
                        <Right>& Enjoy</Right>
                    </TextSection>
                    
                    <PostTitle><PostButton onClick={()=>{setIsClick(true)}}>Post</PostButton></PostTitle>
                </IntroSection>
            
                <PictureContainer>
                    <IntroPicture src="https://cdn.discordapp.com/attachments/688213778206294154/1101392887314395216/Aegyoking_one_cocktail_with_wizard_hat_with_green_juice__transp_6b234b9e-8307-42d8-a1d3-53bd72a3aaaf-removebg-preview.png"/>
                    <Circle></Circle>
                </PictureContainer>
            </IntroContainer>
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
        <Footer/>
        </Wrapper>
    )
    
}

const Wrapper = styled.div`
    background-color: #dad7cd;
`

const IntroContainer = styled.div`
    width: 100%;
    height: 75vh;
    display: flex;
    gap: 20%;
    justify-content: center;
    align-items: center;
    background-color: #344e41;
    
`

const IntroSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    height: 80%;
    justify-content: center;
`

const TextSection = styled.div`
    background-image: url(https://img.freepik.com/free-photo/water-drops-surface-background_395237-134.jpg?w=1480&t=st=1682662890~exp=1682663490~hmac=14cdbe8daaf270d3f0942d643e8b449b74fc7cf6c30d8c61e6af08d488c51ab5);
    font-size:90px;
    font-weight: 700;
    color: transparent;
    background-size: cover;
    background-clip: text;
    -webkit-background-clip: text;
    display: flex;
    flex-direction: column;
`

const Right = styled.div`
    align-self: end;
`

const PostTitle = styled.div`
margin-top: 10%;
display: flex;
justify-content: center;
align-items: center;

`

const PostButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 60px;
    border-radius: 30px;
    background-size: cover;
    background-image: url(https://img.freepik.com/free-photo/splashes-bubbles-colored-liquid_23-2148346902.jpg?w=1480&t=st=1682664506~exp=1682665106~hmac=cccdd703c19d132af62aaa07d3e915b997a38a36d3796efaf5fb2c6f1a7dc161);
    font-size: 40px;
    color: #e3f8dd;
    font-family: "Titillium Web";
`

const PictureContainer = styled.div`
    height: 100%;
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const IntroPicture = styled.img`
    width: 350px;
    z-index: 2;
`

const Circle = styled.div`
    position: absolute;
    width: 500px;
    height: 250px; 
    bottom: 0px;
    left: -90px;
    background-color: #e9edc9;
    border-top-left-radius: 550px;  
    border-top-right-radius: 550px; 
    border: 20px solid #cccaca2e;
    border-bottom: 0;
    z-index: 1;
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