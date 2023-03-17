// ===== import base =====
import React, {useContext, useEffect } from "react"
import styled, {css} from "styled-components"


// ===== import components =====
import Cell from "../Cell"

// ===== import utils =====

const ReplayBtn =({callback})=>{
    return(
    <div onClick={callback}>Start Game</div>
    )
}

export default ReplayBtn