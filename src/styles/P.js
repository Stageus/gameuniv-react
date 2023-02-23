// ===== import base =====
import styled from "styled-components"

// ===== import style fun =====
import {color, fontSize, fontWeight} from "./style"

export const P = styled.p`
    width: fit-content;
    height: fit-content;
    margin: ${(props) => props.margin || "0"};
    padding: ${(props) => props.padding || "0"};

    // p 초기 설정
    // font-size xs font weight light
    font-size: ${ (props) => props.font_size || fontSize("xs")};
    font-weight: ${ (props)=> props.font_weight || fontWeight("light")};

`