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

const DeleteAcoountModal = () =>{
    return(
        <Div width="330px" height="287px" flex_direction="column" justify_content="space-evenly">
            <Div flex_direction="column" align_items="flex-start">
                <H1 font_size="m" color="grayscale7" font_weight="regular" margin="0 0 10px 0">계정 삭제</H1>
                <P>정말로 계정을 삭제하시겠습니까?</P>
                <P>계정이 삭제되면 다시 복구할 수 없습니다.</P>
            </Div>
            <Button width="107px" height="43px" font_size="xs" font_weight="light" btn_type="red">계정삭제</Button>
        </Div>
    )
}

export default DeleteAcoountModal