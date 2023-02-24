// ===== import base =====
import React from "react"
import styled, {css} from "styled-components"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P} from "../styles/P"
import { Img } from "../styles/Img"

// ===== import style func =====
import {color, fontWeight, fontSize} from "../styles/style"


const Container = styled(Div)`
    display:flex;
    height: 3px;
    width: 100%;
    position: relative;
    justify-content: flex-start;
`

const BaseBox = styled.div`
    height: 100%;
    position: absolute;
    transition: width 0.5s ease-in-out;
`

const Background = styled(BaseBox)`
    background: ${color("blue2")};
    width: 100%;
`

const Progress = styled(BaseBox)`
    background: ${color("blue3")};
    width: ${({step_state }) => (step_state-1)*33 }%;
`

const StepCounter = styled(Div)`
    width: 24px;
    height: 24px;
    font-size: 13px;
    background-color: ${color("blue2")};
    border-radius:50%;
    color: ${color("grayscale1")};
    ${fontWeight("light")};
    ${ props => {
        const step = props.step
        const count = props.count
        if(count <= step){
            return css`
                background-color: ${color("blue3")};
                transition-delay: 0.5s;
                transition-property: background-color, width, height;
                transition: 1s;
            `
        }
    }}

    ${ props => {
        const step = props.step
        const count = props.count
        if(count === step){
            return css`
                width:28px;
                height:28px;
            `
        }
    }}
`
const StepCounterDiv = styled(Div)`
    position:absolute;
    z-index:3;
`

const ProgressBar = (props) =>{

    const stepState = props.step_state
    return (
        <Div height="50px" justify_content="center" width="100%">
            <Container>
                <StepCounterDiv width="100%" justify_content="space-between">
                    <StepCounter count={1} step={stepState}>1</StepCounter>
                    <StepCounter count={2} step={stepState}>2</StepCounter>
                    <StepCounter count={3} step={stepState}>3</StepCounter>
                    <StepCounter count={4} step={stepState}>4</StepCounter>
                </StepCounterDiv>
                <Background />
                <Progress step_state = {stepState}/>
            </Container>
        </Div>
    );
}

export default ProgressBar
