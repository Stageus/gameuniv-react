// ===== import base =====
import styled from "styled-components"

// ===== import style fun =====
import {color, fontSize, fontWeight} from "./style"

// 로그인버튼 비밀번호 찾기 버튼 등 이미지로 들어가지 않는 버튼들
export const Button = styled.button`
    display: flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;

    width: ${(props)=> props.width || "auto"};
    height: ${(props)=> props.height || "auto"};
    margin: ${(props)=> props.margin || "0"};
    padding: ${(props)=> props.padding || "0"};

    //논의 필요 모든 버튼 5px로 할지
    border-radius: ${(props)=> props.border_radius || "5px"};
    
    // 버튼 초기설정 
    //배경 blue3 글씨 grayscale1 font-size m font-weight bold
    background-color: ${(props) => props.color || color("blue3")};
    color: ${(props) => props.background_color || color("grayscale1")};
    font-size: ${ (props) => props.font_size || fontSize("m")};
    font-weight: ${ (props)=> props.font_weight || fontWeight("bold")};
    
    
`