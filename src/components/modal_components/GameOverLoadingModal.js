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

const GameOverLoadingModal = () =>{
    return(
        <Div width="330px" height="287px" flex_direction="column" justify_content="flex-start">
                <H1 font_size="m" color="grayscale7" font_weight="regular" margin="15px 0">게임결과를 계산중...</H1>
        </Div>
    )
}

export default GameOverLoadingModal