import styled from "styled-components"

export const Input = styled.input`
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "fit-content"};
    margin: ${(props) => props.margin || "0"};
    padding: ${(props) => props.padding || "0"};
    border: ${(props) => props.border || "1px solid black"};
    border-radius: ${(props) => props.border_radius || "none"};
`