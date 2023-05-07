import {CaretDoubleDown,CaretDoubleUp} from "@phosphor-icons/react";
import { useEffect,useState } from "react";
import { Link  } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight , X } from "@phosphor-icons/react";
import CategoryLoading from "../Loading/CategoryLoading";
import DeleteLoadingButton from "../Loading/DeleteLoadingButton";

const Collection = ({sub}) =>{
    const[collectionList,setCollectionList] = useState(null);
    const[ratedList , setRatedList] = useState(null);
    const[userCommentsList, setUserCommentsList] = useState(null);
    const [isExpanded , setIsExpanded] = useState(false);
    const [isRateExpanded , setIsRateExpanded] = useState(false);
    const [isCommentExpanded , setIsCommentExpanded] = useState(false);
    const [isLoading , setIsLoading] = useState (false);
    const [clickedRecipe , setClickedRecipe] = useState(null);

    useEffect(()=>{
        fetch(`/api/users/collections/${sub}`)
        .then(res=>res.json())
        .then(resData=>{
            setCollectionList(resData.data);
            setIsLoading(false)
        })
    },[isLoading])

    useEffect(()=>{
        fetch(`/api/ratedDrink/${sub}`)
        .then(res=>res.json())
        .then(resData=>setRatedList(resData.data))
    },[])

    useEffect(()=>{
        fetch(`/api/userComments/${sub}`)
        .then(res=>res.json())
        .then(resData=>setUserCommentsList(resData.data))
    },[])

    

    if(!collectionList || !ratedList || !userCommentsList){
        return <CategoryLoading/>
    }

    const collectionResultList = collectionList.filter((collection,index)=>{
        if(collectionList.length){
            if(!isExpanded){
                return  index >= collectionList.length - 3
            }
            else{
                return collection
            }
        }
        else{
            return collection
        }
        
    })

    const ratedResultList = ratedList.filter((ratedDrink,index)=>{
        if(ratedList.length > 3){
            if(!isRateExpanded){
                return  index >= ratedList.length - 3
            }
            else{
                return ratedDrink
            }
        }
        else{
            return ratedDrink
        }
    })
    
    const userCommentResultList = userCommentsList.filter((commentDrink,index)=>{
        if(userCommentsList.length > 1){
            
            if(!isCommentExpanded){
                
                return  index >= userCommentsList.length - 1
            }
            else{
                return commentDrink
            }
        }
        
        else{
            
            return commentDrink
        }
    })
    console.log(userCommentsList)
    const handleCollectionDelete = (id) =>{
        setIsLoading(true);
        setClickedRecipe(id);
            fetch("/api/users/deleteCollectedCollections",{
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
        <Title>My Collection</Title>
        {collectionResultList.length == 0 
        ?   <Massage to={"/categories"}>
            <Face src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682666408/sad_tp3cwj.png"/>
                No collections yet <ArrowRight size={28}/>
            </Massage>
        : <CollectionSection>
        {collectionResultList.map((collection,index)=>{
                    return (
                        <RecipeContainer order={-index} key={collection.id} >
                            <RecipeLink  to={`/recipes/${collection.id}`}>
                                <RecipePicture src={collection.strDrinkThumb}/>
                                <DrinkName>{collection.strDrink}</DrinkName>
                            </RecipeLink>
                        
                        <DeleteButton onClick={()=>handleCollectionDelete(collection.id)}>
                            {isLoading && clickedRecipe == collection.id ? <DeleteLoadingButton/> : <X size={40} weight="bold" />}
                        </DeleteButton>
                        </RecipeContainer>
                    ) 
                
                    })}
        </CollectionSection>}
        {collectionList.length > 3 && <ExpandButton>
            {!isExpanded
            ? <CaretDoubleDown size={40} onClick={()=>{setIsExpanded(true)}}/> 
            : <CaretDoubleUp size={40} onClick={()=>{setIsExpanded(false)}}/>}
        </ExpandButton>}
        <Title>My Rates</Title>

        {ratedResultList.length == 0 ?
        <Massage to={"/categories"}>
        <Face src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682666408/sad_tp3cwj.png"/>
            No rates yet <ArrowRight size={28}/>
        </Massage>
        : <CollectionSection>
        {ratedResultList.map((ratedDrink,index)=>{
                    return (
                        <RecipeContainer order={-index} key={ratedDrink.id} to={`/recipes/${ratedDrink.id}`}>
                        <RecipePicture src={ratedDrink.drinkImage}/>
                        <DrinkName>{ratedDrink.drinkName}</DrinkName>
                        <Rate>{ratedDrink.rate}.0</Rate>
                        </RecipeContainer>
                    ) 
                
                    })}
        </CollectionSection>}
        {ratedList.length > 3 &&
        <ExpandButton>
            {!isRateExpanded
            ? <CaretDoubleDown size={40} onClick={()=>{setIsRateExpanded(true)}}/> 
            : <CaretDoubleUp size={40} onClick={()=>{setIsRateExpanded(false)}}/>}
        </ExpandButton>}
        <Title>My Comments</Title>
        {userCommentsList.length == 0
        ?<Massage to={"/categories"}>
        <Face src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682666408/sad_tp3cwj.png"/>
            No Comments yet <ArrowRight size={28}/>
        </Massage>
        :<CommentSection>
        {userCommentResultList.map((commentDrink,index)=>{
                    return (
                        <CommentContainer order={-index}>
                        <PictureContainer  key={commentDrink.id} to={`/recipes/${commentDrink.id}`}>
                        <Picture src={commentDrink.drinkImage}/>
                        <DrinkName>{commentDrink.drinkName}</DrinkName>
                        </PictureContainer>
                        <Comment>“{commentDrink.comment}”</Comment>
                        </CommentContainer>
                    ) 
                
                    })}
        </CommentSection>}
    
        {userCommentsList.length > 1 &&
        <ExpandButton>
            {!isCommentExpanded
            ? <CaretDoubleDown size={40} onClick={()=>{setIsCommentExpanded(true)}}/> 
            : <CaretDoubleUp size={40} onClick={()=>{setIsCommentExpanded(false)}}/>}
        </ExpandButton>}
        </Wrapper>
    )
}



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

const CommentSection = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    padding: 3% 0;
    
    
`

const CommentContainer = styled.div`
    display: flex;
    gap: 20%;
    align-items: center;
    margin: 2% 0;
    order: ${props=>props.order};
`

const Comment = styled.div`
    width: 50%;
    word-wrap: break-word;
    font-size: 25px;
    font-family: "Nunito Sans";
    color: #5e503f;
`

const PictureContainer = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const Picture = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 50%;
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

const Rate = styled.div`
    position: absolute;
    top: -30px;
    right: 20px;
    font-size: 50px;
    color: #631d20;
    font-family: "Architects Daughter";
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

export default Collection;