// ===== import base =====
import React from "react"
import styled, {css} from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"
import 'animate.css'

// ===== import component =====

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import style =====
import { Img, ImgBtn } from "../styles/Img"
import { Div } from "../styles/Div"
import { H1 } from "../styles/H1"
import { P } from "../styles/P"
// ===== import style func =====
import { color, fontSize, fontWeight } from "../styles/style"

// ===== style =====
const RankList = styled(P)`
    width:33%;
    font-size: ${fontSize("xxs")};
    ${fontWeight("regular")};
`

const RankP = styled(P)`
    margin-left:10px;
    font-size: ${fontSize("s")};
    ${fontWeight("bold")};
`

const ScoreP = styled(P)`
    margin-left: 10px;
    border-radius: 50px;
    width: 60px;
    text-align: center;
    font-size: ${fontSize("xxxs")};
    ${fontWeight("bold")};

    ${
        props =>{
            const rank = props.rank
            if(rank % 2 === 1){
                return css`
                    background-color: ${color("blue5")};
                `
            }
            else{
                return css`
                    background-color: ${color("grayscale3")};
                `
            }
        }

    }
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

const RankScroll = styled(Div)`
    overflow-y:auto;
    justify-content: flex-start;
`

const RankingTotalBox = styled(Div)`
    min-width: 300px;
`

//  ===== component =====

const MobileRangking = () =>{

    const rank = Array.from({length:100}, (v,i)=>i+1);

    return(
        <RankingTotalBox width="95%" height="300px" align_items="flex-start">
            <Div width="90%" flex_direction="column" justify_content="flex-start" align_items="flex-start"> 
                <H1 font_size="xl" color="blue4" margin="0 0 10px 0">Tetris</H1>
                <Div flex_direction="column" width="100%" background_color="grayscale2">
                {/* rank list name */}
                    <Div width="95%" justify_content="space-between" margin="10px 0 5px 0">
                        <RankList>순위</RankList>                
                        <RankList>아이디</RankList>
                        <RankList>대학</RankList>
                    </Div>
                {/* rank list */}
                    <RankScroll flex_direction="column" width="100%" height="220px">
                        {
                            rank.map( r => (
                                <RankDiv width="95%" height="37px" justify_content="space-between" rank={r}>
                                    <Div width= "33%" justify_content="flex_start">
                                        <RankP>{r}</RankP>
                                        <ScoreP rank={r}>23032</ScoreP>
                                    </Div>
                                    
                                    <Div width="33%" justify_content="flex_start" >
                                        <Div width="20px" height="20px" background_color="grayscale1" border_radius="50%" margin="0 5px 0 0">
                                            <Img src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`}
                                            width="15px"/>
                                        </Div>
                                        <P font_size="xxxs" font_weight="bold">tmdgns32</P>
                                    </Div>
                                    <Div width="33%"  justify_content="flex_start">
                                        <P font_size="xxs">아주대학교</P>
                                    </Div>
                                </RankDiv>
                            ))
                        }
                    </RankScroll>
                </Div>
            </Div>
        </RankingTotalBox>

    )
}

export default MobileRangking