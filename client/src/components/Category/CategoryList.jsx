import { useContext} from "react";
import { Link  } from "react-router-dom";
import { RecipesContext } from "../Context/RecipesContext";
import styled from "styled-components";

const CategoryList = () =>{
    const {categoryList} = useContext(RecipesContext)

    return(
        <>
        {/* show each category */}
        {categoryList && categoryList.map((category)=>{
            return (
            <Category to={`/categories/?strCategory=${category}`} key={category}><div key={category}>{category}</div></Category>
            )
        })}
        </>
    )
}

const Category = styled(Link)`
    color: black;
    font-family: 'Nunito Sans';
    &:hover{
        color: #ffe8d6;
    }
`

export default CategoryList;