// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled, {css, ThemeProvider} from "styled-components"

// ===== import recoil =====
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { isModalOpenState, whichModalState } from "../../../../recoil/ModalState";

import { basicTheme, pastelTheme, doodleTheme, jellyTheme, retroTheme, legoTheme } from "../../styles/theme";

// ===== import components =====
import GameHeader from "../GameHeader/GameHeader";
import BoardContainer from "../Board/BoardContainer";
import RetryGameModal from "../../../modal_components/RetryGameModal";
import Modal from "../../../Modal"
import BtnAnimation from "../../../BtnAnimation"
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
import { useLocation, useNavigate } from "react-router";
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
    background: ${props=> props.theme.totalBoxColor};

    ${props=> props.isMobile && css`
        width: 320px;
        height:500px;
    `}

    ${props => props.theme === doodleTheme && css`
        border: 5px solid black;
    `}

    ${props => props.theme === retroTheme && css`
        background-size: cover;
            ${props => props.isMobile && css`
                background-size: 320px 500px;
                background-repeat: no-repeat;
                `
            }
    `}

    ${props => props.theme === legoTheme && css`
    background-size: cover;
        ${props => props.isMobile && css`
            background-size: 320px 500px;
            background-repeat: no-repeat;
            `
        }
    `}
`

// ===== style =====
const BackDiv = styled(Div)`
    position:absolute;
    top: 90%;
    left:2%;

    ${props => props.isMobile &&css`
        position: relative;
        top: 90%;
        left: -40%;
    `}
`


const GameContext = React.createContext()

const getGameStatus = (tiles) =>{
    if( isGameOver(tiles)){
        return "GAME_OVER"
    }

    // if(isGameWon(tiles)){
    //     return "WIN"
    // }

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
    const isModalOpen = useRecoilValue(isModalOpenState)

    const handleKeyPress = (e) =>{
        if(isModalOpen){
            e.preventDefault()
        }
        else{
            e.preventDefault()
            const effect = Effect
            let direction = KEYBOARD_ARROW_TO_DIRECTION_MAP[e.key]
            if(direction){
                dispatch({type : "move", payload: direction})
                effect.play()
            }
        }
    }
    // ===== event =====
    useEffect( ()=>{
        document.addEventListener("keydown", handleKeyPress)
        return () =>{
            document.removeEventListener("keydown", handleKeyPress)
        }
        
        
    }, [isModalOpen] )


    return(
        <GameContext.Provider value={ { gameState: state, dispatch } }>
            {props.children}
        </GameContext.Provider>
    )
}

const Game = () =>{
    const isMobile = useMobile()
    const whichModal = useRecoilValue(whichModalState)
    const setModalState = useSetRecoilState(whichModalState)
    const setModalOpen = useSetRecoilState(isModalOpenState)

    const navigate = useNavigate()
    const location = useLocation().pathname;
    const backBtnEvent = ()=>{
        
        if(location === "/2048"){
            setModalState("quitGameModal")
            setModalOpen(true)
        }
        else{
            navigate(-1)
        }
    }
    
    

    return(
        <GameProvider>
            <ThemeProvider theme = {legoTheme}>
                <Container isMobile={isMobile}>
                    <GameContainer isMobile={isMobile}>
                        <GameHeader/>
                        <BoardContainer/>
                    </GameContainer>
                </Container>
            </ThemeProvider>
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