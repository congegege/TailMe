import { Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import GlobalStyle from "./components/GlobalStyle";
import { useEffect } from "react";

function App() {

  return (
    <>
    <GlobalStyle/>
    <Header/>
    <Routes>
      <Route path="/" element = {<Home/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
