// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled, {css} from "styled-components"


// ===== import components =====
import GameHeader from "../GameHeader/GameHeader";
import BoardContainer from "../Board/BoardContainer";
import RetryGameModal from "../../../modal_components/RetryGameModal";
import Modal from "../../../Modal"
import { Effect } from "../../utils/effect";
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

// ===== import hooks =====
import useGameLocalStorage from "../../hooks/useLocalStorage";
import { useMobile } from "../../../../hooks/useMediaComponent";

// ===== import constants
import { KEYBOARD_ARROW_TO_DIRECTION_MAP } from "../../constants/constants"

// ===== import style =====
import { Div } from "../../../../styles/Div";

// ===== import style func =====
import { color } from "../../../../styles/style";


// ===== style =====
const Container = styled.div`
    width: ${props=> props.isMobile? "300px":"500px"};
    margin: 30px auto;
`

const GameContainer = styled(Div)`
    flex-direction:column;
    width: 540px;
    height: 720px;
    border-radius: 10px;
    background-color: ${color("blue5")};

    ${props=> props.isMobile && css`
        width: 320px;
        height:500px;
    `}
`

const GameContext = React.createContext()

const getGameStatus = (tiles) =>{
    if( isGameOver(tiles)){
        return "GAME_OVER"
    }

    if(isGameWon(tiles)){
        return "WIN"
    }

    return "IN_PROGRESS"
}

export const initState = (tilesCount = 2) =>{
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
            const effect = Effect
            let direction = KEYBOARD_ARROW_TO_DIRECTION_MAP[e.key]
            if(direction){
                dispatch({type : "move", payload: direction})
                effect.play()
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
    const isMobile = useMobile()
    // const [state, dispatch] = useGameLocalStorage("game", initState(), gameReducer)
    return(
        <GameProvider>
            <Container isMobile={isMobile}>
                <GameContainer isMobile={isMobile}>
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

export { Game, useGameContext}