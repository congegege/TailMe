import { useContext } from "react";
import { RecipesContext } from "../../Context/RecipesContext";

const CommunityCollectButton = ({id,recipeInfo}) =>{

    //to get the user info
    const {state} = useContext(RecipesContext);

    
    const handleClick = () =>{
        if(state && recipeInfo){
            const {sub} = state.user;
            const {strDrink,img} = recipeInfo
            fetch("/api/users/communityCollections",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:id,strDrink:strDrink,img:img,sub:sub
                }),
            })
            .then((res)=>res.json())
            .then((resData)=>{
                console.log(resData.data)
            })
        }
    }

    return <button onClick={handleClick}>Collect</button>
}

export default CommunityCollectButton;