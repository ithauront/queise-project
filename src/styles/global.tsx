import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body, #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
`