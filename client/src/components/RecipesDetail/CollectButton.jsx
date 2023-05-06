import { useAuth0 } from "@auth0/auth0-react";
import { Check ,X} from "@phosphor-icons/react";
import { useEffect , useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { RecipesContext } from "../Context/RecipesContext";
import DetailLoadingButton from "../Loading/DetailLoadingButton";

const CollectButton = ({id,recipeInfo}) =>{

    //to get the user info
    const {state} = useContext(RecipesContext);
    //limit user acces when they are not login
    const {isAuthenticated , loginWithRedirect} = useAuth0();
    const [isCollected , setIsCollected] = useState(false);
    const [isHover , setIsHover] = useState(false);
    const [isLoading , setIsLoading] = useState(true);
    

    //to check whether user already collected this recipe
    useEffect(()=>{
        if(state.user){
            const {sub} = state.user;
            
            fetch("/api/users/collectedCollections",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:id,sub:sub
                }),
            })
            .then((res)=>res.json())
            .then((resData)=>{
                setIsCollected(resData.isCollected);
                setIsLoading(false)
            })
        }
    },[isCollected])
    
    // when its not collected and user click on it then post the drink to the database into the collection
    const handleClick = () =>{
        setIsLoading(true)
        if(state && recipeInfo){
            const {sub} = state.user;
            const {strDrink,strDrinkThumb} = recipeInfo
            fetch("/api/users/collections",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:id,strDrink:strDrink,strDrinkThumb:strDrinkThumb,sub:sub
                }),
            })
            .then((res)=>res.json())
            .then((resData)=>{
                setIsLoading(false)
                setIsCollected(true);
            })
        }
    }
    
    const handleDeleteCollection = () =>{
        setIsHover(false)
        setIsLoading(true);
        if(state && recipeInfo){
            const {sub} = state.user;
            
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
                setIsLoading(false)
                setIsCollected(false);
            })
        }
    }


    return <>
        
        {isAuthenticated ? 
        isLoading?
        <Loading><DetailLoadingButton/></Loading>
        : isCollected ?
        <CheckedButton onClick={handleDeleteCollection} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
            { isHover ? <X size={40}/> : <Check size={40}/>}
            </CheckedButton>
        : <Collect onClick={handleClick}>Collect</Collect>
        : <Collect onClick={()=>loginWithRedirect()}>Collect</Collect> 
        }</>
}

const Loading = styled.button`
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

const Collect =styled.button`
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
        background-color: #6b9080;
        color: #f5ebe0;
        
    }
    
`
const CheckedButton =styled.button`
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
        background-color: #a84b4b;
        color: #f5fad7;
        
    }
    
`


export default CollectButton;