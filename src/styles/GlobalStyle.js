import { createGlobalStyle } from "styled-components";
import { fontSize, color, fontWeight } from "./style"

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-size: ${fontSize("m")};
        ${fontWeight("regular")};
        color : ${color("grayscale7")};
        background-color: ${color("grayscale1")};
        min-width:473px;
        max-width:2560px;
    }
    a{
        text-decoration: none;
        color: ${color("grayscale7")}
    }
    ::-webkit-scrollbar{
        width: 8px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${color("blue3")};
        border-radius: 25px;
    }
    ::-webkit-scrollbar-track{
        background-color: ${color("grayscale4")};
    }

`
export default GlobalStyle;