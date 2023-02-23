// ===== import base =====
import styled from "styled-components"

// ===== import style fun =====
import {color, fontSize, fontWeight} from "./style"

export const H1 = styled.h1`
    width: fit-content;
    height: fit-content;
    margin: ${(props) => props.margin || "0"};
    padding: ${(props) => props.padding || "0"};

    // h1 초기 설정
    // font-size xxxl font-weight bold
    color: ${ (props) => color(props.color) || color("blue3")};
    font-size: ${ (props) => fontSize(props.font_size) || fontSize("xxxl")};
    ${(props)=> fontWeight(props.font_weight)|| fontWeight("bold")};
`