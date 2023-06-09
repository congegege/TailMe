import { useEffect,useState } from "react";
import { Link  } from "react-router-dom";
import {CaretDoubleDown,CaretDoubleUp} from "@phosphor-icons/react";
import styled from "styled-components";
import { ArrowRight , X } from "@phosphor-icons/react";
import CategoryLoading from "../Loading/CategoryLoading";
import DeleteLoadingButton from "../Loading/DeleteLoadingButton";

const CommunitySection = ({sub}) =>{
    const [isExpanded , setIsExpanded] = useState(false);
    const[communityCollectionList,setCommunityCollectionList] = useState([]);
    const[communityPostList, setCommunityPostList] = useState(null);
    const [isLoading , setIsLoading] = useState (false);
    const [clickedRecipe , setClickedRecipe] = useState(null);


    useEffect(()=>{
        fetch(`/api/users/communityCollections/${sub}`)
        .then(res=>res.json())
        .then(resData=>{
            if(resData.data){
                setCommunityCollectionList(resData.data);
            }
            setIsLoading(false)
        })
    },[isLoading])

    useEffect(()=>{
        fetch(`/api/community/userPosts/${sub}`)
        .then(res=>res.json())
        .then(resData=>setCommunityPostList(resData.data))
    },[])

    if(!communityCollectionList || !communityPostList){
        return <CategoryLoading/>
    }

    const communityResultList = communityCollectionList.filter((community,index)=>{
        if(communityCollectionList.length){
            if(!isExpanded){
                return  index >= communityCollectionList.length - 3
            }
            else{
                return community
            }
        }
        else{
            return community
        }
        
    })

    const postResultList = communityPostList.filter((post,index)=>{
        if(communityPostList.length){
            if(!isExpanded){
                return  index >= communityPostList.length - 3
            }
            else{
                return post
            }
        }
        else{
            return post
        }
        
    })

    const handleCollectionDelete = (id) =>{
        setIsLoading(true);
        setClickedRecipe(id);
            fetch("/api/users/deleteCollectedCommunityCollections",{
                method:"DELETE",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:id,sub:sub
                }),
            })
            .then((res)=>res.json())
            .then((resData)=>{
                
            })
    }

    return(
        <Wrapper>
        <Title>My collection</Title>
        {communityCollectionList.length == 0
        ? <Massage to={"/community"}>
        <Face src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682666408/sad_tp3cwj.png"/>
            No collections yet <ArrowRight size={28}/>
        </Massage> 
        :<CollectionSection>
        {communityResultList.map((post,index)=>{
                    return (
                        <RecipeContainer order={-index} key={post.id} >
                        <RecipeLink to={`/community/${post.id}`}>
                            <RecipePicture src={post.img}/>
                            <DrinkName>{post.strDrink}</DrinkName>
                        </RecipeLink>

                        <DeleteButton onClick={()=>handleCollectionDelete(post.id)}>
                            {isLoading && clickedRecipe == post.id ? <DeleteLoadingButton/> : <X size={40} weight="bold" />}
                        </DeleteButton>

                        </RecipeContainer>
                    ) 
                
                    })}
        </CollectionSection>}
        {communityCollectionList.length > 3 && <ExpandButton>
            {!isExpanded
            ? <CaretDoubleDown size={40} onClick={()=>{setIsExpanded(true)}}/> 
            : <CaretDoubleUp size={40} onClick={()=>{setIsExpanded(false)}}/>}
        </ExpandButton>}
        <Title>My post</Title>
        {postResultList.length == 0 
        ? <Massage to={"/community"}>
        <Face src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682666408/sad_tp3cwj.png"/>
            No posts yet <ArrowRight size={28}/>
        </Massage>
        : <CollectionSection>
        {postResultList.map((userPost,index)=>{
                    return (
                        <RecipeContainer order={-index} key={index} to={`/community/${userPost.id}`}>
                        <RecipePicture src={userPost.img}/>
                        <DrinkName>{userPost.strDrink}</DrinkName>
                        </RecipeContainer>
                    ) 
                
                    })}
        </CollectionSection>}
        {communityPostList.length > 3 && <ExpandButton>
            {!isExpanded
            ? <CaretDoubleDown size={40} onClick={()=>{setIsExpanded(true)}}/> 
            : <CaretDoubleUp size={40} onClick={()=>{setIsExpanded(false)}}/>}
        </ExpandButton>}
        </Wrapper>
    )
}
const RecipeLink = styled(Link)`
    
`

const DeleteButton = styled.div`
    position: absolute;
    top: 2px;
    right: 30px;
    color: #631d2066;
    &:hover{
        color: #6d282c;
    }
`

const Massage = styled(Link)`
    display: flex;
    color: black;
    height: 20%;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 2%;
    padding: 3% 0;
    font-family: "Architects Daughter";
    font-size: 25px;
    opacity: 0.4;
    &:hover{
        opacity: 0.8;
        color:black;
    }
`

const Face = styled.img`
    width: 50px;
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Title = styled.div`
    font-family:"Lexend Deca";
    font-size: 50px;
    align-self: flex-start;
    margin-left: 8%;
    padding: 2% 0 ;
    border-bottom: 5px dashed #ddbea9;
    width: 80%;
    color: #6c584c;
`

const CollectionSection = styled.div`
    width: 85%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 3% 0;
    align-items:center;
`

const RecipeContainer = styled(Link)`
    margin: 2%;
    order: ${props=>props.order};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const ExpandButton = styled.button`
    width: 100px;
    height: 80px;
    background-color: transparent;
    font-weight: fill;
    color: gray;
`

const RecipePicture = styled.img`
    width: 400px;
    height: 400px;
    border-radius: 30%;
`

const DrinkName = styled.div`
    text-align: center;
    font-family: "Comic Neue";
    font-size: 30px;
    color: #6b9080;
`

export default CommunitySection;