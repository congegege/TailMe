import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import RecipesDetail from"./components/RecipesDetail/RecipesDetail";
import { useEffect } from "react";

const App = () => {

  return (
    <>
    <GlobalStyle/>
    <Header/>
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/recipes/:id" element = {<RecipesDetail/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
