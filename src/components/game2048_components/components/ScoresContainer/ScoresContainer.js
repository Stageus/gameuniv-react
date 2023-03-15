// ===== import base =====
import React, {useEffect} from "react";
import styled, {keyframes, css} from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";

import useGameLocalStorage from "../../hooks/useLocalStorage"
import { getMaxId } from "../../utils/boardUtils"
import { useGameContext } from "../Game/Game"

// ===== import component =====
import ScoreBox from "../ScoreBox/ScoreBox"

// ===== import hooks =====
import { useMobile } from "../../../../hooks/useMediaComponent";

// ===== import recoil =====
import { scoreState } from "../../recoil/ScoreState";
import { domainAddressState } from "../../../../recoil/DomainState";

// ===== import style =====
import { Div } from "../../../../styles/Div";
// ===== import style func =====
import { color, fontSize, fontWeight } from "../../../../styles/style";
import { doodleTheme } from "../../styles/theme";


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
    background-color: ${props => props.theme.scoreBoxColor};
    border-radius: 5px;
    border: 2px solid white;

    ${props => props.isMobile && css`
        width: 150px;
        height: 120px;
    `}

    ${props => props.theme === doodleTheme && css`
        border: 3px solid black;
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
    color: ${props=> props.theme.fontColor};
`

const MyScore = styled(Div)`
    position: relative;
    right:0;
    width: 230px;
    height: 49px;
    background-color: ${props=> props.theme.scoreColor};
    border-radius: 10px;
    border: 2px solid ${props=>props.theme.borderColor};
    color: ${props=> props.theme.fontColor};
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
    background-color: ${props => props.theme.rankColor};
    font-size:${fontSize("s")};
    width:34px;
    height:34px;
    border-radius:50%;
    ${fontWeight("bold")};
    color: ${props => props.theme.rankTextColor};
    margin-right: 20px;

    ${props => props.isMobile && css`
        position:relative;
        right: 10px;
        width:17px;
        height:17px;
        font-size: 10px;
        margin-right: 5px;
    `}

    ${props => props.theme === doodleTheme && css`
        border: 2px solid black;
        -webkit-text-stroke: 1px black;
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
    position:relative;
    width: 20px;
    height: 20px;
    font-size:${fontSize("xxs")};
    margin-right: 0px;
    
    ${props => props.isMobile && css`
        
        right: 3px;
        width: 15px;
        height:15px;
        font-size: 5px;
    `}
`

const OtherId = styled(UserId)`
    font-size: ${props => props.isMobile? "5px": fontSize("xxxs")};
    position:relative;
    left: 5px;
`

const OtherUniv = styled(UserUniv)`
    font-size: ${props => props.isMobile ? "5px": fontSize("xxxs")};
    position:relative;
    left: 5px;
`
const ScoresContainer = () =>{
    // ===== state =====
    const [state, dispatch] = useGameLocalStorage("scores", initState(), stateReducer)
    const [scoreData, setScoreData] = React.useState({
        pre_id: "pre_id",
        pre_university_name: "pre_univ_name",
        pre_max_score: "10",

        next_id: "next_id",
        next_university_name: "next_univ_name",
        next_max_scroe: "30",

        rank: -1
    })
    
    // ===== recoil =====
    const setScore = useSetRecoilState(scoreState)
    const score = useRecoilValue(scoreState)
    const address = useRecoilValue(domainAddressState)

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

            setScore(state.score)
        }
    }, [state])

    // 랭킹 추적
    const showRank2048 = async()=>{
        const response = await fetch(`${address}/2048/score/rank?score=${score}`,{
            credentials: "include"
        })

        const result = await response.json()

        if(result.message){
            alert(result.message)
        }
        else{
            setScoreData(result.data)
        }
    }

    React.useEffect( () =>{
        showRank2048()
    }, [score > scoreData.next_max_scroe])


    return(
        <ScoresContainerDiv isMobile={isMobile}>
            <OtherScore isMobile={isMobile}>
                {
                scoreData.rank === -1 || 
                <OtherRank isMobile={isMobile}>{scoreData.rank-1}</OtherRank>
                }
                
                <Div flex_direction="column">
                    <OtherId isMobile={isMobile}>{scoreData.next_id}</OtherId>
                    <OtherUniv isMobile={isMobile}>{scoreData.next_university_name}</OtherUniv>
                </Div>
                <ScoreBox score={scoreData.next_max_scroe} />
            </OtherScore>
            <MyScore isMobile={isMobile}>
                {
                    scoreData.rank === -1 ||
                    <MyRank isMobile={isMobile}>{scoreData.rank}</MyRank>
                }
                <Div flex_direction="column">
                    <UserId isMobile={isMobile}>tmdgns97</UserId>
                    <UserUniv isMobile={isMobile}>인하대학교</UserUniv>
                </Div>
                <ScoreBox score={state.score}/>
                <AddScore isMobile={isMobile} id="additionScore"></AddScore>
            </MyScore>
            <OtherScore isMobile={isMobile}>
                {
                    scoreData.rank === -1 ||
                    <OtherRank isMobile={isMobile}>{scoreData.rank+1}</OtherRank>
                }
                <Div flex_direction="column">
                    <OtherId isMobile={isMobile}>{scoreData.pre_id}</OtherId>
                    <OtherUniv isMobile={isMobile}>{scoreData.pre_university_name}</OtherUniv>
                </Div>
                <ScoreBox score={scoreData.pre_max_score}/>
            </OtherScore>
            {/* <ScoreBox title="BEST" score={state.bestScore} ></ScoreBox> */}
        </ScoresContainerDiv>
    )
}

const initState = (tiles = []) =>{
    return{
        score:0,
        newPoints: 0,
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