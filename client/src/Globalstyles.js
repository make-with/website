import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing:border-box;
    }
    html, body, #root, #root > div {
      height: fit-content;
    }
    img {
      display: block;
    }
    a, a:hover { 
      text-decoration: none;
      color: inherit;
    }
    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      color: #404040;
      font-size: 16px;
      font-weight: 400;
    }
    ul, p {
      margin: 0;
    }
    input, button, textarea {
      outline: none;
      border: none;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
      -webkit-transition: background-color 9999s ease-out;
      -webkit-text-fill-color: inherit !important;
   }
    button {
      cursor: pointer;
    }
    ul {
      list-style: none;
    }
    .material-icons {
      color: #404040;
    }
    body,
    #body {
      width: 100%;
      color: #404040;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.2;
      font-family: 'Noto Sans CJK KR', sans-serif;
      background-color: #fff;
    }
    .inner {
      width: 1100px;
      margin: 0 auto;
      position: relative;
    }
`;

export default GlobalStyles;
