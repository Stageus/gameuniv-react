// ===== import base =====
import React from "react";
import styled, {css} from "styled-components";

// ===== import hooks =====
import { useGameContext } from "../Game/Game";
import { useMobile } from "../../../../hooks/useMediaComponent";
import { useSetModalState } from "../../../../hooks/useSetModalState";
import { useSetRecoilState } from "recoil";

// ===== import recoil =====
import { whichModalState } from "../../../../recoil/ModalState";
// ===== import component =====
import ScoresContainer from "../ScoresContainer/ScoresContainer"

// ===== import style =====
import { Button } from "../../../../styles/Button";
import { Div } from "../../../../styles/Div";
import { P } from "../../../../styles/P";

// ===== import style func =====
import { fontSize, color, fontWeight } from "../../../../styles/style";
import { doodleTheme, jellyTheme, retroTheme, legoTheme } from "../../styles/theme";


const Header = styled(Div)`
    ${props => props.theme === jellyTheme && css`
        background: #FFF7CB;
        justify-content: space-around;
    `}

    ${props => props.theme === retroTheme && css`
        width: 470px;
    `}

`

const HeaderMenu = styled(Div)`
    ${props => props.theme === jellyTheme && css`
        align-items: center;
    `}

    
`
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

    ${props => props.theme === jellyTheme && css`
        font-size: ${props.isMobile ? fontSize("xl") : fontSize("xxxl")};
        -webkit-text-stroke: 2px #FFEC3D;
    `}

    ${props => props.theme === retroTheme && css`
        width:180px;
        height:30px;
        background: url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/title.png) no-repeat;
        background-size: contain;
        background-position: center; 
        position: relative;
        left: 25px;
        top: 2px;

        ${props => props.isMobile && css`
            width: 106.4px;
            height: 26.6px;
            top: -20px;
            left: 110px;
        `
        }
    `}

    ${props => props.theme === legoTheme && css`
        background: url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/title.png) no-repeat #007FDB;
        background-size: contain;
        background-position: center; 
        position: relative;
        left: 25px;
        top: 2px;

        ${props => props.isMobile && css`
            width: 106.4px;
            height: 26.6px;
            top: -17px;
            left: 17px;
        `
        }
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

    ${props => props.theme === jellyTheme && css`
        border: 3px solid #FFEC3D;
        border-radius : 15px;
    `}

    ${props => props.theme === retroTheme && css`
        width:208px;
        height:45px;
        background: url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/retry.png);
        background-size: 208px 45px;
        background-repeat: no-repeat;
        position: relative;
        left: 8px;
        top: -8px;

        ${props => props.isMobile && css`
            width: 123px;
            height: 26.6px;
            background-size: 123px 26.6px;
            background-repeat: no-repeat;
            top: -35px;
            left: 100px;
        `
        }
    `}

    ${props => props.theme === legoTheme && css`
        width:180px;
        height:45px;
        background: url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/retry.png);
        background-size: cover;
        position: relative;
        left: 25px;
        top: 2px;

        ${props => props.isMobile && css`
            width: 106.4px;
            height: 26.6px;
            top: -27px;
            left: 17px;
        `
        }
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
    const setModalState = useSetRecoilState(whichModalState)
    return(
        <Header justify_content="space-between" height={isMobile ? "130px" :"180px"} width={isMobile ? "300px": "500px"}>
            <HeaderMenu flex_direction="column" height ={isMobile ? "100px":"135px"} align_items="flex-start" 
            justify_content="space-between"> 
                <GameTitle isMobile={isMobile}>2048</GameTitle>
                <RetryBtn isMobile={isMobile} 
                onClick={useSetModalState("retryGameModal")}>다시하기</RetryBtn>
            </HeaderMenu>
            <div>
                <ScoresContainer/>
            </div>
        </Header>

    )

}
export default GameHeader