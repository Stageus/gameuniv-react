// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled, {css} from "styled-components"

// ===== import components =====
import Cell from "./Cell"

// ===== style =====
const StageDiv=styled.div`
    display :grid;
    grid-template-rows: repeat(
        ${props=>props.height},
        30px
    );
    grid-template-columns: repeat(
        ${props=>props.width},
        30px
    );
    grid-gap :0.1px;

    width :360px;
    height : 610px;
    background-image: url("img_srcs/game_img/tetris/jelly/asset/smallBoardImg.png");
    background-size : 360px 610px;
    background-repeat : no-repeat;
    // background-position : center center;
    // padding :1px;

`
//  ===== component =====
const Stage =({stage})=>{
    return(
    <StageDiv width={stage[0].length} height={stage.length} > 
        {stage.map(row=>row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StageDiv>
    )
}

export default Stage