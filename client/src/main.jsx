import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import {RecipesProvider} from "./components/Context/RecipesContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RecipesProvider>
      <App />
    </RecipesProvider>
  </BrowserRouter>,
)
