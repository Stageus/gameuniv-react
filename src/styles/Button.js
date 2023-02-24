// ===== import base =====
import styled from "styled-components"

// ===== import style func =====
import {color, fontSize, fontWeight} from "./style"

// 로그인버튼 비밀번호 찾기 버튼 등 이미지로 들어가지 않는 버튼들
export const Button = styled.button`
    display: flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;
    border: none;
    width: ${(props)=> props.width || "auto"};
    max-width: ${(props)=> props.max_width || "auto"};
    height: ${(props)=> props.height || "auto"};
    margin: ${(props)=> props.margin || "0"};
    padding: ${(props)=> props.padding || "0"};
    border-radius: ${(props)=> props.border_radius || "5px"};
    
    // 버튼 초기설정 
    //배경 blue3 글씨 grayscale1 font-size m font-weight bold
    background-color: ${(props) => color(props.color) || color("blue3")};
    color: ${(props) => color(props.background_color) || color("grayscale1")};
    font-size: ${ (props) => fontSize(props.font_size) || fontSize("m")};
    ${ (props)=> fontWeight(props.font_weight)|| fontWeight("regular")};

    &:hover{
        background-color: ${color("blue4")};
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`