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
        <Div width="330px" height="287px" flex_direction="column" justify_content="flex-start">
            <Div flex_direction="column" align_items="flex-start" width="80%" margin="20px">
                <H1 font_size="m" color="grayscale7" font_weight="regular" margin="15px 0">개발자 정보</H1>
                <P>프론트엔드: 한승재, 장승훈</P>
                <P>백엔드: 최민석</P>
                <P>디자인: 장승훈</P>
            </Div>
        </Div>
    )
}

export default DevelopInfoModal