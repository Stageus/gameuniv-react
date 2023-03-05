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

// ===== import react router =====
import {Route, Link, useNavigate} from "react-router-dom"

// ===== import hook =====
import {PC, Mobile} from "../hooks/useMediaComponent"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div, ShadowDiv} from "../styles/Div"

// ===== import style func =====
import {color} from "../styles/style"


// ===== style =====
const ItemBtnPcDiv = styled(ShadowDiv)`
    position:relative;
    background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/itemDarkYellowIcon.png);
    background-repeat : no-repeat;
    background-position : right bottom;
    background-size :  none;
    z-index: 0;
    &:hover{
        background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/itemLightYellowIcon.png);
        background-color : ${color("yellow2")};
        box-shadow : none;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`
const AchivementBtnPcDiv = styled(ShadowDiv)`
    position:relative;
    background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/achivementDarkYellowIcon.png);
    background-repeat : no-repeat;
    background-position : right bottom;
    background-size : none;
    z-index: 0;
    &:hover{
        background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/achivementLightYellowIcon.png);
        background-color : ${color("yellow2")};
        box-shadow : none;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`
const ItemBtnMobileDiv = styled(ShadowDiv)`
    position:relative;
    background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/itemDarkYellowMobileIcon.png);
    background-repeat : no-repeat;
    background-position : 90%;
    background-size : 120px;
    z-index: 0;
    &:hover{
        background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/itemLightYellowMobileIcon.png);
        background-color : ${color("yellow2")};
        box-shadow : none;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`
const AchivementBtnMobileDiv = styled(ShadowDiv)`
    position:relative;
    background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/achievementDarkYellowMobileIcon.png);
    background-repeat : no-repeat;
    background-position : 90%;
    background-size :  120px;
    z-index: 0;
    &:hover{
        background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/achievementLightYellowMobileIcon.png);
        background-color : ${color("yellow2")};
        box-shadow : none;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`

//  ===== component =====
const Home = () =>{
    // ===== recoil state =====
    const setPageState = useSetRecoilState(whichPageState)
    // ===== router =====
    const navigate = useNavigate()
    // ===== event =====
    const utilityBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "item_btn":
                setPageState("item")
                break
            case "achivement_btn":
                setPageState("achievement")
                break
        }

    }

    return(
        <React.Fragment>
            <Div width = "700px" height="730px" flex_direction="column">
                <PC>
                    <Div width="100%"   height="301px" justify_content="space-between">
                        <IndividualTetrisRanking/>
                        <Individual2048Ranking/>
                    </Div>
                    <Profile/>
                    <Div width="100%"   height="301px" justify_content="space-between" onClick={utilityBtnEvent}>
    
                        <ItemBtnPcDiv width="49%" height="204px" border_radius="3px" background_color="yellow1" background_size="auto" align_items="flex-end" justify_content="space-between" id="item_btn"
                        onClick={()=>navigate("/item")}>
                            <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">아이템</H1>
                        </ItemBtnPcDiv>

                        <AchivementBtnPcDiv width="49%" height="204px" border_radius="3px" background_color="yellow1" background_size="auto" align_items="flex-end" justify_content="space-between" id="achivement_btn"
                        onClick={()=>navigate("/achievement")}>
                            <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">업적</H1>
                        </AchivementBtnPcDiv>
                    </Div>
                </PC>
                <Mobile>
                    <Div width="440px"   height="301px" justify_content="space-between">
                        <IndividualTetrisRanking/>
                        <Individual2048Ranking/>
                    </Div>
                    <Profile/>
                    <Div width="440px"  max_width="693px" height="301px" flex_direction="column" justify_content="space-evenly" onClick={utilityBtnEvent}>
  
                        <ItemBtnMobileDiv width="100%" height="100px" border_radius="3px" background_color="yellow1" background_size="185px" align_items="center" justify_content="start" id="item_btn"
                        onClick={()=>navigate("/item")}>
                            <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">아이템</H1>
                        </ItemBtnMobileDiv>

                        <AchivementBtnMobileDiv width="100%" height="100px" border_radius="3px" background_color="yellow1" background_size="185px" align_items="center" justify_content="start" id="achivement_btn"
                        onClick={()=>navigate("/achievement")}>
                            <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">업적</H1>
                        </AchivementBtnMobileDiv>
                    </Div>
                </Mobile>
            </Div>
        </React.Fragment>
    )
}

export default Home