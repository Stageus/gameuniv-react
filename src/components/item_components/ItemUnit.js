// ===== import base =====
import React from "react"
import {useSetRecoilState} from "recoil"

// ===== import style =====
import {H1} from "../../styles/H1"
import {Div, ShadowDiv} from "../../styles/Div"
import {Img} from "../../styles/Img"
import {P} from "../../styles/P"

//  ===== component =====
const ItemUnit = () =>{
    
    return(
        <ShadowDiv width = "285px" height="200px"  flex_direction="column" justify_content="space-around" background_color="grayscale1" border_radius="10px">
            <Div width = "87%" align_items="flex-end" justify_content="space-between">
                <H1 font_size="l" color="grayscale7" font_weight="regular">{11111111}</H1>
                <Img width="45px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartBeforeIcon.png`}/>
            </Div>
            <Div width = "88%"  align_items="flex-end" justify_content="space-between">
                <Img width="100px" margin="0 0 10px 15px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`}/>
                <Div width="80px" height="30px" border="4px solid gray" border_radius="10px" align_items="center" justify_content="space-around">
                    <Img width="25px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`}/>
                    <P font_weight="regular">{11}</P>
                </Div>
            </Div>
        </ShadowDiv>
    )
}

export default ItemUnit