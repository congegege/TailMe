import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root{
    --font-category-heading:'Space Grotesk', sans-serif;
    --font-category:'Quicksand', sans-serif;
    --font-query-header: 'Merienda', cursive;
    
}
html, body{
    margin: 0;
    padding: 0;
    font-family: "Roboto Mono", sans-serif;
}
`;
export default GlobalStyle;
