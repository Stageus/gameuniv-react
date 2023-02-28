// ===== import base =====
import React from "react"
import {useSetRecoilState} from "recoil"
import styled , {css}from "styled-components"

// ===== import component =====
import ItemContainer from "../components/item_components/ItemContainer"
import TabBtn from "../components/TabBtn"


//  ===== import recoil =====
import { whichItemComponentState, isItemShowDetailOpenComponentState } from "../recoil/ComponentState"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"

// ===== style =====
const ItemDiv = styled(Div)`
    position :relative;
`
const ItemContainerDiv = styled(Div)`
    grid-gap: 20px;
    flex-wrap: wrap;
    overflow-y : scroll;
`

//  ===== component =====
const Item = () =>{
    // ===== recoil state =====
    const setItemComponentState=useSetRecoilState(whichItemComponentState)
    const setItemShowDetailOpenComponentState = useSetRecoilState(isItemShowDetailOpenComponentState)
    // ===== event =====
    const itemTabBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "tab1":
                setItemComponentState("store")
                setItemShowDetailOpenComponentState(false)
                break
            case "tab2":
                setItemComponentState("dibsOn")
                setItemShowDetailOpenComponentState(false)
                break
            case "tab3":
                setItemComponentState("myItem")
                setItemShowDetailOpenComponentState(false)
                break
        }

    }
    return(
        <React.Fragment>
            <Div width = "100%" max_width="800px" height="85%" align_items="flex-start"  flex_direction="column">
                <H1 font_size="xl" color="grayscale7">
                    아이템
                </H1>

                <Div width="100%"  max_width="693px" height="62px" justify_content="space-between" margin="25px 0 0 0" onChange={itemTabBtnEvent}>
                    <TabBtn id="tab1" after_img="/img_srcs/icons/storeBlueIcon.png" before_img="/img_srcs/icons/storeGrayIcon.png" txt="상점" width="228px"/>
                    <TabBtn id="tab2" after_img="/img_srcs/icons/heartBlueIcon.png" before_img="/img_srcs/icons/heartGrayIcon.png" txt="찜목록" width="228px"/>
                    <TabBtn id="tab3" after_img="/img_srcs/icons/myItemBlueIcon.png" before_img="/img_srcs/icons/myItemGrayIcon.png" txt="내 아이템" width="228px"/>
                </Div>

                <ItemContainerDiv width="100%" max_width="693px" height="100%" border_radius="0 0 3px 3px" background_color="blue2" padding="20px 0 20px 0">
                    <ItemContainer/>
                </ItemContainerDiv>
            </Div>
        </React.Fragment>
    )
}

export default Item