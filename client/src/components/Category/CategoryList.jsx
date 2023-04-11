import { useContext, useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import { RecipesContext } from "../Context/RecipesContext";

const CategoryList = () =>{
    const {categoryList} = useContext(RecipesContext)

    return(
        <>
        {categoryList && categoryList.map((category)=>{
            return (
            <Link to={`/categories/?strCategory=${category}`}><div key={category}>{category}</div></Link>
            )
        })}
        </>
    )
}

export default CategoryList;