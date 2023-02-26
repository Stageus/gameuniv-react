// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import modal component =====
import SettingModal from "./modal_components/SettingModal"

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import style =====
import { Img, ImgBtn } from "../styles/Img"
import { Div } from "../styles/Div"

// ===== import style func =====
import { color } from "../styles/style"


// ===== style =====
const Overlay = styled(Div)`
    position:fixed;
    z-index:99;
    background-color: rgba(0,0,0,0.3);
    top:0;
    right:0;
    bottom: 0;
    left:0;

`

const CancelBtn = styled(ImgBtn)`
    width: 23px;
    margin: 5px;
    padding: 5px;
    border-radius: 50%;

    &:hover{
        background-color: ${color("blue5")};
        transition: 0.5s;
    }
`

//  ===== component =====

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Modal = () =>{
    return(
        <Overlay>
            <Div width="400px" height="260px" background_color="grayscale1" 
            flex_direction="column" justify_content="flex-start" border_radius="3px">
                
                <Div width="100%" justify_content="flex-end">
                    <CancelBtn src= {`${process.env.PUBLIC_URL}/img_srcs/icons/crossGrayIcon.png`}/>
                </Div>
                <main>
                    {/* 여기에 조건에 따라 모달 넣으면 될듯 합니다 */}
                    <SettingModal></SettingModal>
                </main>

            </Div>
        </Overlay>
    )
}

export default Modal