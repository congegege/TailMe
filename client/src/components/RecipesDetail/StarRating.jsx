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

    //to store the rate
    const [rating,setRating] = useState(0);
    //to get the user Info
    const {state, setIsRate} = useContext(RecipesContext);

    useEffect(()=>{
        const reset = async() =>{
            
            if(state.user){
                console.log("hi")
                const {sub} = state.user
                const postResult = await fetch("/api/userRate",{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id:id,sub:sub
                    }),
                })
                const postRespond = await postResult.json();
                setRating(postRespond.data);
                
            }
        }
        reset()
        
        },[])
    
        
    useEffect(()=>{
        const post = async() =>{
            if(state.user){
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
                setIsRate(false);
        }
        }
        post()
    },[rating])

    //onclick function
    const handleClick = async(index) =>{
        setIsRate(true);
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
        <RateSection>
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
                    <Star size={30} weight="fill" />
                </Rating>
            })}
        </RateSection>
        </>
        
    )
}

const RateSection = styled.div`
    display: flex;
`

const Rating = styled.div`
    color: ${props => props.israted ? "#acd5b4" : "#0a3217"};
    font-weight: fill;
    &:hover{
        cursor: pointer;
        color:${props => props.israted ? "#acd5b4" : "#0a3217"} ;
    }
`

export default StarRating;