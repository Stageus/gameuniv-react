// ===== import base =====
import React, {useEffect} from "react";
import styled, {keyframes} from "styled-components";

import useGameLocalStorage from "../../hooks/useLocalStorage"
import { getMaxId } from "../../utils/boardUtils"
import { useGameContext } from "../Game/Game"

// ===== import component =====
import ScoreBox from "../ScoreBox/ScoreBox"

// ===== style =====


const moveUp = keyframes`
    0%  {
        top: 25px;
        opacity: 1;
    }
    100% {
        top: -50px;
        opacity: 0;
    }
`

const ScoresContainerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 100%;
`

const AddScore = styled.div`
    position: absolute;
    right: 30px;
    font-size: 25px;
    line-height: 25px;
    font-weight: bold;
    color: rgba(119, 110, 101, 0.9);
    z-index: 100;
    animation: ${moveUp} 600ms ease-in;
    animation-fill-mode: both;
`


const ScoresContainer = () =>{
    const { gameState } = useGameContext()

    const [state, dispatch] = useGameLocalStorage("scores", initState(), stateReducer)

    useEffect( ()=> {
        dispatch( {type: "change", payload: gameState.tiles})
    }, [gameState.tiles, dispatch])

    useEffect( () =>{
        if(state.newPoints > 0){
            const oldAddScore = document.getElementById("additionScore")
            oldAddScore.innerText = `+${state.newPoints}`
            const newAddScore = oldAddScore.cloneNode(true)
            oldAddScore.parentNode.replaceChild( newAddScore, oldAddScore)
        }
    }, [state])

    return(
        <ScoresContainerDiv>
            <div style = {{position: "relative"}}>
                <ScoreBox title="SCORE" score={state.score}/>
                <AddScore id="additionScore"></AddScore>
            </div>
            <ScoreBox title="BEST" score={state.bestScore} ></ScoreBox>
        </ScoresContainerDiv>
    )
}

const initState = (tiles = []) =>{
    return{
        score:0,
        newPoints: 0,
        bestScore: 0,
        tiles,
    }
}

const containsTile = (tiles, tile) =>{
    return tiles.some( (t) => t.id === tile.id)
}

const stateReducer = (state, action) =>{
    switch(action.type){
        case "change":{
            const tiles = action.payload
            // 새로고침
            if(
                state.tiles.length === tiles.length &&
                state.tiles.every( (t) => containsTile(tiles, t))
            ){
                return state
            }
            // 재 시작
            if(
                tiles.length ===2 &&
                [1, 2].every( (id) => tiles.find( (tile) => tile.id === id)) &&
                !state.tiles.every( (t) => containsTile(tiles, t))
            ){
                return {...initState(tiles), bestScore: state.bestScore}
            }
            // 새 타일 추가
            if(
                state.tiles.every( (t) => containsTile(tiles, t)) &&
                tiles.length === state.tiles.length + 1
            ){
                return {...state, tiles: tiles, newPoints: 0}
            }

            // merge
            const lastGeneratedTileId = getMaxId(tiles)
            const newPoints = tiles.reduce( (acc, curr) => {
                const add = 
                    curr.id === lastGeneratedTileId || containsTile(state.tiles, curr)
                    ?
                    0
                    :
                    curr.value
                return acc + add
            }, 0)

            const score = state.score + newPoints
            const bestScore = Math.max(score, state.bestScore)

            return { tiles, newPoints, score, bestScore}
        }
        default:{
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

export default ScoresContainer