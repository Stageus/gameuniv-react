// ===== import base =====
import styled, {css} from "styled-components"

// ===== import style fun =====
import {color, fontSize, fontWeight} from "./style"

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
    background-color: ${(props) => props.background_color || "none"};
    
    ${(props) => FLEX_STYLE[props.flex_style] || "none"};
`

const FLEX_STYLE = {
    flexCenter : css`
        align-items: center;
        justify-content: center;
    `,
    flexLeftCenter : css`
        align-items: center;
        justify-content: start;
    `,
    flexRightCenter : css`
        align-items: center;
        justify-content: end;
    `,
    flexTopCenter : css`
        justify-content: center;
    `,
    flexSpaceBetween : css`
        align-items: center;
        justify-content: space-between;
    `,
    flexSpaceAround : css`
        align-items: center;
        justify-content: space-around;
    `,
}