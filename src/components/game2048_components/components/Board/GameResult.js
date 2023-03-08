// ===== import base =====
import React from "react"
import styled, {keyframes} from "styled-components"
import { useGameContext } from "../Game/Game"

// ===== style =====
const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`

const GameResult = styled.div`
    display: flex;
    position: absolute;
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

    background: ${props => props.containerClass === "gameResultWin" ? 
    "rgba(237,194,46,0.5)" : "rgba(238,228,218,0.75)"};
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
            <p>{message}</p>
            <div>
                {isWin &&(
                    <button onClick = {() => onContinue() }>continue</button>
                )}
                <button onClick={()=> onRestart() }>{buttonText}</button>
            </div>
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
                <Result
                    isWin = {status === "WIN"}
                    // playAfterWin = {playAfterWin}
                    onRestart = {handleRestart}
                    onContinue = {handleContinue}
                    status = {status}
                />
            )}
        </React.Fragment>
    )
    
}
export default GameResultContainer