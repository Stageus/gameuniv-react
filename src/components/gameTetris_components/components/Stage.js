// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled, {css} from "styled-components"

// ===== import components =====
import Cell from "./Cell"

// ===== import style =====
import { basicTheme, jellyTheme, pastelTheme,doodleTheme, retroTheme, legoTheme} from "../../../styles/TetrisTheme"

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
    height : 600px;
    border-radius: 10px;
    background-color : ${props => props.theme.boardColor};

    ${props => props.theme === doodleTheme && css`
    border : 7px solid #000000;
`}   

${props => (props.theme === retroTheme||props.theme ===legoTheme) && css`
        margin-top :40px;
        border-radius: 0px;
        margin-left : 8px;
    `
}
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