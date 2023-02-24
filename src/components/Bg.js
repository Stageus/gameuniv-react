// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import style =====
import { Img } from "../styles/Img"

// ===== style =====
const BgImg = styled(Img)`
    position: absolute;
    top: ${props => props.top || "100%"};
    right: ${props => props.right || "100%"};
    opacity:0.2;
    transform:rotate(${props => props.deg || "30deg"});
    z-index:-1;
`


//  ===== component =====

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Bg = () =>{
    const whichPage = useRecoilValue(whichPageState)
    return(
        <React.Fragment>
        {
            whichPage ==="logIn" 
            &&
            <React.Fragment>
                <BgImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/2048Img.png`} top="60%" right="50%" deg="-30deg"/>
                <BgImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/TetrisImg.png`} top="0%" right="0%"/>
            </React.Fragment>
        }
        {
            ( whichPage === "idFind" || whichPage === "pwFind" || whichPage==="signUp")
            &&
            <React.Fragment>
                <BgImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/2048Img.png`} top="0%" right="50%" deg="-30deg"/>
                <BgImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/TetrisImg.png`} top="60%" right="75%"/>
            </React.Fragment>
        }
            
        </React.Fragment>
    )
}

export default Bg