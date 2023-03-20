// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled, {css} from "styled-components"

import { Div } from "../../../../styles/Div"
import { Img } from "../../../../styles/Img"


// ===== import components =====
const DisplayDiv =styled.div`
    height :60px;
`
const ArrowBtnImg =styled.img`
    transform:rotate(${props => props.deg || "0deg"});
`
// ===== import utils =====

const Controller =({props})=>{
    

    return(
    <DisplayDiv>
        <Div>
            <Div flex_direction="column">
                <Div  width="180px" justify_content="space-around" >
                    <ArrowBtnImg deg="90deg" src="img_srcs/game_img/tetris/jelly/asset/arrowBtnImg.png"/>
                    <ArrowBtnImg deg="270deg" src="img_srcs/game_img/tetris/jelly/asset/arrowBtnImg.png"/>
                </Div>
                <ArrowBtnImg src="img_srcs/game_img/tetris/jelly/asset/arrowBtnImg.png"/>
            </Div>
            <Img src="img_srcs/game_img/tetris/jelly/asset/rotateBtnImg.png"/>
        </Div>
    </DisplayDiv>
    )
}

export default Controller