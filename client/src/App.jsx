import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Home from "./components/Home/Home";
import RecipesDetail from"./components/RecipesDetail/RecipesDetail";
import { useEffect , useContext , useState } from "react";
import CategoryResult from "./components/Category/CategoryResult";
import { RecipesContext } from "./components/Context/RecipesContext";
import Profile from "./components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Community from "./components/community/Community";
import PostDetail from "./components/community/PostDetail/PostDetail";
import ContactUs from "./components/Footer/ContactUs";
import Policy from "./components/Footer/Policy";
import Error from "./components/error/Error";


const App = () => {
  const {setCategoryList,setRecipesList,actions:{userLogIn}} = useContext(RecipesContext);
  const { user } = useAuth0();
  const [isError, setIsError] = useState(false);
  
  //store all the recipes data
    useEffect(()=>{
      fetch("/api/recipes")
      .then(res=>res.json())
      .then(resData=>setRecipesList(resData.data))
      .catch(error=>setIsError(true))
    },[])
    
    //get the category list
    useEffect(()=>{
        fetch("/api/categories")
        .then(res=>res.json())
        .then(resData=>setCategoryList(resData.data))
        .catch(error=>setIsError(true))
    },[])

    //store the user info ans change the status
    useEffect(()=>{
      if(user){
        fetch(`/api/users/${user.sub}`)
        .then(res=>res.json())
        .then(resData=>userLogIn(resData.data))
        .catch(error=>setIsError(true))
      }
    },[user])

    //when there is error show error page
    if(isError){
      return <Error/>
    }

  return (
    <>
    <GlobalStyle/>
    
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/categories" element = {<CategoryResult/>}/>
      <Route path="/recipes/:id" element = {<RecipesDetail/>}/>
      <Route path="/profile/:id" element = {<Profile/>}/>
      <Route path="/community" element = {<Community/>}/>
      <Route path="/community/:id" element = {<PostDetail/>}/>
      <Route path="/contact" element = {<ContactUs/>}/>
      <Route path="/policy" element = {<Policy/>}/>
      
    </Routes>
    
    </>
  )
}

export default App
