// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled from "styled-components"

// ===== import component =====
import Profile from "../components/home_components/Profile"
import IndividualTetrisRanking from "../components/home_components/IndividualTetrisRanking"
import Individual2048Ranking from "../components/home_components/Individual2048Ranking"

//  ===== import recoil =====
import { whichItemComponentState } from "../recoil/ComponentState"

// ===== import style =====
import {H1} from "../styles/H1"
import {Img, ImgBtn} from "../styles/Img"
import {Div, ShadowDiv} from "../styles/Div"
import {Button} from "../styles/Button"
import {P} from "../styles/P"

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
const Item = () =>{
    const setPageState = useSetRecoilState(whichItemComponentState)

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
                <H1 font_size="xl" color="grayscale7">
                    아이템
                </H1>

                <Div width="100%"  max_width="693px" height="301px" justify_content="space-between">
                    <Button width="228px" height="100px" align_items="flex-start" justify_content="center" background_color="blue2">
                        <Img width="30px" margin="0 10px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/storeBlueIcon.png`}/>
                        <P font_size="m" font_weight="regular" color="blue4">상점</P>
                    </Button>
                    <Button width="228px" height="100px" align_items="flex-start" justify_content="center" background_color="blue2">
                        <Img width="30px" margin="0 10px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartBlueIcon.png`}/>
                        <P font_size="m" font_weight="regular" color="blue4">찜목록</P>
                    </Button>
                    <Button width="228px" height="100px" align_items="flex-start" justify_content="center" background_color="blue2">
                        <Img width="30px" margin="0 10px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/myItemBlueIcon.png`}/>
                        <P font_size="m" font_weight="regular" color="blue4">내 아이템</P>
                    </Button>
                </Div>
            </Div>
        </React.Fragment>
    )
}

export default Item