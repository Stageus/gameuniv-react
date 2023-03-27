// ===== import base =====
import React, { Fragment } from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====
import { game2048ResultState} from "./game2048_components/recoil/ScoreState"
import { whichGameState } from "../recoil/PageState"
import { gameTetrisResultState } from "../recoil/DataState"

// ===== import style =====
import { ShadowDiv } from "../styles/Div"
import { Div } from "../styles/Div"
import { H1 } from "../styles/H1"
import { P } from "../styles/P"
import { Img } from "../styles/Img"

//  ===== component =====
const NowAchieveUnit = (props) =>{
    const {idx} = props

    // ===== recoil state =====
    let now_achieve_data
    const whichGame = useRecoilValue(whichGameState)
    const game2048Result =  useRecoilValue(game2048ResultState)
    const gameTetrisResult = useRecoilValue(gameTetrisResultState)
    
    // 조건에 맞는 데이터 세팅
    if(whichGame==="tetris"){
        now_achieve_data = gameTetrisResult.achieveList
    }else if(whichGame==="2048"){
        now_achieve_data = game2048Result.achieveList
    }
   

    return(
        <ShadowDiv width="180px" min_width="180px" height="110px" padding="5px 0 5px 0" border_radius="10px" flex_direction="column" justify_content="space-around">
            <H1 color="blue3" font_size="xs" font_weight="medium" >
                {now_achieve_data[idx].achieve_name}
            </H1>
            <Div width="70%" justify_content="space-around">
                <Img width="50px" src={`${process.env.PUBLIC_URL}/img_srcs/imgs/item_imgs/${now_achieve_data[idx].reward_img}`}/>
                {
                    gameTetrisResult.achieveList[idx].reward_coin === 0
                    ?
                    <Img height="30px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/unlockImg.png`}/>
                    :
                        <P  color="grayscale7" font_size="xxs" font_weight="regular">
                        {now_achieve_data[idx].reward_coin} 코인
                        </P>
                }
            </Div>
            <Div width="50px" height="20px" border_radius="10px" background_color="green">
                <P color="grayscale1" font_size="xxxs" font_weight="regular">달성!</P>
            </Div>
        </ShadowDiv>
    )
}

export default NowAchieveUnit