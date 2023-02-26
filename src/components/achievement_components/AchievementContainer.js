// ===== import base =====
import React from "react"
import {useEffect}  from "react"
import {useRecoilValue, useRecoilState} from "recoil"
import styled , {css}from "styled-components"

// ===== import component =====
import AchievementUnit from "./AchievementUnit"

//  ===== import recoil =====
import { whichAchievementComponentState } from "../../recoil/ComponentState"
import { achievementTetrisDataState, achievement2048DataState } from "../../recoil/DataState"

// ===== import style =====
import {P} from "../../styles/P"
import {Div, ShadowDiv} from "../../styles/Div"

//  ===== component =====
const AchievementContainer = () =>{
    // ===== dynamic data =====
    const achieveTetrisData=[
        {   "achievement_id":"0",
            "achievement_name":"Dummy0",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"11",
        },
        {   "achievement_id":"1",
            "achievement_name":"Dummy1",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"10",
        },
        {   "achievement_id":"2",
            "achievement_name":"Dummy1",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"01",
        },
        {   "achievement_id":"3",
            "achievement_name":"Dummy1",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"01",
        },
        {   "achievement_id":"4",
            "achievement_name":"Dummy1",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"01",
        },
        {   "achievement_id":"5",
            "achievement_name":"Dummy2",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"11",
        },
        {   "achievement_id":"6",
            "achievement_name":"Dummy3",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"01",
        },
        {   "achievement_id":"7",
            "achievement_name":"Dummy7",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"01",
        },
    ]

    const achieve2048Data=[
        {   "achievement_id":"0",
            "achievement_name":"Dummy0",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"11",
        },
        {   "achievement_id":"1",
            "achievement_name":"Dummy1",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"11",
        },
        {   "achievement_id":"2",
            "achievement_name":"Dummy1",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"01",
        },
        {   "achievement_id":"3",
            "achievement_name":"Dummy1",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"10",
        },
        {   "achievement_id":"4",
            "achievement_name":"Dummy1",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"01",
        },
        {   "achievement_id":"5",
            "achievement_name":"Dummy2",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"11",
        },
        {   "achievement_id":"6",
            "achievement_name":"Dummy3",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"01",
        },
        {   "achievement_id":"7",
            "achievement_name":"Dummy7",
            "achievement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "achievement_figure":"01",
        },
    ]

    // ===== recoil state =====
    const whichAcheivementComponent= useRecoilValue(whichAchievementComponentState)
    const [achievementTetrisData,setAchievementTetrisData]=useRecoilState(achievementTetrisDataState)
    const [achievement2048Data,setAchievement2048Data]=useRecoilState(achievement2048DataState)

    useEffect(() => {
        setAchievementTetrisData(achieveTetrisData)
        setAchievement2048Data(achieve2048Data)
    },[])

    return(
        <React.Fragment>
            {
            whichAcheivementComponent === "tetris" && 
            achievementTetrisData && achievementTetrisData.map((data, index)=>{
                    return <AchievementUnit key={data} index={index}/>
                })
            }       

            {whichAcheivementComponent ==="2048" && 
            achievement2048Data && achievement2048Data.map((data, index)=>{
                    return <AchievementUnit key={data} index={index}/>
                })
            }
        </React.Fragment>
    )
}

export default AchievementContainer