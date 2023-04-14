import { useContext } from "react";
import { RecipesContext } from "../Context/RecipesContext";


const AverageRate = () =>{
    const {averageRate} = useContext(RecipesContext);

    //when there is no comments yet
    if(!averageRate || averageRate == 0){
        return<>No Rate yet</>
    }

return (
    <>
    <div>Average Rate</div>
    <div>{averageRate}</div>
    </>
)
}

export default AverageRate;