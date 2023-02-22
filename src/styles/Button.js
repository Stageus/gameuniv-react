import styled from "styled-components"

export const Button = styled.button`
    display: flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;

    width: ${(props)=> props.width || "auto"};
    height: ${(props)=> props.height || "auto"};
    margin: ${(props)=> props.margin || "0"};
    padding: ${(props)=> props.padding || "0"};
    border-radius: ${(props)=> props.border_radius || "none"};
    // 컬러 지정은 아마 style.js 완성되면 바뀔듯
    background-color: ${(props) => props.background_color || "initial"};
    color: ${(props) => props.color || "initial"};
`