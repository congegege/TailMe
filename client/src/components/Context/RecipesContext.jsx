import { createContext, useState} from "react";

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  //store all the items fetch from "/home"
  const[categoryList,setCategoryList] = useState(null);

  const [isClicked,setIsClicked] = useState(false)

  return (
    <RecipesContext.Provider
      value={{
        categoryList,setCategoryList,isClicked,setIsClicked
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
