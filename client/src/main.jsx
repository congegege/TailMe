import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import {RecipesProvider} from "./components/Context/RecipesContext";
import Auth0ProviderHandler from './components/auth0/Auth0ProviderHandler';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Auth0ProviderHandler>
      <RecipesProvider>
        <App />
      </RecipesProvider>
      </Auth0ProviderHandler>
  </BrowserRouter>,
)
