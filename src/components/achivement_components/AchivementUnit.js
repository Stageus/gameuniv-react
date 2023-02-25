// ===== import base =====
import React from "react"
import {useSetRecoilState} from "recoil"

// ===== import style =====
import {H1} from "../../styles/H1"
import {Div, ShadowDiv} from "../../styles/Div"
import {Img} from "../../styles/Img"
import {P} from "../../styles/P"

//  ===== component =====
const AchivementUnit = () =>{
    
    return(
        <ShadowDiv width = "285px" height="200px"  flex_direction="column" justify_content="space-around" background_color="grayscale1" border_radius="10px">
            <H1 font_size="l" color="blue4" font_weight="regular">{11111111}</H1>
            <Div width = "60%" align_items="center" justify_content="space-between">
                <Img width="80px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`}/>
                <P font_size="xs" color="grayscale7" font_weight="regular">{11111111}</P>
            </Div>
            <Div width = "88%" flex_direction="column">
                    <P font_size="xxs" font_weight="regular">게임 플레이 횟수</P>
                    <Div width="80px" height="23px" border="3px solid gray" border_radius="20px" align_items="center" justify_content="center">
                        <P font_size="xxs" font_weight="regular">{11}/</P>
                        <P font_size="xxs" font_weight="regular">{11}</P>
                    </Div>
            </Div>
        </ShadowDiv>
    )
}

export default AchivementUnit