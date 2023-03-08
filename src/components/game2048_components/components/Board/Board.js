// ===== import base =====
import React from "react";
import styled, {keyframes, css} from "styled-components";

// ===== import component =====
import Tile from "../Tiles/Tile"
import TileContainer from "../Tiles/TileList";
import BoardContainer from "./BoardContainer";

import GameResult from "./GameResult"

import { useMobile } from "../../../../hooks/useMediaComponent"

// ===== import style func =====
import { color } from "../../../../styles/style";
// ===== style =====
const BoardContainerDiv = styled.div`
    position: relative;
    padding-top: 15px;
    padding-left: 15px;
    cursor: default;
    background: ${color("blue2")};
    border-radius: 6px;
    width: 500px;
    height: 500px;
    box-sizing: border-box;
    touch-action: none;
    ${props => props.isMobile && 
        css`
            width:300px;
            height:300px;
            padding-top:9px;
            padding-left:9px;
    `}
`

const GridContainer = styled.div`
    position: absolute;
    z-index:2
`
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${props => props.isMobile ? "9px": "15px"};
`

const Cell = styled.div`
    width: 106px;
    height: 106px;
    margin-right: 15px;
    float: left;
    border-radius: 10px;
    background: ${color("blue5")};
    opacity: 0.5;

    ${props => props.isMobile && 
        css`
            width:64px;
            height:64px;
            margin-right: 9px;
    `}
`

const BoardGrid = () =>{
    const isMobile = useMobile()

    const grid = Array.from( Array(4).keys() ).map( (rowId) =>{
        const columns = Array.from(Array(4).keys()).map( (colId) =>(
            <Cell key={colId} isMobile={isMobile} ></Cell>
        ))
        return(
            <Row key={rowId} isMobile={isMobile} >
                {columns}
            </Row>
        )
    })

    return <GridContainer isMobile={isMobile} >{grid}</GridContainer>
}

// props로 tiles 주기
const Board = (props) =>{
    // console.log(props.tiles)
    const isMobile = useMobile()

    return(
        <BoardContainerDiv id="boardContainer" isMobile={isMobile}>
            <GameResult tiles = {props.tiles}/>
            <BoardGrid/>
            <TileContainer tiles={props.tiles} />
        </BoardContainerDiv>
    )
}

export default Board