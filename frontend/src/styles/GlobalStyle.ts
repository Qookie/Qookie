import { createGlobalStyle } from 'styled-components';
import { ColorSystem } from './ColorSystem';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    ${ColorSystem}; 

    html, body{
        font-family: "Pretendard";
        -ms-overflow-style: none;
        width: 100%;
    }

    ::-webkit-scrollbar {
        display: none;
    }
`;
export default GlobalStyle;
