// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled from "styled-components"

//  ===== import recoil =====


// ===== import style =====
import {H1} from "../../styles/H1"
import {Img} from "../../styles/Img"
import {Div, ShadowDiv} from "../../styles/Div"
import {P} from "../../styles/P"

// ===== style =====

const RelativeDiv = styled(ShadowDiv)`
    position:relative;
    z-index: -1;
`
const AbsoluteImg = styled(Img)`
    position:absolute;
    right :0px;
    z-index: -1;
`

//  ===== component =====
const Individual2048Ranking = () =>{

    return(
        <RelativeDiv width="49%" height="204px" border_radius="3px" background_color="blue2" justify_content="space-between">
            <Div flex_direction="column" align_items="flex-start" margin="0 0 0 20px">
                <H1 font_size="m" color="blue4">2048</H1>
                <P font_size="xxxl" font_weight="bold" color="grayscale7">{11}th</P>
                <H1 font_size="m" color="grayscale7">Your Score</H1>
                <P font_size="xxs" font_weight="light" color="grayscale7">{11111}</P>
            </Div>
            <AbsoluteImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/2048CropImg.png`}/>
        </RelativeDiv>
    )        
}

export default Individual2048Ranking