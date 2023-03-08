// ===== import base =====
import React, {useEffect} from "react";
import styled, {keyframes, css} from "styled-components";

import useGameLocalStorage from "../../hooks/useLocalStorage"
import { getMaxId } from "../../utils/boardUtils"
import { useGameContext } from "../Game/Game"

// ===== import component =====
import ScoreBox from "../ScoreBox/ScoreBox"

// ===== import hooks =====
import { useMobile } from "../../../../hooks/useMediaComponent";
// ===== import style =====
import { Div } from "../../../../styles/Div";
// ===== import style func =====
import { color, fontSize, fontWeight } from "../../../../styles/style";

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
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 248px;
    height: 135px;
    background-color: ${color("blue3")};
    border-radius: 5px;
    border: 2px solid white;

    ${props => props.isMobile && css`
        width: 150px;
        height: 120px;
    `}
`

const AddScore = styled.div`
    position: absolute;
    right: 0;
    font-size: 15px;
    line-height: 25px;
    font-weight: bold;
    z-index: 100;
    animation: ${moveUp} 600ms ease-in;
    animation-fill-mode: both;
`

const MyScore = styled(Div)`
    position: relative;
    right:0;
    width: 230px;
    height: 49px;
    background-color: ${color("grayscale1")};
    border-radius: 10px;
    border: 2px solid ${color("green")};

    ${props => props.isMobile && css`
        width: 90%;
        height: 27px;
    `}
`

const UserId = styled.div`
    font-size: ${fontSize("xs")};
    ${fontWeight("bold")};

    ${props => props.isMobile && css`
        font-size: 10px;
    `}
`
const UserUniv = styled.div`
    font-size: ${props => props.isMobile ? "3px": fontSize("xxs")};
`

const MyRank = styled(Div)`
    background-color: ${color("blue3")};
    font-size:${fontSize("s")};
    width:34px;
    height:34px;
    border-radius:50%;
    ${fontWeight("bold")};
    color: ${color("grayscale1")};
    margin-right: 20px;

    ${props => props.isMobile && css`
        position:relative;
        right: 10px;
        width:17px;
        height:17px;
        font-size: 10px;
        margin-right: 5px;
    `}
`

const OtherScore = styled(MyScore)`
    width:140px;
    height: 29px;
    border: none;

    ${props => props.isMobile && css`
        position:relative;
        width:80%;
        height:25px;
    `}
`

const OtherRank = styled(MyRank)`
    width: 20px;
    height: 20px;
    font-size:${fontSize("xxs")};
    margin-right: 0px;

    ${props => props.isMobile && css`
        position:relative;
        right: 3px;
        width: 15px;
        height:15px;
        font-size: 5px;
    `}
`

const OtherId = styled(UserId)`
    font-size: ${props => props.isMobile? "5px": fontSize("xxxs")};
`

const OtherUniv = styled(UserUniv)`
    font-size: ${props => props.isMobile ? "5px": fontSize("xxxs")};
`
const ScoresContainer = () =>{
    // ===== state =====
    const [state, dispatch] = useGameLocalStorage("scores", initState(), stateReducer)

    // ===== hooks =====
    const { gameState } = useGameContext()
    const isMobile = useMobile()

    // ===== event =====
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
        <ScoresContainerDiv isMobile={isMobile}>
            <OtherScore isMobile={isMobile}>
                <OtherRank isMobile={isMobile}>33</OtherRank>
                <Div flex_direction="column">
                    <OtherId isMobile={isMobile}>safsadf3e2</OtherId>
                    <OtherUniv isMobile={isMobile}>아주대학교</OtherUniv>
                </Div>
                <ScoreBox/>
            </OtherScore>
            <MyScore isMobile={isMobile}>
                <MyRank isMobile={isMobile}>34</MyRank>
                <Div flex_direction="column">
                    <UserId isMobile={isMobile}>tmdgns97</UserId>
                    <UserUniv isMobile={isMobile}>인하대학교</UserUniv>
                </Div>
                <ScoreBox score={state.score}/>
                <AddScore isMobile={isMobile} id="additionScore"></AddScore>
            </MyScore>
            <OtherScore isMobile={isMobile}>
                <OtherRank isMobile={isMobile}>35</OtherRank>
                <Div flex_direction="column">
                    <OtherId isMobile={isMobile}>safsadf3e2</OtherId>
                    <OtherUniv isMobile={isMobile}>아주대학교</OtherUniv>
                </Div>
                <ScoreBox/>
            </OtherScore>
            {/* <ScoreBox title="BEST" score={state.bestScore} ></ScoreBox> */}
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