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

const [clickedSection , setClickedSection] = useState(null)

const sectionList = 
    [{"name":"Home","icon":"https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682734952/home_bonqys.png"}
    ,{"name":"DashBoard","icon":'https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682736948/clipboard_zt0z4p.png'}
    ,{"name":"Collection","icon":'https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682736120/drink_aurwsc.png'}
    ,{"name":"Community","icon":'https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682736247/speech-bubble_1_iyktpv.png'}
    ]

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
        sectionList,
        communityState,actions:{createPost , submitPost},
        allPostsList, setAllPostsList,
        currentPage , setCurrentPage,
        isClick , setIsClick,
        formData , setFormData,
        fileName , setFileName,
        clickedSection , setClickedSection
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
