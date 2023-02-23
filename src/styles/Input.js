// ===== import base =====
import styled from "styled-components"

// ===== import style fun =====
import {color, fontSize, fontWeight} from "./style"

export const Input = styled.input`
    width: ${(props) => props.width || "100%"};
    max-width: ${(props)=> props.max_width || "auto"};
    height: ${(props) => props.height || "fit-content"};
    margin: ${(props) => props.margin || "0"};
    padding: ${(props) => props.padding || "0"};
    border: ${(props) => props.border || `1px solid ${color("blue2")}`};
    border-radius: ${(props) => props.border_radius || "5px"};
    background-color: ${color("grayscale2")};

    // input 초기 설정
    // font-size xs font weight light
    font-size: ${ (props) => props.font_size || fontSize("xs")};
    ${ (props)=> props.font_weight || fontWeight("light")};

    &:focus{
        outline: 2px solid ${color("blue3")};
        background-color: ${color("grayscale1")};
    }
`