// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import hooks =====
import { useGameContext } from "../game2048_components/components/Game/Game"
import { GameProvider } from "../game2048_components/components/Game/Game"
// ===== import recoil =====
import { whichPageState } from "../../recoil/PageState"
import { isModalOpenState } from "../../recoil/ModalState"

// ===== import style =====
import { Img, ImgBtn } from "../../styles/Img"
import { Div } from "../../styles/Div"
import { P } from "../../styles/P"
import { Button } from "../../styles/Button"

// ===== import style func =====
import { color } from "../../styles/style"


// ===== style =====

//  ===== component =====

const RetryGameModal = (props) =>{
    // ===== recoil state ======
    const setModalOpen = useSetRecoilState(isModalOpenState)

    return(
        <Div width="400px" height="260px" flex_direction="column" justify_content="space-evenly">
            <Div flex_direction="column">
                <P font_size="m" margin="0 0 10px 0">정말 다시 하시겠습니까?</P>
                <P font_size="xxs">지금까지 진행한 게임내용은 저장되지 않습니다</P>
            </Div>
            <Button width="110px" height="37px" onClick={() => {
                props.onRestart()
                setModalOpen(false)
            }}>네</Button>
            
        </Div>
    )
}

export default RetryGameModal