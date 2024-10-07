import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    width: 100dvw;
    height: 100dvh;
    font-family:  'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

export default GlobalStyle;
