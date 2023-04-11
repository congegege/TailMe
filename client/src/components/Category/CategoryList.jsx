import { useContext} from "react";
import { Link  } from "react-router-dom";
import { RecipesContext } from "../Context/RecipesContext";

const CategoryList = () =>{
    const {categoryList} = useContext(RecipesContext)

    return(
        <>
        {/* show each category */}
        {categoryList && categoryList.map((category)=>{
            return (
            <Link to={`/categories/?strCategory=${category}`} key={category}><div key={category}>{category}</div></Link>
            )
        })}
        </>
    )
}

export default CategoryList;