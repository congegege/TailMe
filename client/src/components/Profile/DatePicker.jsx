import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {Calendar} from "react-multi-date-picker";
import styled from "styled-components";
import { RecipesContext } from "../Context/RecipesContext";
import DetailLoadingButton from "../Loading/DetailLoadingButton";
import {format} from "date-fns"


const DateSelector = () =>{
    const [dates,setDates] = useState();
    const {state} = useContext(RecipesContext);
    const [isLoading , setIsLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const today = format(new Date(),"yyyy.MMM.dd");
    

    useEffect(()=>{
            const {sub} = state.user;
            fetch(`/api/calendar/selectedDays/${sub}`)
            .then(res=>res.json())
            .then(resData => setDates(resData.data))
        
    },[])

    const handleChangeDate = async() =>{
        setIsLoading(true)
        if(state.user){
            const {sub} = state.user;
            
            fetch("/api/calendar",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sub:sub,date:dates
                }),
            })
            .then((res)=>res.json())
            .then((resData)=>{
                setIsLoading(false)
                setIsUpdate(false)
            })
        }
        
    }
    console.log(dates)
    return (
        <Wrapper>
        <Calendar  dateFormat  multiple  value = {dates} onChange={(value)=>{setDates(value);setIsUpdate(true);console.log(value)}}/>
        {!isLoading ? isUpdate && <UpdateButton onClick={handleChangeDate}>Update</UpdateButton>
        :<Loading><DetailLoadingButton/></Loading>}
        
        </Wrapper>
        )

}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const UpdateButton = styled.button`
    margin-top: 30px;
    width: 110px;
    height: 55px;
    align-self: center;
    display: flex;
    justify-content: center;
    background-color: transparent;
    border-radius: 50%;
    border: 3px dashed #3a5a40;
    font-size: 20px;
    font-family: var(--font-category);
    color: #6c584c;
    &:hover{
        background-color: #6b9080;
        color: #f5ebe0;
        
    }
`
const Loading = styled.button`
    margin-top: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 55px;
    align-self: center;
    background-color: transparent;
    border-radius: 50%;
    border: 3px dashed #3a5a40;
`


export default DateSelector;