// ===== import base =====
import React from "react"
import styled from "styled-components"

// ===== import component =====

// ===== import recoil =====

// ===== import style =====
import { Img } from "../styles/Img"

// ===== import style fun =====
const BackIcon = styled(Img)`
    position: fixed;
    top: 90%;
    left: 2%;
    width: 64px;
`
const BgImg = styled(Img)`
    position: absolute;
    top: ${props => props.top || "100%"};
    right: ${props => props.right || "100%"};
    opacity:0.2;
    transform:rotate(${props => props.deg || "30deg"});
`


//  ===== component =====

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Bg = () =>{

    return(
        <React.Fragment>
            <BgImg src={`${process.env.PUBLIC_URL}/imgsrc/imgs/2048Img.png`} top="60%" right="30%" deg="-30deg"/>
            <BgImg src={`${process.env.PUBLIC_URL}/imgsrc/imgs/TetrisImg.png`} top="0%" right="0%"/>
        </React.Fragment>
                    
    )
}

export default Bg