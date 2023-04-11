import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import RecipesDetail from"./components/RecipesDetail/RecipesDetail";
import { useEffect , useContext } from "react";
import CategoryResult from "./components/Category/CategoryResult";
import { RecipesContext } from "./components/Context/RecipesContext";

const App = () => {
  const {categoryList,setCategoryList} = useContext(RecipesContext)
    console.log(categoryList)

    useEffect(()=>{
        fetch("/api/categories")
        .then(res=>res.json())
        .then(resData=>setCategoryList(resData.data))
    },[])

  return (
    <>
    <GlobalStyle/>
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/categories" element = {<CategoryResult/>}/>
      <Route path="/recipes/:id" element = {<RecipesDetail/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
