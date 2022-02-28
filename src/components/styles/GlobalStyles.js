import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyle = createGlobalStyle`
 :root {
    --black: #121212;
    --green: #1DB954;
    --white: #ffffff;

    --font: 'Circular Std', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  }

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  background-color: black;
  color: white;
}
`;
