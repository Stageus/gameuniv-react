// ===== import base =====
import React from "react"
import styled from "styled-components"

// ===== style =====
const ScoreBoxDiv = styled.div`
    display: flex;
    width: fit-content;
    flex-direction: column;
    background: #bbada0;
    padding: 10px 15px;
    border-radius: 3px;
    margin-top: 8px;
    text-align: center;
`

const Title = styled.span`
font-size: 13px;
    color: #eee4da;
`

const Score = styled.span`
    font-size: 25px;
    font-weight: bold;
    color: white;
`
// ===== component =====
const ScoreBox = (props) =>{
    return(
        <ScoreBoxDiv>
            <Title>{props.title}</Title>
            <Score>{props.score}</Score>
        </ScoreBoxDiv>
    )
}

export default ScoreBox