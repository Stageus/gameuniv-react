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

const GameTitle = styled(Div)`
    background-color: ${color("blue3")};
    color: ${color("grayscale1")};
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
`

const RetryBtn = styled(Button)`
    width: 160px;
    height: 39px;
    font-size: ${fontSize("xs")};

    ${props => props.isMobile && css`
        width: 70px;
        height: 25px;
        font-size: ${fontSize("xxs")};
    `}
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