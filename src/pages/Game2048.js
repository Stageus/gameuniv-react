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

// ===== style =====
const BoxWrap = styled(Div)`
    position:relative;
    width: 60%;
    height: 0;
    padding-bottom:70%;
    
`

const GameBox = styled(Div)`
    position: absolute;
    width:100%;
    height:100%;
    max-width:579px;
    max-height:767px;
    top: 3%;
`

//  ===== component =====
const Game2048 = () =>{

    
    return(
        <BoxWrap>
            <GameBox background_color="blue5" justify_content="flex-start" border_radius="10px" flex_direction="column">
                {/* 게임 헤더 부분 */}
                <Div width="95%" justify_content="space-between" margin="20px 0px" height="135px">
                    <Div flex_direction="column" width="35%" height="100%" 
                    align_items="flex-start" justify_content="space-between">
                        <Div width="100%" background_color="blue3" border_radius="5px" height="71px" margin="0 0 10px 0">
                            <H1 color="grayscale1" font_size="xl" font_weight="regular" >2048</H1>
                        </Div>
                        <Button font_size="xs" width="70%" height="38px">다시하기</Button>
                    </Div>
                    <Div width="45%" background_color="blue3" height="100%" border_radius="5px">
                        랭킹 판
                    </Div>
                </Div>
                {/* 게임 플레이 구현 부분 */}
                <Div width="95%" height="80%" margin="0 0 20px 0" background_color="blue2" border_radius="5px">
                        sdsd
                </Div>

            </GameBox>
        </BoxWrap>
    )
}
export default Game2048