import { useContext , useState} from "react";
import { RecipesContext } from "../Context/RecipesContext";
import styled from "styled-components";
import RateIconHandler from "../IconHandlers/RateIconHandler";
import { useEffect } from "react";


const AverageRate = ({id,averageRate,setAverageRate}) =>{
    //to store the averageRate
    
    const {isRate} = useContext(RecipesContext);

    console.log(isRate)
    useEffect(()=>{
        fetch(`/api/rateAverage/${id}`)
        .then(res=>res.json())
        .then(resData=>setAverageRate(resData.data))
    },[isRate])

    if(!id){
        return <>Loading</>
    }

return (
    <>
    {averageRate && !averageRate == 0 &&
    <RateSection>
        <RateIconHandler averageRate={averageRate}/>
        <Rate>{averageRate % 1 == 0 ? averageRate + ".0" : averageRate}</Rate>
    </RateSection>}
    </>
)
}

const RateSection = styled.div`
    display: flex;
    gap: 20%;
    align-items: center;
    width: 8%;
`
const Rate = styled.div`
    font-size: 30px;
    font-family: var(--font-category-heading) ;
    color: transparent;
    -webkit-text-stroke: #56665d;
	-webkit-text-stroke-width: 1.5px;
`

export default AverageRate;