// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled from "styled-components"

// ===== import component =====
import Profile from "../components/home_components/Profile"
import IndividualTetrisRanking from "../components/home_components/IndividualTetrisRanking"
import Individual2048Ranking from "../components/home_components/Individual2048Ranking"

//  ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import style =====
import {H1} from "../styles/H1"
import {Img, ImgBtn} from "../styles/Img"
import {Div, ShadowDiv} from "../styles/Div"

// ===== style =====

const RelativeDiv = styled(ShadowDiv)`
    position:relative;
    z-index: -1;
`
const AbsoluteImg = styled(Img)`
    position:absolute;
    right :0px;
    z-index: -1;
`

//  ===== component =====
const Home = () =>{
    const setPageState = useSetRecoilState(whichPageState)

    // const loginMenuBtnEvent = (e)=>{
    //     const target = e.target.id

    //     switch(target){
    //         case "idfind_btn":
    //             setPageState("idFind")
    //             break
    //         case "pwfind_btn":
    //             setPageState("pwFind")
    //             break
    //         case "signup_btn":
    //             setPageState("signUp")
    //             break
    //     }

    // }
    return(
        <React.Fragment>
            <Div width = "100%" max_width="800px" height="730px" flex_direction="column">
                <Div width="100%"  max_width="693px" height="301px" justify_content="space-between">
                    <IndividualTetrisRanking/>
                    <Individual2048Ranking/>
                </Div>
                
                <Profile/>

                <Div width="100%"  max_width="693px" height="301px" justify_content="space-between">
                    
                    <RelativeDiv width="49%" height="204px"  ShadowDiv="none" border_radius="3px" background_color="yellow1" align_items="flex-end" justify_content="space-between">
                        <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">업적</H1>
                        <AbsoluteImg src={`${process.env.PUBLIC_URL}/img_srcs/icons/itemDarkYellowIcon.png`}/>
                    </RelativeDiv>
                    
                    <RelativeDiv width="49%" height="204px" border_radius="3px" background_color="yellow1" align_items="flex-end" justify_content="space-between">
                        <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">아이템</H1>
                        <AbsoluteImg src={`${process.env.PUBLIC_URL}/img_srcs/icons/achivementDarkYellowIcon.png`}/>
                    </RelativeDiv>
                </Div>
            </Div>
        </React.Fragment>
    )
}

export default Home