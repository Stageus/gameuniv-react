// ===== import base =====
import styled from "styled-components"

// ===== import style fun =====
import {color, fontSize, fontWeight} from "./style"

export const Input = styled.input`
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "fit-content"};
    margin: ${(props) => props.margin || "0"};
    padding: ${(props) => props.padding || "0"};
    border: ${(props) => props.border || "1px solid black"};
    border-radius: ${(props) => props.border_radius || "none"};

    // input 초기 설정
    // font-size xs font weight light
    font-size: ${ (props) => props.font_size || fontSize("xs")};
    font-weight: ${ (props)=> props.font_weight || fontWeight("light")};
`