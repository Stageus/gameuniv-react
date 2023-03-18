// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled, {css} from "styled-components"


// ===== import components =====
const DisplayDiv =styled.div`
    height :60px;

`
// ===== import utils =====

const ScoreContainer =({text})=>{

    return(
    <DisplayDiv>{text}</DisplayDiv>
    )
}

export default ScoreContainer