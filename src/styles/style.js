import styled, {css} from "styled-components"

export const fontSize = (font_size)=>{
    if(font_size === "xxxs") return "10px"
    if(font_size === "xxs") return "13px"
    if(font_size === "xs") return "16px"
    if(font_size === "s") return "20px"
    if(font_size === "m") return "24px"
    if(font_size === "l") return "32px"
    if(font_size === "xl") return "36px"
    if(font_size === "xxl") return "48px"
    if(font_size === "xxxl") return "64px"
}

export const color = (color) =>{
    if(color === "grayscale1") return "#FFFFFF"
    if(color === "grayscale2") return "#FAFAFA"
    if(color === "grayscale3") return "#ECECEC"
    if(color === "grayscale4") return "#D9D9D9"
    if(color === "grayscale5") return "#AAAAAA"
    if(color === "grayscale6") return "#575757"
    if(color === "grayscale7") return "#000000"
    if(color === "blue1") return "#F7F7F9"
    if(color === "blue2") return "#B9D2FF"
    if(color === "blue3") return "#2D6EE4"
    if(color === "blue4") return "#030089"
    if(color === "blue5") return "#E2EBFF"
    if(color === "yellow1") return "#FFF7DF"
    if(color === "yellow2") return "#FFD869"
    if(color === "yellow3") return "#E29E00"
    if(color === "red1") return "#FF553E"
    if(color === "red2") return "#D12008"
    if(color === "green") return "#23D455"
}

export const fontWeight = (font_weight) =>{
    if( font_weight === "light") return css`
        @font-face {
            font-family: "NotoSansKR-Regular";
            src: url("/fonts/NotoSansKR-Regular.otf");
        }
        font-family: "NotoSansKR-Regular";
    `
    else if( font_weight === "regular") return css`
        @font-face {
            font-family: "NotoSansKR-Bold";
            src: url("/fonts/NotoSansKR-Bold.otf");
        }
        font-family: "NotoSansKR-Bold";
    `
    else if( font_weight === "bold") return css`
        @font-face {
            font-family: "NotoSansKR-Black";
            src: url("/fonts/NotoSansKR-Black.otf");
        } 
        font-family: "NotoSansKR-Black";
    `
}