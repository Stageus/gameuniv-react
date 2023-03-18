// ===== import base =====
import React, { useEffect }  from "react"
import {useSetRecoilState, useRecoilValue,useResetRecoilState} from "recoil"
import styled from "styled-components"
import { Navigate } from "react-router"

// ===== import component =====
import AchievementContainer from "../components/achievement_components/AchievementContainer"
import TabBtn from "../components/TabBtn"

//  ===== import recoil =====
import { whichAchievementComponentState,isTabOpenState } from "../recoil/ComponentState"
import { isLoginState } from "../recoil/DomainState"

// ===== import hook =====
import {PC, Mobile} from "../hooks/useMediaComponent"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"

// ===== style =====
const AchievementContainerPcDiv = styled(Div)`
    grid-gap: 20px;
    flex-wrap: wrap;
    overflow-y : scroll;
`
const AchievementContainerMobileDiv = styled(Div)`
    grid-gap: 10px;
    flex-wrap: wrap;
    overflow-y : scroll;
`

//  ===== component =====
const Achievement = () =>{
    // ===== recoil state =====
    const setAchievementComponentState= useSetRecoilState(whichAchievementComponentState)
    const resetAchievementComponent = useResetRecoilState(whichAchievementComponentState)
    const setTabOpenState=useSetRecoilState(isTabOpenState)
    const resetTabOpenState = useResetRecoilState(isTabOpenState)
    const isLogin = useRecoilValue(isLoginState)
    // ===== hook =====
    useEffect(()=>{
        resetTabOpenState()
        resetAchievementComponent()
    })
    // 비정상접근 막기
    if(!isLogin){
        alert("로그인 후 이용 가능합니다")
        return <Navigate to="/" replace={true}/>
    }
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
            <Div width = "100%" height="100%">
                <PC>
                    <Div width="750px" height="95%" align_items="flex-start" flex_direction="column" margin="30px 0 0 0">
                        <H1 font_size="xl" color="grayscale7">
                            업적
                        </H1>
                        <Div width="750px" height="62px" justify_content="space-between" margin="25px 0 0 0" onChange={achievementTabBtnEvent}>
                            <TabBtn id="tab1" after_img="/img_srcs/icons/tetrisBlueIcon.png" before_img="/img_srcs/icons/tetrisGrayIcon.png" txt="Tetris" width="49.5%"/>
                            <TabBtn id="tab2" after_img="/img_srcs/icons/2048BlueIcon.png" before_img="/img_srcs/icons/2048GrayIcon.png" txt="2048" width="49.5%"/> 
                        </Div>
                        <AchievementContainerPcDiv width="750px" height="100%" border_radius="0 0 3px 3px" background_color="blue2" padding="20px 0 20px 0">
                            <AchievementContainer/>
                        </AchievementContainerPcDiv>
                    </Div>
                </PC>
                <Mobile>
                    <Div width="440px" height="800px"  align_items="flex-start" flex_direction="column">
                        <H1 font_size="l" color="grayscale7" margin="0 0 10px 0">
                            업적
                        </H1>
                        <AchievementContainerMobileDiv width="440px" height="100%" border_radius="10px 10px 10px 10px" background_color="blue2" padding="20px 0 20px 0">
                            <AchievementContainer/>
                        </AchievementContainerMobileDiv>
                        <Div width="440px"  height="62px" justify_content="space-between" margin="25px 0 0 0" onChange={achievementTabBtnEvent}>
                            <TabBtn id="tab1" after_img="/img_srcs/icons/tetrisBlueIcon.png" before_img="/img_srcs/icons/tetrisGrayIcon.png" txt="Tetris" width="49%"/>
                            <TabBtn id="tab2" after_img="/img_srcs/icons/2048BlueIcon.png" before_img="/img_srcs/icons/2048GrayIcon.png" txt="2048" width="49%"/> 
                        </Div>
                    </Div>
                </Mobile>
            </Div>
            
        </React.Fragment>
    )
}

export default Achievement