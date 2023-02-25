// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled , {css}from "styled-components"

// ===== import component =====
import AchivementUnit from "../../components/achivement_components/AchivementUnit"

//  ===== import recoil =====
import { whichAchivementComponentState } from "../../recoil/ComponentState"

// ===== import style =====
import {P} from "../../styles/P"

//  ===== component =====
const AchivementContainer = () =>{

    // const AchivementData=[
    //     {   "achivement_id":"0",
    //         "achivement_name":"Dummy0",
    //         "achivement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
    //         "achivement_figure":"11",
    //     },
    //     {   "achivement_id":"1",
    //         "achivement_name":"Dummy1",
    //         "achivement_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
    //         "achivement_figure":"11",
    //     },
    // ]
    
    // ===== recoil state =====
    const whichAchivementComponent= useRecoilValue(whichAchivementComponentState)

    return(
        <React.Fragment>
            
            {whichAchivementComponent === "tetris" && 
                <AchivementUnit/>
            }

            {whichAchivementComponent ==="2048" && 
                <P>2048</P>
            }

        </React.Fragment>
    )
}

export default AchivementContainer