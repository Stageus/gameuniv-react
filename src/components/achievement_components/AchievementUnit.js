// ===== import base =====
import React from "react"
import {useRecoilValue} from "recoil"

//  ===== import recoil =====
import { whichAchievementComponentState } from "../../recoil/ComponentState"
import { achievementTetrisDataState, achievement2048DataState } from "../../recoil/DataState"

// ===== import style =====
import {H1} from "../../styles/H1"
import {Div, ShadowDiv} from "../../styles/Div"
import {Img} from "../../styles/Img"
import {P} from "../../styles/P"

// ===== import hook =====
import {PC, Mobile} from "../../hooks/useMediaComponent"

//  ===== component =====
const AchievementUnit = (props) =>{
    
    const {idx}=props

    const whichAcheivementComponent= useRecoilValue(whichAchievementComponentState)
    const achievementTetrisData=useRecoilValue(achievementTetrisDataState)
    const achievement2048Data=useRecoilValue(achievement2048DataState)
    let achievement_data
    
    if(whichAcheivementComponent==="tetris"){
        achievement_data = achievementTetrisData
    }else{
        achievement_data = achievement2048Data
    }

    const target_achieve = ["1", "15", "50", "5000", "10000", "25000", "미달성"]

    return(
        <React.Fragment>
            <PC>
                <ShadowDiv width = "285px" height="200px"  flex_direction="column" justify_content="space-around" background_color="grayscale1" border_radius="10px">
                    <H1 font_size="s" color="blue4" font_weight="regular">{achievement_data[idx].achieve_name}</H1>
                    <Div width = "100%">
                        <Img width="80px" margin="0 15px 0 0" src={`${process.env.PUBLIC_URL}/img_srcs/imgs/item_imgs/${achievement_data[idx].reward_img}`}/>
                        <P font_size="xxs" color="grayscale7" font_weight="regular">{achievement_data[idx].reward_name}</P>
                    </Div>
                    <Div width = "88%" flex_direction="column">
                        { 
                            achievement_data[idx].achieve_state
                            ?
                            <Div width="85px" height="30px" border_radius="20px" align_items="center" justify_content="center" background_color="green" >
                                <P color="grayscale1" font_size="xs" font_weight="regular">달성!</P>
                            </Div>
                            :
                            <React.Fragment>
                                <P font_size="xxs" font_weight="regular">업적 달성도</P>
                                <Div width="80px" height="23px" border="3px solid gray" border_radius="20px" align_items="center" justify_content="center">
                                    <P font_size="xxs" font_weight="regular">{achievement_data[idx].achievement_value}</P>
                                    <P font_size="xxxs" font_weight="regular">
                                        {
                                            (idx< 6)
                                            ?
                                            " / " + target_achieve[idx]
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
                        <Img width="110px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`}/>
                        <Div flex_direction="column">
                            <H1 font_size="l" color="blue4" font_weight="regular">{11111111}</H1>
                            <P font_size="xs" color="grayscale7" font_weight="regular" margin="0 0 5px 0">{11111111}</P>
                            { 
                                Number(achievement_data[idx].achievement_value) < Number(achievement_data[idx].achievement_target_value)
                                ?
                                <React.Fragment>
                                    <P font_size="xxs" font_weight="regular">게임 플레이 횟수</P>
                                    <Div width="80px" height="23px" border="3px solid gray" border_radius="20px" align_items="center" justify_content="center">
                                        <P font_size="xxs" font_weight="regular">{achievement_data[idx].achievement_value}/</P>
                                        <P font_size="xxs" font_weight="regular">{target_achieve[idx]}</P>
                                    </Div>
                                </React.Fragment>
                                :
                                <Div width="85px" height="30px" border_radius="20px" align_items="center" justify_content="center" background_color="green" >
                                    <P color="grayscale1" font_size="xs" font_weight="regular">달성!</P>
                                </Div>
                            }
                        </Div>
                    </Div>
                </ShadowDiv>
            </Mobile>
        </React.Fragment>
    )
}

export default AchievementUnit