// ===== import base =====
import React from "react"
import styled, {keyframes} from "styled-components"

import { useSetRecoilState } from "recoil"

// ===== import hooks =====
import { whichModalState, isModalOpenState } from "../../../../recoil/ModalState"

import { useGameContext } from "../Game/Game"
import { useSetModalState } from "../../../../hooks/useSetModalState"

// ===== import components =====
import Modal from "../../../Modal"
import GameOverModal from "../../../modal_components/GameOverModal"

// ===== import style =====
import { Button } from "../../../../styles/Button"

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
    width:560px;
    height:500px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    animation: ${fadeIn} 1200ms ease 500ms;
    animation-fill-mode: both;

    background: white;
`

const DATA = {
    WIN: {
        message: "Congratulations! You Win!",
        buttonText: "Play again",
        containerClass: "gameResultWin",
    },
    GAME_OVER: {
        message: "Game Over!",
        buttonText: "Try again",
        containerClass: "gameResultLose",
    },
}

const Result = (props) =>{
    const { isWin, onContinue, onRestart, playAfterWin} = props
    const {message, buttonText, containerClass} = 
        isWin || playAfterWin ? DATA.WIN : DATA.GAME_OVER
    return(
        <GameResult containerClass = {containerClass}>
            <GameOverModal onRestart={onRestart}/>
            {/* <p>{message}</p>
            <div>
                
                {isWin &&(
                    <button onClick = {() => onContinue() }>continue</button>
                )}
                <button onClick={()=> onRestart() }>{buttonText}</button>
            </div> */}
        </GameResult>
    )
}

const GameResultContainer = (props) =>{
    const { gameState, dispatch } = useGameContext()
    const tiles = props.tiles

    const {status} = gameState

    const handleContinue = () =>{
        dispatch( {type: "continue"})
    }

    const handleRestart = () => {
        dispatch( {type: "restart"})
    }

    // const playAfterWin = tiles.some( (x) => x.value === 2048)

    return(
        <React.Fragment>
            
            {status !== "IN_PROGRESS" && status !== "PLAY_AFTER_WIN" &&(
                <React.Fragment>
                    <Result
                        isWin = {status === "WIN"}
                        // playAfterWin = {playAfterWin}
                        onRestart = {handleRestart}
                        onContinue = {handleContinue}
                        status = {status}
                    />
                    <Overlay></Overlay>
                </React.Fragment>
            )}
        </React.Fragment>

        // <React.Fragment>
        // {status !== "IN_PROGRESS" && status !== "PLAY_AFTER_WIN" &&(
        //     <Button
        //         isWin = {status === "WIN"}
        //         // playAfterWin = {playAfterWin}
        //         onRestart = {handleRestart}
        //         onContinue = {handleContinue}
        //         status = {status}
        //     >다시하기</Button>
        // )}
        // </React.Fragment>

        
    )
    
}
export default GameResultContainer