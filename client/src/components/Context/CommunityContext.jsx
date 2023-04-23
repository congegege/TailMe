import { useReducer } from "react";
import { createContext, useState} from "react";

export const CommunityContext = createContext();

const initialState = {
  post: null,
  status:null,
};

const reducer = (state, action) =>{
  switch(action.type) {
    case "submit-post":
      return{
        ...state,
        status:"submit-post"
      };
    case "create-post":
      return{
        ...state,
        post:action.data,
        status:"create-post"
      };

      default:
        throw new Error(`Action unknown: ${action.type}`)
  }
}

export const CommunityProvider = ({ children }) => {
  const [formData , setFormData] = useState({
    strDrink:"",
    strAlcoholic:"",
    post:"",
    img:"",
  })

// to store all the post in the community page
const [allPostsList, setAllPostsList] = useState(null);

const [currentPage , setCurrentPage] = useState(0);

const [isClick , setIsClick] = useState(false);

const [fileName , setFileName] = useState (null);

//reducer set up
const [communityState, dispatch] = useReducer(reducer,initialState);

const submitPost = () =>{
  dispatch({type:"submit-post"})
}

const createPost = (data) =>{
  dispatch({type:"create-post",data})
}

  return (
    <CommunityContext.Provider
      value={{
        communityState,actions:{createPost , submitPost},
        allPostsList, setAllPostsList,
        currentPage , setCurrentPage,
        isClick , setIsClick,
        formData , setFormData,
        fileName , setFileName
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
