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
import { P } from "../../styles/P"
import { Button } from "../../styles/Button"

// ===== import style func =====
import { color } from "../../styles/style"


// ===== style =====

//  ===== component =====

const QuitGameModal = () =>{
    return(
        <Div width="400px" height="260px" flex_direction="column" justify_content="space-evenly">
            <P font_size="m" margin="0 0 10px 0">정말 나가시겠습니까?</P>
            <Button width="110px" height="37px">네</Button>
        </Div>
    )
}

export default QuitGameModal