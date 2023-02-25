// ===== import base =====
import React from "react"
import {useSetRecoilState} from "recoil"

// ===== import component =====
import AchivementContainer from "../components/achivement_components/AchivementContainer"
import TabBtn from "../components/TabBtn"

//  ===== import recoil =====
import { whichAchivementComponentState } from "../recoil/ComponentState"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"

//  ===== component =====
const Achivement = () =>{
    // ===== recoil state =====
    const setAchivementComponentState= useSetRecoilState(whichAchivementComponentState)
    // ===== event =====
    const achivementTabBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "tab1":
                setAchivementComponentState("tetris")
                break
            case "tab2":
                setAchivementComponentState("2048")
                break
        }

    }
    return(
        <React.Fragment>
            <Div width = "100%" max_width="800px" height="85%" align_items="flex-start"  flex_direction="column">
                <H1 font_size="xl" color="grayscale7">
                    업적
                </H1>

                <Div width="100%"  max_width="693px" height="62px" justify_content="space-between" margin="25px 0 0 0" onChange={achivementTabBtnEvent}>
                    <TabBtn id="tab1" after_img="/img_srcs/icons/tetrisBlueIcon.png" before_img="/img_srcs/icons/tetrisGrayIcon.png" txt="Tetris" width="344px"/>
                    <TabBtn id="tab2" after_img="/img_srcs/icons/2048BlueIcon.png" before_img="/img_srcs/icons/2048GrayIcon.png" txt="2048" width="344px"/> 
                </Div>

                <Div width="100%" max_width="693px" height="100%" border_radius="0 0 3px 3px" background_color="blue2" flex_direction="column">
                    <AchivementContainer/>
                </Div>
            </Div>
        </React.Fragment>
    )
}

export default Achivement