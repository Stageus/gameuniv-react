// ===== import base =====
import React from "react"
import styled from "styled-components"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P} from "../styles/P"
import { Img } from "../styles/Img"

// ===== import style func =====
import {color, fontWeight, fontSize} from "../styles/style"


const Stepper = styled(Div)`
    position: relative;
    flex: 1;

    &::before{
        position: absolute;
        content: "";
        border-bottom: 2px solid #ccc;
        width: 100%;
        top: 20px;
        left: -50%;
        z-index: 2;
    }

    &::after{
        position: absolute;
        content: "";
        border-bottom: 2px solid #ccc;
        width: 100%;
        top: 20px;
        left: 50%;
        z-index: 2;
    }
`
const Li = styled.li`
    
`

const ProgressBar = () =>{

    // ===== state =====

    // ===== func =====
    return(
        <Div padding="10px 0 5px 0" 
        justify_content="space-between">
            <Stepper>
                <Div>1</Div>
            </Stepper>
            <Stepper>
                <Div>2</Div>
            </Stepper>
            <Stepper>
                <Div>3</Div>
            </Stepper>
            <Stepper>
                <Div>4</Div>
            </Stepper>
        </Div>
    )
}

export default ProgressBar