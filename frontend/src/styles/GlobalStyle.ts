import { createGlobalStyle } from 'styled-components';
import { ColorSystem } from './ColorSystem';
import reset from 'styled-reset';
import PretendardBold from '../assets/fonts/Pretendard/Pretendard-Bold.woff2';
import PretendardSemiBold from '../assets/fonts/Pretendard/Pretendard-SemiBold.woff2';
import PretendardRegular from '../assets/fonts/Pretendard/Pretendard-Regular.woff2';

const GlobalStyle = createGlobalStyle`
    ${reset};
    ${ColorSystem}; 
    
    @font-face {
        font-family: 'Pretendard';
        font-style: bold;
        font-weight: 700;
        src: url(${PretendardBold}) format("woff2");

    }

    @font-face {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        src: url(${PretendardSemiBold}) format("woff2");
    }

    @font-face {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        src: url(${PretendardRegular}) format('woff2');
    }
    
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
