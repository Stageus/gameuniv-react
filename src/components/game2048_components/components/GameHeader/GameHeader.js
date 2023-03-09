// ===== import base =====
import React from "react";
import styled, {css} from "styled-components";

// ===== import hooks =====
import { useGameContext } from "../Game/Game";
import { useMobile } from "../../../../hooks/useMediaComponent";
import { useSetModalState } from "../../../../hooks/useSetModalState";
// ===== import component =====
import ScoresContainer from "../ScoresContainer/ScoresContainer"

// ===== import style =====
import { Button } from "../../../../styles/Button";
import { Div } from "../../../../styles/Div";
import { P } from "../../../../styles/P";

// ===== import style func =====
import { fontSize, color, fontWeight } from "../../../../styles/style";
import { doodleTheme } from "../../styles/theme";

const GameTitle = styled(Div)`
    background-color: ${props => props.theme.mainColor};
    color: ${props => props.theme.titleColor};
    border-radius : 5px;
    width: 210px;
    height: 70px;
    font-size: ${fontSize("xl")};
    fontWeight: ${fontWeight("bold")};

    ${props => props.isMobile && css`
        width: 100px;
        height: 33px;
        font-size: ${fontSize("s")};
    `}
    ${props => props.theme === doodleTheme && css`
        -webkit-text-stroke: 2px black;
        border: 3px solid black;
    `}
`

const RetryBtn = styled(Button)`
    width: 160px;
    height: 39px;
    font-size: ${fontSize("xs")};
    background-color: ${props => props.theme.mainColor};
    color: ${props => props.theme.titleColor};

    ${props => props.isMobile && css`
        width: 70px;
        height: 25px;
        font-size: ${fontSize("xxs")};
    `}

    ${props => props.theme === doodleTheme && css`
        -webkit-text-stroke: 1px black;
        border: 3px solid black;
    `}

    &:hover{
        background-color: ${props=> props.theme.hoverColor};
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`
// const GameTitle = () => <P>2048</P>

const GameHeader = () =>{
    const { dispatch } = useGameContext()
    const isMobile = useMobile()

    return(
        <Div justify_content="space-between" height={isMobile ? "130px" :"180px"} width={isMobile ? "300px": "500px"}>
            <Div flex_direction="column" height ={isMobile ? "100px":"135px"} align_items="flex-start" 
            justify_content="space-between"> 
                <GameTitle isMobile={isMobile}>2048</GameTitle>
                <RetryBtn isMobile={isMobile} 
                onClick={useSetModalState("retryGameModal")}>다시하기</RetryBtn>
            </Div>
            <div>
                <ScoresContainer/>
            </div>
        </Div>

    )

}
export default GameHeader