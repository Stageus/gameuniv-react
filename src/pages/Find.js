// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import style =====
import {H1} from "../styles/H1"
import {Img} from "../styles/Img"
import {Div} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P} from "../styles/P"

//  ===== component =====
const Find = () =>{

    const whichPage = useRecoilValue(whichPageState)

    return(
        <React.Fragment>
            {/* 아이디 찾기 페이지 */}
            {
                whichPage === "idFind"
                &&
                <React.Fragment>
                    <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                        <H1 font_size= "xxl" padding="20px 0" color="grayscale7">아이디 찾기</H1>
                        <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                        <P font_size = "xxs" padding="5px 0">이메일</P>
                        <Input width="100%" max_width="289px" height="28px" placeholder="이메일" font_size="xxs" padding="0 10px" margin="0 10px 0 0"/>
                    </Div>
                    <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px">아이디 찾기</Button>
                </React.Fragment>
            }
            
            {/* 비밀번호 찾기 페이지 */}
            {
                whichPage === "pwFind"
                &&
                <React.Fragment>
                    <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                        <H1 font_size= "xxl" padding="20px 0" color="grayscale7">비밀번호 찾기</H1>
                        <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                        <P font_size = "xxs" padding="5px 0">이메일</P>
                        <Input width="100%" max_width="289px" height="28px" placeholder="이메일" font_size="xxs" padding="0 10px" margin="0 10px 0 0"/>
                        <P font_size = "xxs" padding="5px 0">아이디</P>
                        <Input width="100%" max_width="289px" height="28px" placeholder="아이디" font_size="xxs" padding="0 10px" margin="0 10px 0 0"/>
                    </Div>
                    <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px">비밀번호 찾기</Button>
                </React.Fragment>
            }
        </React.Fragment>
    )
}
export default Find