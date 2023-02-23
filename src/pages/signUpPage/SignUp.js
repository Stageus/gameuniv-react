// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====
import { whichPageState } from "../../recoil/PageState"

// ===== import style =====
import {H1} from "../../styles/H1"
import {Img} from "../../styles/Img"
import {Div} from "../../styles/Div"
import {Input} from "../../styles/Input"
import {Button} from "../../styles/Button"
import {P} from "../../styles/P"

// ===== import style fun =====
import {color, fontWeight, fontSize} from "../../styles/style"


// ===== style =====
const SignUpPageBtn = styled(Button)`
    font-size: ${fontSize("xxxs")}; 
    ${fontWeight("light")};
    color: ${color("blue3")};
    background-color: ${color("grayscale1")};
    border: 1px solid ${color("blue3")};

    &:hover{
        background-color: ${color("blue3")};
        color: ${color("grayscale1")};
    }
`
//  ===== component =====
const signUp = () =>{

    return(
        <React.Fragment>
            <Div flex_direction="column" align_items="felx-start" padding="0">
                <H1 font_size= {fontSize("xxl")} padding="20px 0" color={color("grayscale7")}>계정 생성</H1>
                {/* step progress bar 구현하기 */}
                <P font_size = {fontSize("xxs")} padding="10px 0">정보를 입력해주세요</P>
                <P font_size = {fontSize("xxs")} padding="5px 0">이름</P>
                <Input width="100%" max_width="289px" height="28px" placeholder="이름" font_size={fontSize("xxs")} padding="0 10px" margin="0 10px 0 0"/>
                
                <P font_size = {fontSize("xxs")} padding="5px 0">아이디</P>
                <Div width="105%" justify_content="space-between">
                    <Input width="75%" max_width="289px" height="28px" placeholder="아이디" font_size={fontSize("xxs")} padding="0 10px" margin="0 10px 0 0"/>
                    <SignUpPageBtn width="81px" height="28px" >verification</SignUpPageBtn>
                </Div>
                <P font_size = {fontSize("xxs")} padding="5px 0">비밀번호</P>
                <Input width="100%" max_width="289px" height="28px" placeholder="비밀번호" font_size={fontSize("xxs")} padding="0 10px" margin="0 10px 0 0"/>
                <P font_size = {fontSize("xxs")} padding="5px 0">비밀번호 확인</P>
                <Input width="100%" max_width="289px" height="28px" placeholder="비밀번호 확인" font_size={fontSize("xxs")} padding="0 10px" margin="0 10px 0 0"/>
            </Div>
        </React.Fragment>
    )
}
export default signUp