// ===== import base =====
import React from "react"
import styled, {keyframes, css} from "styled-components"

import { useRecoilValue, useSetRecoilState } from "recoil"

// ===== import hooks =====
import { whichModalState, isModalOpenState } from "../../../../recoil/ModalState"
import useGameLocalStorage from "../../hooks/useLocalStorage"
import { useGameContext } from "../Game/Game"
import { useSetModalState } from "../../../../hooks/useSetModalState"
import { useMobile } from "../../../../hooks/useMediaComponent"

// ===== import recoil =====
import { scoreState } from "../../recoil/ScoreState"

// ===== import components =====
import Modal from "../../../Modal"
import GameOverModal from "../../../modal_components/GameOverModal"

// ===== import style =====
import { Button } from "../../../../styles/Button"
import RetryGameModal from "../../../modal_components/RetryGameModal"

// ===== style =====
const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`
const Overlay = styled.div`
    position:fixed;
    z-index:99;
    background-color: rgba(0,0,0,0.3);
    top:0;
    right:0;
    bottom: 0;
    left:0;
    animation: ${fadeIn} 1200ms ease 500ms;
    animation-fill-mode: both;

`

const GameResult = styled.div`
    display: flex;
    position: absolute;
    width:fit-content;
    height:fit-content;
    top: -20%;
    right: 0;
    // bottom: 0;
    // left: 0;

    ${props => props.isMobile && css`
        top: -100px;
        left: -75px;
    `}

    z-index: 100;
    align-items: center;
    justify-content: center;
    text-align: center;

    ${props => props.whichModal === "retryGameModal" || css`
        animation: ${fadeIn} 1200ms ease 500ms;
        animation-fill-mode: both;
    `}
    

    background: white;
`

const Result = (props) =>{
    // ===== state =====
    const onRestart = props.onRestart
    const isMobile = useMobile()
    const score2048 = useRecoilValue(scoreState)
    
    return(

        <GameResult isMobile={isMobile} whichModal={props.whichModal}>
            {
                props.whichModal === "retryGameModal" || props.whichModal === "quitGameModal"
                ?
                <Modal onRestart={onRestart}/>
                :
                <GameOverModal onRestart={onRestart} score2048={score2048}/>
            }
        </GameResult>
    )
}

const GameResultContainer = (props) =>{
    const { gameState, dispatch } = useGameContext()
    const tiles = props.tiles

    const whichModal = useRecoilValue(whichModalState)
    const isModalOpen = useRecoilValue(isModalOpenState)
    const setModalOpen = useSetRecoilState(isModalOpenState)

    const {status} = gameState

    const handleRestart = () => {
        dispatch( {type: "restart"})
    }
    
    return(
        <React.Fragment>
            
            {status === "IN_PROGRESS" 
            ?
            ((whichModal === "retryGameModal" || whichModal === "quitGameModal") && isModalOpen) &&
            <React.Fragment>
                <Result whichModal={whichModal} onRestart = {handleRestart}/>            
            </React.Fragment>
            :
            (
                <React.Fragment>
                    <Result
                        onRestart = {handleRestart}
                        status = {status}
                    />
                    <Overlay></Overlay>
                </React.Fragment>
            )}
        </React.Fragment>

        
    )
    
}
export default GameResultContainer