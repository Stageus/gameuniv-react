// ===== import base =====
import React from "react"
import styled, {css} from "styled-components"

// ===== import hooks =====
import { useMobile } from "../../../../hooks/useMediaComponent"

// ===== import style =====
import { Div } from "../../../../styles/Div"
import { color, fontSize, fontWeight } from "../../../../styles/style"

// ===== style =====
const ScoreBoxDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.span`
    font-size: 13px;
    color: #eee4da;
`

const Score = styled(Div)`
    font-size: ${fontSize("xs")};
    width: 50px;
    ${fontWeight("bold")};
    margin-left: 10px;

    ${props => props.isMobile && css`
        width: 25px;
        margin-left:5px;
        font-size: 5px;
    `}
`
// ===== component =====
const ScoreBox = (props) =>{
    const isMobile = useMobile()
    // console.log(props.score)
    return(
        <ScoreBoxDiv>
            <Title>{props.title}</Title>
            <Score isMobile={isMobile}>{props.score ? props.score : 0}</Score>
        </ScoreBoxDiv>
    )
}

export default ScoreBox