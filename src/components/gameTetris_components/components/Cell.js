// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled, {css} from "styled-components"
import { useRecoilState, useRecoilValue } from "recoil"

import {skinTetrisState} from "../../../recoil/DataState"

// ===== import style =====
import { Div } from "../../../styles/Div"

// ===== import utils =====
import { TETROMINOS } from "../tetrominos"

// ===== style =====
const CellDiv=styled.div`
    width :30px;
    height :30px;
    background-image: url(${props=>props.img});
    background-repeat : no-repeat;
    background-position : center;
    background-size : 30px;
`
//  ===== component =====
const Cell =({type})=>{

    const skinTetris = useRecoilValue(skinTetrisState)

    let skin = TETROMINOS[type].basicCellImg

    if(skinTetris===-1){
        skin = TETROMINOS[type].basicCellImg
    }if(skinTetris===1){
        skin = TETROMINOS[type].pastelCellImg
    }if(skinTetris===3){
        skin = TETROMINOS[type].doodleCellImg
    }if(skinTetris===5){
        skin = TETROMINOS[type].jellyCellImg
    }if(skinTetris===7){
        skin = TETROMINOS[type].retroCellImg
    }if(skinTetris===9){
        skin = TETROMINOS[type].legoCellImg
    }

    return( 
    <CellDiv type={type} img={skin}/>
    )
}

export default React.memo(Cell)