import { createGlobalStyle } from "styled-components";
import { fontSize, color, backgroundColor, fontWeight } from "./style"

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-size: ${fontSize("m")};
        ${fontWeight("regular")};
        color : ${color("grayscale7")};
        background-color: ${backgroundColor("grayscale1")};
        
    }
    a{
        text-decoration: none;
        color: ${color("grayscale7")}
    }
    ::-webkit-scrollbar{
        width: 8px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${backgroundColor("blue3")};
        border-radius: 25px;
    }
    ::-webkit-scrollbar-track{
        background-color: ${backgroundColor("grayscale4")};
    }

`
export default GlobalStyle;