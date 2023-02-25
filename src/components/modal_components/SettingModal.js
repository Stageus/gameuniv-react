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

// ===== import style func =====
import { color } from "../../styles/style"


// ===== style =====

//  ===== component =====

const SettingModal = () =>{
    return(
        <Div>환경설정</Div>
    )
}

export default SettingModal