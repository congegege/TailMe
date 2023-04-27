import React, { useContext } from 'react';
import { CommunityContext } from "../Context/CommunityContext";
import styled from "styled-components"
import { useState } from 'react';
import {ArrowRight , Check} from "@phosphor-icons/react";

const BasicDrinkInfo = () =>{
    const { currentPage , setCurrentPage , formData , setFormData} = useContext(CommunityContext);
    const{strDrink , strAlcoholic} = formData;
    const [isNextClicked , setIsNextClicked] =  useState(false)

    return (
        <Wrapper>
            <InputContainer>
                <div>
                    <DrinkNameInput
                    placeholder='Drink Name...'
                    type="text" 
                    id="name" 
                    defaultValue={strDrink}
                    onChange={(ev)=>{setFormData({...formData,"strDrink": ev.target.value})}}
                    />
                </div>
                <CategorySection>

                    <Category isClicked={formData.strAlcoholic =="Alcoholic" ? true : false} onClick={()=>{setFormData({...formData,"strAlcoholic": "Alcoholic"})}}>
                    {formData.strAlcoholic =="Alcoholic" && <CheckButton><Check weight='light'/></CheckButton>}
                        <TopLeft>Alcoholic</TopLeft>
                        <CategoryPicture src='https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682203211/margarita_nkd0fh.png'/>
                        <BottomRight>Alcoholic</BottomRight>
                    </Category>
                    
                    <Category isClicked={formData.strAlcoholic =="Non Alcoholic" ? true : false} onClick={()=>{setFormData({...formData,"strAlcoholic": "Non Alcoholic"})}}>
                    {formData.strAlcoholic =="Non Alcoholic" && <CheckButton><Check weight='light'/></CheckButton>}
                        <TopLeft>Non Alcoholic</TopLeft>
                        <CategoryPicture src='https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682203199/non-alcoholic_vymeuh.png' />
                        <BottomRight>Non Alcoholic</BottomRight>
                    </Category>
                
                </CategorySection>
            
            </InputContainer>
            <Next type='button' onClick={()=>{setCurrentPage(currentPage + 1);setIsNextClicked(true)}} disabled={strDrink.length == 0 || strAlcoholic.length == 0 ? true :  false}><ArrowRight/></Next>
        </Wrapper>
    )
    
}

const CheckButton = styled.div`
    position:absolute;
    top: 2%;
    right: 3%;
    color: #698695;
    font-size: 30px;
    margin-left: 10%;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between; 
`

const InputContainer = styled.div`
    align-self: center;
    height: 90%;
    display: flex ;
    flex-direction: column;
    justify-content: center;
    gap: 20%;
`

const DrinkNameInput = styled.input`
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 45px;
    text-align: center;
    font-family: "Comic Neue";
`

const CategorySection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 200px);
    grid-gap: 3em;
    justify-content: center;
`

const Category = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 1fr 2fr 1fr;
    grid-gap: 2em;
    background-color: white;
    color: black;
    font-size: 1.2em;
    padding: 10px;
    border-radius: 5%;
    box-shadow: ${props => props.isClicked ? "0px 5px 15px #e9edc9" : "0px 5px 15px grey"};
    &:hover{
        cursor: pointer; 
    }
`

const CategoryPicture = styled.img`
    width: 60px;
    justify-self: center;
    align-self: center;
    font-size: 2em;
`

const TopLeft = styled.div`
    padding: 0.1em;
    -webkit-text-stroke-color: #ccd5ae;
    -webkit-text-stroke-width: 0.9px;
    background-color: #e9edc9;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    font-family: var(--font-category-heading)
`

const BottomRight = styled.div`
    align-self: end;
    transform: rotate(180deg);
    -webkit-text-stroke-color: #4d536e;
    -webkit-text-stroke-width: 0.9px;
    background-color: #84a98c;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    font-family: var(--font-category-heading)
`

const Next = styled.button`
    margin: 20px;
    background-color: transparent;
    font-size: 25px;
    &:hover{
        cursor: pointer;
    }
`

export default BasicDrinkInfo;