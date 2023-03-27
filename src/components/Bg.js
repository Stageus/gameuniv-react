// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import style =====
import { Img } from "../styles/Img"
import { Div } from "../styles/Div"

// ===== style =====
const ClaerImg = styled(Img)`
    position: absolute;
    top: ${props => props.top || "100%"};
    right: ${props => props.right || "100%"};
    opacity:0.2;
    transform:rotate(${props => props.deg || "30deg"});
    z-index:-1;
    width: 250px;
`
const SolidImg = styled(Img)`
    position: absolute;
    top: ${props => props.top || "100%"};
    right: ${props => props.right || "100%"};
    transform:rotate(${props => props.deg || "30deg"});
    z-index:-1;
`
const SolidImgDiv = styled(Div)`
    height: 100%;
    overflow: hidden;

`


//  ===== component =====

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Bg = (props) =>{
    // ===== props =====
    const location = props.location
    return(
        <React.Fragment>
        {
            location ==="/" 
            &&
            <Div>
                <ClaerImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/2048Img.png`} top="70%" right="30%" deg="-10deg"/>
                <ClaerImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/TetrisImg.png`} top="0%" right="0%"/>
            </Div>
        }
        {
            ( location ==="/idfind"  || location ==="/pwfind"  || location ==="/signup" )
            &&
            <React.Fragment>
                <ClaerImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/2048Img.png`} top="0%" right="50%" deg="-10deg"/>
                <ClaerImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/TetrisImg.png`} top="60%" right="75%"/>
            </React.Fragment>
        }
        {
            ( location ==="/item")
            &&
            <SolidImgDiv>
                <SolidImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/TetrisImg.png`} width="480px" top="10%" right="70%" deg="20deg"/>
            </SolidImgDiv>
            
        }
        {
            ( location ==="/achievement")
            &&
            <SolidImgDiv>
                <SolidImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/2048Img.png`} width="600px" top="25%" right="68%" deg="-10deg"/>
            </SolidImgDiv>
        } 
        </React.Fragment>
    )
}

export default Bg