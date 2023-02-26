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
import {Div, ShadowDiv} from "../styles/Div"

// ===== import style func =====
import {color} from "../styles/style"


// ===== style =====
const ItemBtnDiv = styled(ShadowDiv)`
    position:relative;
    background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/itemDarkYellowIcon.png);
    background-repeat : no-repeat;
    background-position : right bottom;
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
const AchivementBtnDiv = styled(ShadowDiv)`
    position:relative;
    background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/achivementDarkYellowIcon.png);
    background-repeat : no-repeat;
    background-position : right bottom;
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

//  ===== component =====
const Home = () =>{
    // ===== recoil state =====
    const setPageState = useSetRecoilState(whichPageState)
    // ===== event =====
    const utilityBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "item_btn":
                setPageState("item")
                break
            case "achivement_btn":
                setPageState("achivement")
                break
        }

    }

    return(
        <React.Fragment>
            <Div width = "100%" max_width="800px" height="730px" flex_direction="column">
                <Div width="100%"  max_width="693px" height="301px" justify_content="space-between">
                    <IndividualTetrisRanking/>
                    <Individual2048Ranking/>
                </Div>
                
                <Profile/>

                <Div width="100%"  max_width="693px" height="301px" justify_content="space-between" onClick={utilityBtnEvent}>
                    <ItemBtnDiv width="49%" height="204px" border_radius="3px" background_color="yellow1" align_items="flex-end" justify_content="space-between" id="item_btn">
                        <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">아이템</H1>
                    </ItemBtnDiv>

                    <AchivementBtnDiv width="49%" height="204px" border_radius="3px" background_color="yellow1" align_items="flex-end" justify_content="space-between" id="achivement_btn">
                        <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">업적</H1>
                    </AchivementBtnDiv>
                </Div>
            </Div>
        </React.Fragment>
    )
}

export default Home