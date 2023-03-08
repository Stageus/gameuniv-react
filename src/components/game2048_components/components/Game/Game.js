// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled from "styled-components"

import Board from "../Board/Board"
import GameHeader from "../GameHeader/GameHeader";
import BoardContainer from "../Board/BoardContainer";
// ===== import utils =====
import {
    areEqual,
    createRandomTile,
    generateBoard,
    isGameOver,
    isGameWon,
    merge,
    MOVES_MAP,
} from "../../utils/boardUtils";

// ===== import components =====
// import GameHeader from "../GameHeader";
// import GameFooter from "../GameFooter";

// ===== import interfaces =====
// import {
//     GameContextActionType,
//     GameState,
//     IGameContext,
//     Direction,
//     Tile,
//     GameStatus
// } from "../interfaces";

// ===== import hooks =====
import useGameLocalStorage from "../../hooks/useLocalStorage";
// ===== import constants
import { KEYBOARD_ARROW_TO_DIRECTION_MAP } from "../../constants/constants"

// ===== style =====
const Container = styled.div`
    width: 500px;
    margin: 30px auto;
`

const GameContainer = styled.div`
    
`

const GameContext = React.createContext()

// 아직 잘 모르겠음
const getGameStatus = (tiles) =>{
    if( isGameOver(tiles)){
        return "GAME_OVER"
    }

    if(isGameWon(tiles)){
        return "WIN"
    }

    return "IN_PROGRESS"
}

const initState = (tilesCount = 2) =>{
    return{
        tiles: generateBoard(tilesCount),
        lastMove: null,
        status: "IN_PROGRESS",
    }
}

const gameReducer = (state, action) =>{
    switch (action.type){
        case "restart":{
            return initState()
        }
        case "continue": {
            return {...state, status: "PLAY_AFTER_WIN"}
        }
        case "move":{
            const move = MOVES_MAP[action.payload]
            let tiles = move(state.tiles)
            if( areEqual(state.tiles, tiles)){
                return state;
            }

            tiles = merge(tiles)
            tiles = [...tiles, createRandomTile(tiles) ]
            const status = getGameStatus(tiles)
            const shouldChangeStatus = 
                state.status !== "PLAY_AFTER_WIN" || status === "GAME_OVER"

            return{
                tiles,
                lastMove: action.payload,
                status: shouldChangeStatus ? status : state.status
            }
        }
        default:{
            throw new Error(`Unnabled action: ${action}`)
        }
    }
}

const GameProvider = (props) =>{
    const [state, dispatch] = useGameLocalStorage("game", initState(), gameReducer)
    useEffect( ()=>{
        const handleKeyPress = (e) =>{
            e.preventDefault()
            let direction = KEYBOARD_ARROW_TO_DIRECTION_MAP[e.key]
            console.log(direction)
            // if(e.key === "ArrowLeft") direction = "left"
            // else if( e.key === "ArrowUp") direction = "up"
            // else if( e.key === "ArrowRight") direction = "right"
            // else if( e.key === "ArrowDown") direction = "down"
            // console.log(state)
            if(direction){
                dispatch({type : "move", payload: direction})
            }
        }

        document.addEventListener("keydown", handleKeyPress)

        return () =>{
            document.removeEventListener("keydown", handleKeyPress)
        }
    }, [dispatch] )

    return(
        <GameContext.Provider value={ { gameState: state, dispatch } }>
            {props.children}
        </GameContext.Provider>
    )
}

const Game = () =>{
    // const [state, dispatch] = useGameLocalStorage("game", initState(), gameReducer)
    return(
        <GameProvider>
            <Container>
                <GameContainer>
                    <GameHeader/>
                    <BoardContainer/>
                </GameContainer>
            </Container>
        </GameProvider>
    )
}

const useGameContext = () =>{
    const context = useContext(GameContext)
    if(context === undefined){
        throw new Error("useGameContext must be used within a GameContextProvider")
    }
    return context
}

export { Game, useGameContext }