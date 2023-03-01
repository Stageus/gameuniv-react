// ===== import base =====
import React from "react"
import {useSetRecoilState} from "recoil"
import styled , {css}from "styled-components"

// ===== import component =====
import AchievementContainer from "../components/achievement_components/AchievementContainer"
import TabBtn from "../components/TabBtn"

//  ===== import recoil =====
import { whichAchievementComponentState } from "../recoil/ComponentState"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"

// ===== style =====
const AchievementContainerDiv = styled(Div)`
    grid-gap: 20px;
    flex-wrap: wrap;
    overflow-y : scroll;
`

//  ===== component =====
const Achievement = () =>{
    // ===== recoil state =====
    const [isTabOpen, setTabOpenState] = React.useState("tab1")
    const setAchievementComponentState= useSetRecoilState(whichAchievementComponentState)
    // ===== event =====
    const achievementTabBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "tab1":
                setAchievementComponentState("tetris")
                setTabOpenState("tab1")
                break
            case "tab2":
                setAchievementComponentState("2048")
                setTabOpenState("tab2")
                break
        }

    }
    return(
        <React.Fragment>
            <Div width = "100%" max_width="800px" height="85%" align_items="flex-start"  flex_direction="column">
                <H1 font_size="xl" color="grayscale7">
                    업적
                </H1>

                <Div width="100%"  max_width="693px" height="62px" justify_content="space-between" margin="25px 0 0 0" onChange={achievementTabBtnEvent}>
                    <TabBtn id="tab1" after_img="/img_srcs/icons/tetrisBlueIcon.png" before_img="/img_srcs/icons/tetrisGrayIcon.png" txt="Tetris" width="344px" isTabOpen={isTabOpen}/>
                    <TabBtn id="tab2" after_img="/img_srcs/icons/2048BlueIcon.png" before_img="/img_srcs/icons/2048GrayIcon.png" txt="2048" width="344px" isTabOpen={isTabOpen}/> 
                </Div>

                <AchievementContainerDiv width="100%" max_width="693px" height="100%" border_radius="0 0 3px 3px" background_color="blue2" padding="20px 0 20px 0">
                    <AchievementContainer/>
                </AchievementContainerDiv>
            </Div>
        </React.Fragment>
    )
}

export default Achievement