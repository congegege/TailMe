import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import {RecipesProvider} from "./components/Context/RecipesContext";
import Auth0ProviderHandler from './components/auth0/Auth0ProviderHandler';
import { CommunityProvider } from './components/Context/CommunityContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Auth0ProviderHandler>
      <RecipesProvider>
        <CommunityProvider>
          <App />
        </CommunityProvider>
      </RecipesProvider>
    </Auth0ProviderHandler>
  </BrowserRouter>,
)
