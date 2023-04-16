import {  useContext , useState ,useRef , useEffect} from "react";
import { RecipesContext } from "../Context/RecipesContext";
import { Link  } from "react-router-dom";
import styled from 'styled-components';
import { Champagne,X } from "@phosphor-icons/react";

const SearchBar = () =>{
    //get all the recipes List
    const {recipesList} = useContext(RecipesContext);
    //to store the user input in the search bar
    const [userQuery , setUserQuery] = useState ("");

    const [isClicked , setIsClicked] = useState(false);

    const searchBarRef = useRef();

    //when user start to type
    
    let filterResult = recipesList.filter((recipe)=>{
        if(userQuery.length >= 1){
                return recipe.strDrink.toLowerCase().includes(userQuery.toLowerCase())
        }
    })

    useEffect(()=>{
        let closeSearchBarBarHandler = (ev) =>{
            if(searchBarRef.current && !searchBarRef.current.contains(ev.target)){
                setUserQuery("")
            }
        }
        document.addEventListener("mousedown", closeSearchBarBarHandler)

        return()=>{
            document.removeEventListener("mousedown", closeSearchBarBarHandler)
        }
    })

    return (
        <>
        {userQuery.length>0 && <GrayOut></GrayOut>}
        <Wrapper ref={searchBarRef}>
            
            <SearchSection >
            <Icon>{userQuery.length > 0 ? <X size={35} onClick={()=>{setUserQuery("")}}/> : <Champagne size={35}/>}</Icon>
            <QueryInput type="text" placeholder="Find me..." onChange={(ev)=>{setUserQuery(ev.target.value)}} value={userQuery} />
            </SearchSection>
        
        {filterResult.length> 0 &&
        <ResultList>{filterResult.slice(0,6).map((recipe)=>{
            //the start point where the input match the drink name
            const matchIndex = recipe.strDrink.toLowerCase().indexOf(userQuery.toLowerCase());

            const firstPart = recipe.strDrink.slice(0,matchIndex);
            const matchPart = recipe.strDrink.slice(matchIndex,matchIndex+userQuery.length);
            const thirdPart = recipe.strDrink.slice(matchIndex+userQuery.length);
            return (
                <SingleResult key={recipe.idDrink} to={`/recipes/${recipe.idDrink}`}>
                <div>
                    <span>{firstPart}</span>
                    <MatchPart>{matchPart}</MatchPart>
                    <span>{thirdPart}</span>
                </div>
                </SingleResult>
            ) 
            
        })}</ResultList>}
        </Wrapper>
        </>

    )
}

const Wrapper = styled.div`
    padding: 3% 4%;
    height: 5%;
    background-color: white;
    border-radius: 15px;
    z-index: 5;
    margin-bottom: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;

`

const GrayOut = styled.div`
    cursor: pointer;
    background-color: #1f1f1f;
    width: 100%;
    height: 100vh;
    position: fixed;
    opacity: 0.9;
    transition: background-color 200ms ease-in 1;
    z-index: 4;

`

const SearchSection = styled.div`
    display: flex;
    align-items: center;
    padding: 2%;
    width: 100%;
`

const Icon = styled.div`
&:hover{
    cursor: pointer;
}
`

const QueryInput = styled.input`
align-self: baseline;
width: 90%;
margin-left: 5px;
font-size: 25px;
font-family: var(--font-category);
border: none;
&:focus{
    outline: none;
}
`

const ResultList = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 3% 4.4%;
    position: relative;
    top: -15px;
    gap: 10px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`

const SingleResult = styled(Link)`
    color: black;
    font-family: var(--font-category);
    font-size: 20px;
    padding-left: 2%;
    
    &:hover{
        color: #2d3d3a;
        text-shadow: #66827d 1px 1px 2px;
    }

`

const MatchPart = styled.span`
color: #6b9080;
`

export default SearchBar;