// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState, useRecoilState} from "recoil"

// ===== import recoil =====
import { isModalOpenState, whichModalState } from "../recoil/ModalState"

// ===== import style =====
import {Img, ImgBtn} from "../styles/Img"
import {Div} from "../styles/Div"
import { P } from "../styles/P"

// ===== import style fun =====
import { color, fontWeight, fontSize } from "../styles/style"

// ===== import hooks =====
import { useSetModalState } from "../hooks/useSetModalState"

//  ===== component =====
import BtnAnimation from "./BtnAnimation"


const Header_style = styled.header`
    display:flex;
    justify-content: space-between;
    align-items:center;
    width: 100vw;
    position: fixed;
`

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Header = () =>{
    // ===== state =====
    const [isMouseHover, setMouseHover] = React.useState(false)

    return(
        <Header_style>
            <ImgBtn src={`${process.env.PUBLIC_URL}/img_srcs/icons/headerLogoIcon.png`} height="64px" padding="10px"
            onClick={()=> window.location.reload()}/>
            
            <Div height="84px" align_items="flex-end">
                <Div border={`3px solid ${color("grayscale6")}`} border_radius = "10px" height="40px" width="115px" justify_content = "space-around" margin="0 0 6px 0">
                    <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`} width="36px"/>
                    <P font_weight="regular" font_size="m">25</P>
                </Div>
                <BtnAnimation event={useSetModalState("settingModal")}
                before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/settingBeforeBtnImg.png`}
                after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/settingAfterBtnImg.png`}
                padding="0 20px 6px 10px"/>
            </Div>
        </Header_style>        
    )
}

export default Header