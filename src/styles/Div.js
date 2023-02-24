// ===== import base =====
import styled, {css} from "styled-components"

// ===== import style func =====
import {color} from "./style"

export const Div = styled.div`
    display: flex;
    flex-direction: ${(props) => props.flex_direction || "row"};
    align-items: ${(props)=> props.align_items || "center"};
    justify-content: ${(props)=> props.justify_content || "center"};

    width: ${(props) => props.width || "auto"};
    max-width: ${(props) => props.max_width || "auto"};

    height: ${(props) => props.height || "auto"};
    margin: ${(props) => props.margin || "0"};
    padding: ${(props) => props.padding || "0"};
    border: ${(props) => props.border || "none"};
    border-radius: ${(props) => props.border_radius || "none"};
    background-color: ${(props) => color(props.background_color) || "none"}; 
    
`
export const ShadowDiv = styled(Div)`
    box-shadow : 0px 0px 8px rgba(0, 0, 0, 0.25);
`


