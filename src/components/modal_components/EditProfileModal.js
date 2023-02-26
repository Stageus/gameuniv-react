// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====
import UploadBox from "../UploadBox"

// ===== import recoil =====
import { whichPageState } from "../../recoil/PageState"

// ===== import style =====
import { Img, ImgBtn } from "../../styles/Img"
import { Div } from "../../styles/Div"
import { H1 } from "../../styles/H1"
import { Button } from "../../styles/Button"
// ===== import style func =====
import { color } from "../../styles/style"


// ===== style =====

//  ===== component =====

const EditProfileModal = () =>{
    return(
        <Div width="357px" height="347px">
            <Div width="90%" height="100%"
            justify_content="space-evenly" align_items="flex-start" flex_direction="column">
                <H1 font_size="m" color="grayscale7">프로필 수정</H1>
                <UploadBox></UploadBox>
                <Div justify_content="center" width="100%">
                    <Button width="177px" height="38px" font_size="s">확인</Button>
                </Div>
            </Div>
        </Div>
    )
}

export default EditProfileModal