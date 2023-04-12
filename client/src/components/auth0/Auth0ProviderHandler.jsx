import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

//Auth0 set up
export const Auth0ProviderHandler = ({ children }) => {

    const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
    >
        {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderHandler;
