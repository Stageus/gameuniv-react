// ===== import base =====
import React from "react"
import {useSetRecoilState} from "recoil"
import styled , {css}from "styled-components"

// ===== import component =====
import ItemContainer from "../components/item_components/ItemContainer"
import TabBtn from "../components/TabBtn"


//  ===== import recoil =====
import { whichItemComponentState } from "../recoil/ComponentState"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"

// ===== style =====
const ItemContainerDiv = styled(Div)`
    grid-gap: 30px;
    flex-wrap: wrap;
    overflow-y : scroll;
`

//  ===== component =====
const Item = () =>{
    //===== state =====
    const [isItemShowDetailOpenComponent, setItemShowDetailOpenComponentState] = React.useState(false)
    const [isTabOpen, setTabOpenState] = React.useState("tab1")
    // ===== recoil state =====
    const setItemComponentState=useSetRecoilState(whichItemComponentState)
    // ===== event =====
    const itemTabBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "tab1":
                setItemComponentState("store")
                setItemShowDetailOpenComponentState(false)
                setTabOpenState("tab1")
                break
            case "tab2":
                setItemComponentState("dibsOn")
                setItemShowDetailOpenComponentState(false)
                setTabOpenState("tab2")
                break
            case "tab3":
                setItemComponentState("myItem")
                setItemShowDetailOpenComponentState(false)
                setTabOpenState("tab3")
                break
        }

    }
    return(
        <React.Fragment>
            <Div width = "100%" max_width="100%" height="85%" justify_content="center" >
                <Div width="75%" height="100%" align_items="flex-start"  flex_direction="column">
                    <H1 font_size="xl" color="grayscale7">
                        아이템
                    </H1>
                    <Div width="100%"  height="62px" justify_content="space-between" margin="25px 0 0 0" onChange={itemTabBtnEvent}>
                        <TabBtn id="tab1" after_img="/img_srcs/icons/storeBlueIcon.png" before_img="/img_srcs/icons/storeGrayIcon.png" txt="상점" width="240px" isTabOpen={isTabOpen}/>
                        <TabBtn id="tab2" after_img="/img_srcs/icons/heartBlueIcon.png" before_img="/img_srcs/icons/heartGrayIcon.png" txt="찜목록" width="240px" isTabOpen={isTabOpen}/>
                        <TabBtn id="tab3" after_img="/img_srcs/icons/myItemBlueIcon.png" before_img="/img_srcs/icons/myItemGrayIcon.png" txt="내 아이템" width="240px" isTabOpen={isTabOpen}/>
                    </Div>
                    <ItemContainerDiv width="100%" height="100%" border_radius="0 0 3px 3px" background_color="blue2" padding="20px 0 20px 0">
                        <ItemContainer isItemShowDetailOpenComponent={isItemShowDetailOpenComponent} setItemShowDetailOpenComponentState={setItemShowDetailOpenComponentState}/>
                    </ItemContainerDiv>
                </Div>
            </Div>
        </React.Fragment>
    )
}

export default Item