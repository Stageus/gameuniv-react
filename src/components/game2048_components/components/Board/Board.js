// ===== import base =====
import React from "react";
import styled, {keyframes} from "styled-components";

// ===== import component =====
import Tile from "../Tiles/Tile"
import TileContainer from "../Tiles/TileList";
import BoardContainer from "./BoardContainer";

import GameResult from "./GameResult"

// ===== style =====
const BoardContainerDiv = styled.div`
    position: relative;
    padding-top: 15px;
    padding-left: 15px;
    cursor: default;
    background: #bbada0;
    border-radius: 6px;
    width: 500px;
    height: 500px;
    box-sizing: border-box;
    touch-action: none;
`

const GridContainer = styled.div`
    position: absolute;
    z-index:2
`
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`

const Cell = styled.div`
    width: 106px;
    height: 106px;
    margin-right: 15px;
    float: left;
    border-radius: 3px;
    background: rgba(238, 228, 218, 0.35);
`

const BoardGrid = () =>{
    const grid = Array.from( Array(4).keys() ).map( (rowId) =>{
        const columns = Array.from(Array(4).keys()).map( (colId) =>(
            <Cell key={colId}></Cell>
        ))
        return(
            <Row key={rowId}>
                {columns}
            </Row>
        )
    })

    return <GridContainer>{grid}</GridContainer>
}

// props로 tiles 주기
const Board = (props) =>{
    // console.log(props.tiles)
    return(
        <BoardContainerDiv id="boardContainer">
            <GameResult tiles = {props.tiles}/>
            <BoardGrid/>
            <TileContainer tiles={props.tiles} />
        </BoardContainerDiv>
    )
}

export default Board