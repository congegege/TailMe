import { useEffect , useContext, useRef, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { RecipesContext } from "../Context/RecipesContext";
import styled, { css, keyframes } from 'styled-components';
import {CaretDown} from "@phosphor-icons/react";

const SideBar = () =>{
    const {categoryList,isClicked,setIsClicked} = useContext(RecipesContext)
    const [searchParams,setSearchParams] = useSearchParams(window.location.search);
    const sideBarRef = useRef();
    const categoryQuery = searchParams.get("strCategory");
    const alcoholicQuery = searchParams.get("strAlcoholic");
    const [isCategoryExpand,setIsCategoryExpand] = useState(false);
    const [isAlcoholicExpand,setIsAlcoholicExpand] = useState(false);
    


    const handleFirstFilter = (category) =>{
        if(searchParams.get("strCategory") == category){
            searchParams.delete("strCategory")
            setSearchParams(searchParams.toString())
        }
        else{
            searchParams.set("strCategory",category)
            setSearchParams(searchParams.toString()) 
        }
    }

    const handleSecondFilter = (secondFilter) =>{
        if(searchParams.get("strAlcoholic") == secondFilter){
            searchParams.delete("strAlcoholic")
            setSearchParams(searchParams.toString())
        }
        else{
            searchParams.set("strAlcoholic",secondFilter)
            setSearchParams(searchParams.toString()) 
        }
    }

    const handleClearFilter = () =>{
        searchParams.delete("strAlcoholic");
        searchParams.delete("strCategory");
        setSearchParams(searchParams.toString());
    }

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
    justify-content: space-between;
    position: fixed;
    right: 20px;
    top: 20px;
    bottom: 20px;
    width: 30%;
    animation:${sideIn} 0.2s ease-in 1 forwards;
    background-color: white;
    height: 90vh;
    border-radius: 20px;
    z-index: 2;
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