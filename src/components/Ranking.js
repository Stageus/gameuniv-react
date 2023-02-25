// ===== import base =====
import React from "react"
import styled, {css} from "styled-components"
import { useRecoilValue } from "recoil"

// ===== import component =====
import Login from "../pages/Login"
import Find from "../pages/Find"
import SignUp from "../pages/SignUp"
import Home from "../pages/Home"
import Achivement from "../pages/Achivement"
import Item from "../pages/Item"
import Bg from "./Bg"

// ===== import recoil =====
import { whichPageState } from "../../src/recoil/PageState"

// ===== import style =====
import { Div } from "../styles/Div"
import { Img, ImgBtn } from "../styles/Img"
import { H1 } from "../styles/H1"
import { P } from "../styles/P"

// ===== import style func =====
import { color, fontWeight, fontSize } from "../styles/style"


// ===== style =====
const RankHeader = styled(Div)`
    position: relative;
    
`
const RankImg = styled(Img)`
    position: absolute;
    filter: drop-shadow(5px 5px 5px ${color("grayscale4")});
    ${
        props =>{
            const game = props.game
            if(game === "tetris"){
                return css`
                    right: 0%;
                    top: -100px;
                    transform:rotate(30deg);
                `
            }
            else{
                return css`
                    right: 0%;
                    top: -30px;
                    transform:rotate(-15deg);
                `
            }
        }
    }
`

const RankList = styled(P)`
    width:33%;
    ${fontWeight("regular")};
`

const RankP = styled(P)`
    margin-left:10px;
    font-size: ${fontSize("s")};
    ${fontWeight("bold")};
`

const RankDiv = styled(Div)`
    ${
        props =>{
            const rank = props.rank
            if(rank % 2 === 1)
            return css`
                background-color: ${color("blue2")};
                border-radius: 3px;
            `
        }

    }
`

const ShowMore = styled(Div)`
    margin: 5px 0;
    align-items: flex-end;
    cursor:pointer;
`
//  ===== component =====

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Ranking = (props) =>{
    // ===== recoil state =====
    const game = props.game

    // ===== variable =====
    const rank = [1,2,3,4,5]

    return(
        <Div flex_direction="column" width="90%" background_color="blue1" padding="0 10px" margin="5px 0">
            <RankHeader width="100%" justify_content="flex-start">
                {
                    game === "tetris"
                    ?
                    <React.Fragment>
                        <H1 color="blue4" font_size="xl">Tetris</H1>
                        <RankImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/tetrisImg.png`}
                        width="100px" game={game}/>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <H1 color="blue4" font_size="xl">2048</H1>
                        <RankImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/2048Img.png`}
                        width="100px" game={game}/>
                    </React.Fragment>
                }
            </RankHeader>
            {/* rank list name */}
            <Div width="100%" justify_content="space-between" margin="0 0 5px 0">
                <RankList>순위</RankList>                
                <RankList>아이디</RankList>
                <RankList>대학</RankList>
            </Div>
            {/* rank list */}
            {
                rank.map( r => (
                    <RankDiv width="100%" height="37px" justify_content="space-between" rank={r}>
                        <Div width= "33%" justify_content="flex_start">
                            <RankP>{r}</RankP>
                        </Div>
                        
                        <Div width="33%" justify_content="flex_start" >
                            <Div width="26px" height="26px" background_color="grayscale1" border_radius="50%" margin="0 5px 0 0">
                                <Img src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`}
                                width="20px"/>
                            </Div>
                            <P>tmdgns32</P>
                        </Div>
                        <Div width="33%" justify_content="flex_start">
                            <Img src={`${process.env.PUBLIC_URL}/img_srcs/univ_logos/ajouUniversityLogoImg.png`}
                            width="28px" margin="0 5px 0 0"/>
                            <P>아주대학교</P>
                        </Div>
                    </RankDiv>
                ))
            }

            <ShowMore margin="5px 0" align_items="flex-end">
                <P font_size="xxxs" font_weight="regular" color="grayscale6" margin="0 3px 0 0">더보기</P>
                <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/triangleGrayIcon.png`}
                width="14px" margin="0 5px 0 0"/>
            </ShowMore>
        </Div>
    )
}

export default Ranking