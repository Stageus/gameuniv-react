// ===== import base =====
import React, { useEffect } from "react"
import {useRecoilValue} from "recoil"

//  ===== import recoil =====
import { whichAchievementComponentState } from "../../recoil/ComponentState"
import { achievementTetrisDataState, achievement2048DataState, gameCountDataState } from "../../recoil/DataState"
import { userTetrisRankDataState, user2048RankDataState } from "../../recoil/UserDataState"

// ===== import style =====
import {H1} from "../../styles/H1"
import {Div, ShadowDiv} from "../../styles/Div"
import {Img} from "../../styles/Img"
import {P} from "../../styles/P"

// ===== import hook =====
import {PC, Mobile} from "../../hooks/useMediaComponent"

//  ===== component =====
const AchievementUnit = (props) =>{
    //===== var =====
    let achievement_data
    let achievement_rank_data
    let achieveDegree
    //===== props =====
    const {idx}=props
    //===== recoil state =====
    const whichAcheivementComponent= useRecoilValue(whichAchievementComponentState)
    const achievementTetrisData=useRecoilValue(achievementTetrisDataState)
    const achievement2048Data=useRecoilValue(achievement2048DataState)
    const userTetrisRankData=useRecoilValue(userTetrisRankDataState)
    const user2048RankData=useRecoilValue(user2048RankDataState)
    const gameCountData= useRecoilValue(gameCountDataState)

    // 조건에 맞는 데이터 세팅
    if(whichAcheivementComponent==="tetris"){
        achievement_data = achievementTetrisData
        achievement_rank_data = userTetrisRankData
        achieveDegree  = gameCountData.game_tetris
        
    }else{
        achievement_data = achievement2048Data
        achievement_rank_data = user2048RankData
        achieveDegree  = gameCountData.game_2048
    }
    //업적 달성 목표 배열
    const target_achieve = ["1", "15", "50", "5000", "10000", "25000", "미달성"]
    //달성도
    if (idx > 5){
        achieveDegree = achievement_rank_data.rank
    } else if (idx > 2) {
        achieveDegree = achievement_rank_data.max_score
    }

    return(
        <React.Fragment>
            <PC>
                <ShadowDiv width = "285px" height="200px"  flex_direction="column" justify_content="space-around" background_color="grayscale1" border_radius="10px">
                    <H1 font_size="s" color="blue4" font_weight="regular">{achievement_data[idx].achieve_name}</H1>
                    <Div width = "100%">
                        <Img width="80px" margin="0 15px 0 0" src={`${process.env.PUBLIC_URL}/img_srcs/imgs/item_imgs/${achievement_data[idx].reward_img}`}/>
                        <P font_size="xxs" color="grayscale7" font_weight="regular">{achievement_data[idx].reward_name}</P>
                    </Div>
                    <Div width = "88%" height="50px" flex_direction="column">
                        { 
                            achievement_data[idx].achieve_state
                            ?
                            <Div width="95px" height="35px" border_radius="20px" background_color="green">
                                <P color="grayscale1" font_size="xs" font_weight="regular">달성!</P>
                            </Div>
                            :
                            <React.Fragment>
                                <P font_size="xxs" font_weight="regular">업적 달성도</P>
                                <Div width="80px" height="23px" border="3px solid gray" border_radius="20px" margin="3px 0 0 0">
                                    <P font_size="xxxs" font_weight="regular">{achieveDegree==null ? "0" :(idx < 6) && achieveDegree}</P>
                                    <P font_size="xxxs" font_weight="regular">
                                        {
                                            (idx< 6)
                                            ?
                                            "/" + target_achieve[idx]
                                            :
                                            target_achieve[6]
                                        }           
                                    </P>
                                </Div>
                            </React.Fragment>
                        }
                    </Div>
                </ShadowDiv>
            </PC>
            <Mobile>
                <ShadowDiv width = "400px" height="150px" background_color="grayscale1" border_radius="10px">
                    <Div width = "85%" justify_content="space-between" >
                        <Img width="110px" src={`${process.env.PUBLIC_URL}/img_srcs/imgs/item_imgs/${achievement_data[idx].reward_img}`}/>
                        <Div flex_direction="column">
                            <H1 font_size="xs" color="blue4" font_weight="regular">{achievement_data[idx].achieve_name}</H1>
                            <P font_size="xxs" color="grayscale7" font_weight="regular" margin="0 0 5px 0">{achievement_data[idx].reward_name}</P>
                            { 
                            achievement_data[idx].achieve_state
                            ?
                            <Div width="80px" height="23px" border_radius="20px" background_color="green">
                                <P color="grayscale1" font_size="xxs" font_weight="regular">달성!</P>
                            </Div>
                            :
                            <React.Fragment>
                                <P font_size="xxxs" font_weight="regular">업적 달성도</P>
                                <Div width="80px" height="23px" border="3px solid gray" border_radius="20px" margin="3px 0 0 0">
                                    <P font_size="xxxs" font_weight="regular">{achieveDegree==null ? "0" :(idx < 6) && achieveDegree}</P>
                                    <P font_size="xxxs" font_weight="regular">
                                        {
                                            (idx< 6)
                                            ?
                                            "/" + target_achieve[idx]
                                            :
                                            target_achieve[6]
                                        }           
                                    </P>
                                </Div>
                            </React.Fragment>
                        }
                        </Div>
                    </Div>
                </ShadowDiv>
            </Mobile>
        </React.Fragment>
    )
}

export default AchievementUnit
