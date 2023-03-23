// ===== import base =====
import React, { Fragment } from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====

// ===== import recoil =====

import { game2048ResultState} from "./game2048_components/recoil/ScoreState"
import { whichGameState } from "../recoil/PageState"


// ===== import style =====
import { ShadowDiv } from "../styles/Div"
import { Div } from "../styles/Div"
import { H1 } from "../styles/H1"
import { P } from "../styles/P"
import { Img } from "../styles/Img"

// ===== style =====

//  ===== component =====

const NowAchieveUnit = (props) =>{
    const [idx] = props

    // ===== recoil state =====
    const whichGame = useRecoilValue(whichGameState)
    const game2048Result =  useRecoilValue(game2048ResultState)
    // const gameTetrisResult = useRecoilValue(gameTetrisResultState)
    const [gameResult, setGameResultState] = React.useState(null)
    if(whichGame==="tetris"){
        // setGameResultState(gameTetrisResult)
    }else{
        setGameResultState(game2048Result)
    }
   

    return(
        <ShadowDiv width="181px" height="110px" padding="5px 0 5px 0" border_radius="10px" flex_direction="column" justify_content="space-around">
            <H1 color="blue3" font_size="xs" font_weight="medium" >
                {gameResult.achieveList[idx].achieve_name}
            </H1>
            <Div width="60%" justify_content="space-around">
                {
                    gameResult.achieveList[idx].reward_type === "coin"
                    ?
                    <React.Fragment>
                        <Img height="50px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`}/>
                        <P  color="grayscale7" font_size="xxs" font_weight="regular">
                        {gameResult.achieveList[idx].reward_coin}
                        </P>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Img height="50px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/${gameResult.achieveList[idx].reward_img}`}/>
                        <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/unlockImg.png`}/>
                    </React.Fragment>
                }
            </Div>
            <Div width="50px" height="20px" border_radius="10px" background_color="green">
                <P color="grayscale1" font_size="xxxs" font_weight="regular">달성!</P>
            </Div>
        </ShadowDiv>
    )
}

export default NowAchieveUnit