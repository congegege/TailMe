import { useReducer } from "react";
import { createContext, useState} from "react";

export const RecipesContext = createContext();

const initialState = {
  user: null,
  status:null,
};

const reducer = (state, action) =>{
  switch(action.type) {
    case "user-logIn":
      return{
        ...state,
        user:action.data,
        status:"user-logIn"
      };
      default:
        throw new Error(`Action unknown: ${action.type}`)
  }
}

export const RecipesProvider = ({ children }) => {
//store all the recipes
const [recipesList, setRecipesList] = useState(null);

//store all the items fetch from "/home"
const[categoryList,setCategoryList] = useState(null);

//store whether the filter is clicked
const [isClicked,setIsClicked] = useState(false);

// to store the rate that user clicked on
const [rating,setRating] = useState(0);

//to store the averageRate
const [averageRate ,  setAverageRate] = useState(null);

//reducer set up
const [state, dispatch] = useReducer(reducer,initialState);

const userLogIn = (data) =>{
  
  dispatch({type:"user-logIn",data})
}

  

  return (
    <RecipesContext.Provider
      value={{
        state,actions:{userLogIn},
        recipesList, setRecipesList,categoryList,setCategoryList,isClicked,setIsClicked,rating,setRating,averageRate,setAverageRate,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
