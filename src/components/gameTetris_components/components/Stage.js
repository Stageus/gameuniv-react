// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled, {css} from "styled-components"


// ===== import components =====
import Cell from "./Cell"

// ===== import utils =====


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
    background: #FFFFFF;
    border: 9px solid #FFE973;
    border-radius : 10px;
    padding :1px;
    box-shadow: inset 0px 4px 17px rgba(0, 0, 0, 0.1);

`


const Stage =({stage})=>{
    return(
    <StageDiv width={stage[0].length} height={stage.length} > 
        {stage.map(row=>row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StageDiv>
    )
}

export default Stage