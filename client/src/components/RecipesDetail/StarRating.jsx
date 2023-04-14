import { Star } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import styled from "styled-components";
import { RecipesContext } from "../Context/RecipesContext";


const StarRating  = ({id}) =>{
    // create the array from 0 to 4
    const ratingStarsList = Array.from({length: 5}, (value, i) => i)
    // to store the rate index that user hover on
    const [hoverStar, setHoverStar] = useState(0);
    //to get the user Info
    const {state,rating,setRating,averageRate,setAverageRate} = useContext(RecipesContext);

    useEffect(()=>{
        const rateHandler = async()=>{
            try{
                if(state){
                    const {sub} = state.user
                    const postResult = await fetch("/api/rate",{
                        method:"POST",
                        headers:{
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id:id,rate:rating,sub:sub
                        }),
                    })
                    const postRespond = await postResult.json();
                    console.log(postRespond)
                }
        
                    const result = await fetch(`/api/rateAverage/${id}`)
                    const respond = await result.json();
                    setAverageRate(respond.data)
            }
            catch(err){
                console.log
            }
        }
        rateHandler();
    },[rating])

    //onclick function
    const handleClick = async(index) =>{
            //when user click on the rate they selected everything will be reset
            if(rating == index + 1){
                setRating(0);
                setHoverStar(0);
            }
        //when user click on the new rate they wanna select, set both to index + 1(plus one cause its 0 to 4)
            else{
                setRating(index+1);
                setHoverStar(index+1);
            }

            
        }
    
    
    return (
        <>
        <p>Rate</p>
        <div>
            {ratingStarsList.map((star,index)=>{
                return <Rating key={index}
                onClick={()=>handleClick(index)}
                //when user selected the rate already, judge whether the one user hover is bigger then the rating.
                //If its then hover trigger, if its not then hover set to the rating hover not triggered.
                //when user hasnt selected the rate yet, set the rating to index + 1 in general circumstance.
                onMouseEnter={()=>{rating > 0 ? rating <= index+1 ? setHoverStar(index+1) : setHoverStar(rating) :setHoverStar(index+1)}}
                onMouseLeave={()=>setHoverStar(rating)}
                israted={index+1 <= ((rating && hoverStar) || hoverStar) ? true : false}
                >
                    <Star size={40} weight="fill" />
                </Rating>
            })}
        </div>
        </>
        
    )
}

const Rating = styled.div`
    color: ${props => props.israted ? "red" : "pink"};
    font-weight: fill;
    &:hover{
        cursor: pointer;
        color:${props => props.israted ? "red" : "pink"} ;
    }
`

export default StarRating;