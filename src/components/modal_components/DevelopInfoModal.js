// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====

// ===== import recoil =====
import { whichPageState } from "../../recoil/PageState"

// ===== import style =====
import { Img, ImgBtn } from "../../styles/Img"
import { Div } from "../../styles/Div"
import { H1 } from "../../styles/H1"
import { P } from "../../styles/P"
import { Button } from "../../styles/Button"
// ===== import style func =====
import { color } from "../../styles/style"


// ===== style =====

//  ===== component =====

const DevelopInfoModal = () =>{
    return(
        <Div width="330px" height="320px" flex_direction="column" justify_content="flex-start">
            <Div flex_direction="column" align_items="flex-start" width="80%" margin="0 20px">
                <H1 font_size="m" color="grayscale7" font_weight="regular" margin="15px 0">개발자 정보</H1>
                <P>한승재</P>
                <Div>
                    <P font_size="xxs">소속: 스테이지어스</P>
                    <P font_size="xxs" margin="5px 10px">역할: PM, 프론트엔드</P>
                </Div>
                <P font_size="xxs" margin="0 0 5px 0">Contact: hseungjae1202@naver.com</P>
                <P>장승훈</P>
                <Div>
                    <P font_size="xxs">소속: 스테이지어스</P>
                    <P font_size="xxs" margin="5px 10px">역할: 프론트엔드, 디자인</P>
                </Div>
                <P font_size="xxs" margin="0 0 5px 0">Contact: wjang07@gmail.com</P>
                <P>민경찬</P>
                <Div>
                    <P font_size="xxs">소속: 스테이지어스</P>
                    <P font_size="xxs" margin="5px 10px">역할: 백엔드</P>
                </Div>
                <P font_size="xxs" margin="0 0 5px 0">Contact: joch2712@naver.com</P>
            </Div>
        </Div>
    )
}

export default DevelopInfoModal