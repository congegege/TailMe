import { useEffect , useContext, useRef, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { RecipesContext } from "../Context/RecipesContext";
import styled, { css, keyframes } from 'styled-components';
import {CaretDown} from "@phosphor-icons/react";
import SearchBar from "./SearchBar";

const SideBar = () =>{
    const {categoryList,isClicked,setIsClicked} = useContext(RecipesContext);
    //setup for the params
    const [searchParams,setSearchParams] = useSearchParams(window.location.search);
    //store the area where user clicked can close the sideBar
    const sideBarRef = useRef();
    //category that use clicked on to search
    const categoryQuery = searchParams.get("strCategory");
    //isAlcoholic or not that user clicked on to search
    const alcoholicQuery = searchParams.get("strAlcoholic");
    //expand button for category whether got clicked on
    const [isCategoryExpand,setIsCategoryExpand] = useState(false);
    //expand button for Alcoholic whther got clicked on
    const [isAlcoholicExpand,setIsAlcoholicExpand] = useState(false);
    
    const handleFirstFilter = (category) =>{
        //when user double click on the same category, category delete from the params 
        if(searchParams.get("strCategory") == category){
            searchParams.delete("strCategory")
            setSearchParams(searchParams.toString())
            
        }
        //when user only click on one time then add it into the param
        else{
            searchParams.set("strCategory",category)
            setSearchParams(searchParams.toString()) 
        }
    }

    const handleSecondFilter = (secondFilter) =>{
        //when user double click on the same isAlcoholic , it will be deleted from the params
        if(searchParams.get("strAlcoholic") == secondFilter){
            searchParams.delete("strAlcoholic")
            setSearchParams(searchParams.toString())
        }
        //when first click on the isAlcoholic, it will be added to the params
        else{
            searchParams.set("strAlcoholic",secondFilter)
            setSearchParams(searchParams.toString()) 
        }
    }

    const handleClearFilter = () =>{
        //click on the clean button will clean all the query
        searchParams.delete("strAlcoholic");
        searchParams.delete("strCategory");
        setSearchParams(searchParams.toString());
    }

    //when user clicked the outside area it will close the sideBar
    useEffect(()=>{
        let closeSideBarHandler = (ev) =>{
            if(sideBarRef.current && !sideBarRef.current.contains(ev.target)){
                setIsClicked(false);
            }
        }
        document.addEventListener("mousedown", closeSideBarHandler)

        return()=>{
            document.removeEventListener("mousedown", closeSideBarHandler)
        }
    })

    return (
        <>
        {isClicked && <GrayOut></GrayOut>}
        {isClicked && <SideBarSection ref={sideBarRef}>
        <SearchBar/>
        <CategorySection>
        <div>
        <div>
            <CategoryTitle onClick={()=>setIsCategoryExpand(!isCategoryExpand)}>CATEGORY<Icon isExpand={isCategoryExpand}><CaretDown/></Icon></CategoryTitle>
            {categoryList && isCategoryExpand && categoryList.map((category)=>{
                return<CategoryButton isSelected={categoryQuery==category ? true : false} key={category} onClick={()=>{handleFirstFilter(category)}}>{category}</CategoryButton>
            })}
        </div>
        <div>
            <CategoryTitle onClick={()=>setIsAlcoholicExpand(!isAlcoholicExpand)}>NON / ALCOHOLIC<Icon isExpand={isAlcoholicExpand}><CaretDown/></Icon></CategoryTitle>
            {isAlcoholicExpand && 
            <>
            <CategoryButton onClick={()=>{handleSecondFilter("Alcoholic")}} isSelected={alcoholicQuery == "Alcoholic" ? true : false}>Alcoholic</CategoryButton>
            <CategoryButton onClick={()=>{handleSecondFilter("Non alcoholic")}} isSelected={alcoholicQuery == "Non alcoholic" ? true : false}>Non alcoholic</CategoryButton>
            </>
            }
            
        </div>
        </div>
        <ClearButton onClick={handleClearFilter}>Clear All</ClearButton>
        </CategorySection>
        
        </SideBarSection>}
        </>
    )
}

const GrayOut = styled.div`
    cursor: pointer;
    background-color: #1f1f1f;
    width: 100%;
    height: 100vh;
    position: fixed;
    opacity: 0.9;
    transition: background-color 200ms ease-in 1;
    z-index: 10;

`
const Rotate = keyframes`
    to {
        transform: rotate(180deg);
    }
`

const Icon = styled.div`
    animation:${props=>props.isExpand && css`${Rotate} 0.2s ease-in 1 forwards` };
`

const sideIn = keyframes`
    from {
        transform: translate(100%);
    }

    to {
    transform: translate(0);
    }
`

const SideBarSection = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 20px;
    top: 50px;
    bottom: 20px;
    width: 28%;
    animation:${sideIn} 0.2s ease-in 1 forwards;
    height: 90vh;
    z-index: 13;
`

const CategorySection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    border-radius: 15px;
    z-index: 2;
    height: 90vh;
`

const CategoryButton = styled.button`
    color: ${props=>props.isSelected ? "#aecfb5" : "black"};
    background-color: ${props=>props.isSelected ? "#011d0d" : "white"};
    border: ${props=>props.isSelected ? "2px solid #011d0d" : "2px dotted darkgray"};
    border-radius: 20px;
    margin: 8px;
    font-family: var(--font-category);

    &:hover{
        background-color: #6b9080;
        color: #cce3de;
        
    }
`

const CategoryTitle = styled.div`
border-bottom: 1px solid lightgray;
padding: 3% 5%;
font-size: 20px;
font-family: var(--font-category-heading);
display: flex;
justify-content: space-between;
&:hover{
    cursor: pointer;
}
`

const ClearButton = styled.button`
font-size: 20px;
font-family: var(--font-category-heading);
background-color: white;
color: darkgray;

&:hover{
    cursor: pointer;
    color: black;
}
`

export default SideBar;