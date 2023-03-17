// ===== import base =====
import React from "react"
import styled, { keyframes } from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P} from "../styles/P"
import { Img, ImgBtn } from "../styles/Img"

// ===== import style func =====
import {color, fontWeight, fontSize} from "../styles/style"

// ===== style =====
const fadeIn = keyframes`
    0% {
        opacity: 0.1;
    }
    100% {
        opacity: 1;
    }
`

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`

const AfterBtn = styled(ImgBtn)`
    position: relative;
    width: 40px;
    top : ${props=> props.top || "auto"};
    right : ${props=> props.right || "auto"};
    transform:rotate(${props => props.deg || "0deg"});
    animation: ${ props => props.isMouseHover && fadeIn} 0.5s;
    
`
const BeforeBtn = styled(ImgBtn)`
    position: relative;
    width: 40px;
    top : ${props=> props.top || "auto"};
    right : ${props=> props.right || "auto"};
    transform:rotate(${props => props.deg || "0deg"});
    animation: ${ props => props.isMouseHover ? fadeOut : fadeIn} 0.5s;
`


const BtnAnimation = (props) => {
    // ===== state =====
    const [isMouseHover, setMouseHover] = React.useState(false)

    // ===== props =====
    const padding = props.padding
    const before_src = props.before_src
    const after_src = props.after_src
    const deg = props.deg
    const event = props.event

    return(
        <Div padding={padding} onMouseOver={()=>setMouseHover(true)} onMouseOut={()=>setMouseHover(false)} onClick={event}>
            {
                isMouseHover
                ?
                <AfterBtn src={after_src} isMouseHover={isMouseHover} deg={deg}/>
                :
                <BeforeBtn src={before_src} isMouseHover={isMouseHover} deg={deg}/>
            }
        </Div>
    )
}

export default BtnAnimation