import React, { useContext } from 'react';
import { CommunityContext } from "../Context/CommunityContext";
import styled from "styled-components"
import { useState } from 'react';

const BasicDrinkInfo = () =>{
    const { currentPage , setCurrentPage , formData , setFormData} = useContext(CommunityContext);
    const{strDrink , strAlcoholic} = formData;
    const [isNextClicked , setIsNextClicked] =  useState(false)

    
    console.log(formData, isNextClicked)
    return (
        <Wrapper>
            <InputContainer>
                <div>
                    <label htmlFor="name">Drink name</label>
                    <input type="text" id="name" defaultValue={strDrink} onChange={(ev)=>{setFormData({...formData,"strDrink": ev.target.value})}}/>
                </div>
                <CategorySection>
                    <Category onClick={()=>{setFormData({...formData,"strAlcoholic": "Alcoholic"})}}>
                        <TopLeft>Alcoholic</TopLeft>
                        <CategoryPicture src='https://res.cloudinary.com/dgy6nwt6m/image/upload/v1681964713/beverage_sokn7c.png'/>
                        <BottomRight>Alcoholic</BottomRight>
                    </Category>
                    <Category onClick={()=>{setFormData({...formData,"strAlcoholic": "NonAlcoholic"})}}>
                        <TopLeft>Non Alcoholic</TopLeft>
                        <CategoryPicture src='https://res.cloudinary.com/dgy6nwt6m/image/upload/v1681964577/non-alcoholic-beer_pvnbam.png' />
                        <BottomRight>Non Alcoholic</BottomRight>
                    </Category>
                
                </CategorySection>
            
            </InputContainer>
            <button onClick={()=>{setCurrentPage(currentPage + 1);setIsNextClicked(true)}} disabled={strDrink.length == 0 || strAlcoholic.length == 0 ? true :  false}>Next</button>
        </Wrapper>
    )
    
}

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

const CategorySection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 200px);
    grid-gap: 3em;
    justify-content: center;
`

const Category = styled.div`
    display: grid;
    grid-template-rows: 1fr 2fr 1fr;
    grid-gap: 2em;
    background-color: white;
    color: black;
    font-size: 1.2em;
    padding: 10px;
    border-radius: 5%;
    box-shadow: 0px 5px 15px grey;
    &:hover{
        cursor: pointer;
        box-shadow:0px 5px 15px #e9edc9 ;
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
`

const BottomRight = styled.div`
    align-self: end;
    transform: rotate(180deg);
`

export default BasicDrinkInfo;