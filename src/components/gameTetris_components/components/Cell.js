// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled, {css} from "styled-components"


// ===== import components =====

import { Div } from "../../../styles/Div"

// ===== import utils =====
import { TETROMINOS } from "../tetrominos"

// ===== import utils =====

const CellDiv=styled.div`
    width :30px;
    height :30px;
    background-image: url(${props=>props.img});
    background-repeat : no-repeat;
    background-position : center;
    background-size : 30px;
`

const Cell =({type})=>{
    return( 
    <CellDiv type={type} img={TETROMINOS[type].cellImg}/>
    )
}

export default Cell