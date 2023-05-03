import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";

import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import RecipesDetail from"./components/RecipesDetail/RecipesDetail";
import { useEffect , useContext } from "react";
import CategoryResult from "./components/Category/CategoryResult";
import { RecipesContext } from "./components/Context/RecipesContext";
import Profile from "./components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Community from "./components/Community/Community";
import PostDetail from "./components/Community/PostDetail/PostDetail";

const App = () => {
  const {setCategoryList,setRecipesList,actions:{userLogIn}} = useContext(RecipesContext);
  const { user } = useAuth0();
  
    useEffect(()=>{
      fetch("/api/recipes")
      .then(res=>res.json())
      .then(resData=>setRecipesList(resData.data))
    },[])

    useEffect(()=>{
        fetch("/api/categories")
        .then(res=>res.json())
        .then(resData=>setCategoryList(resData.data))
    },[])

    useEffect(()=>{
      if(user){
        fetch(`/api/users/${user.sub}`)
        .then(res=>res.json())
        .then(resData=>userLogIn(resData.data))
      }
    },[user])

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
    </Routes>
    <Footer/>
    </>
  )
}

export default App
