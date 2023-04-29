// ===== import base =====
import React, { useEffect } from "react"
import {useRecoilValue, useSetRecoilState,useResetRecoilState} from "recoil"
import styled from "styled-components"
import { Navigate, useNavigate } from "react-router"

// ===== import component =====
import ItemContainer from "../components/item_components/ItemContainer"
import TabBtn from "../components/TabBtn"


//  ===== import recoil =====
import { whichItemComponentState , isItemDetailOpenState} from "../recoil/ComponentState"
import { isTabOpenState ,isClickUnitState} from "../recoil/ComponentState"
import { isLoginState } from "../recoil/DomainState"

// ===== import hook =====
import {PC, Mobile} from "../hooks/useMediaComponent"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"


// ===== style =====
const ItemDiv = styled(Div)`
    position :relative;
`
const ItemContainerPcDiv = styled(Div)`
    gap: 30px;
    flex-wrap: wrap;
`
const ItemContainerDiv = styled(Div)`
    overflow-y : scroll;
`

const ItemContainerMobileDiv = styled(Div)`
    gap: 10px;
    flex-wrap: wrap;
    overflow-y : scroll;
`
//  ===== component =====
const Item = () =>{
    const navigate = useNavigate()
    // ===== recoil state =====
    const setItemDetailOpenState=useSetRecoilState(isItemDetailOpenState)
    const setItemComponentState=useSetRecoilState(whichItemComponentState)
    const resetItemComponentState = useResetRecoilState(whichItemComponentState)
    const resetItemDetailOpen = useResetRecoilState(isItemDetailOpenState)
    const setTabOpenState=useSetRecoilState(isTabOpenState)
    const resetTabOpenState = useResetRecoilState(isTabOpenState)
    const setClickUnitState=useSetRecoilState(isClickUnitState)
    const isLogin = useRecoilValue(isLoginState)
    // ===== hook =====
    useEffect(()=>{
        resetTabOpenState()
        resetItemComponentState()
        resetItemDetailOpen()
    })
    // 비정상접근 막기
    useEffect( ()=>{
        if(!isLogin){
            alert("로그인 후 이용 가능합니다")
            navigate('/')
        }
    },[])

    // ===== event =====
    const itemTabBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "tab1":
                setItemComponentState("store")
                setItemDetailOpenState(false)
                setTabOpenState("tab1")
                setClickUnitState(null)
                break
            case "tab2":
                setItemComponentState("dibsOn")
                setItemDetailOpenState(false)
                setTabOpenState("tab2")
                setClickUnitState(null)
                break
            case "tab3":
                setItemComponentState("myItem")
                setItemDetailOpenState(false)
                setTabOpenState("tab3")
                setClickUnitState(null)
                break
        }

    }
    return(
        <React.Fragment>
            <ItemDiv width="100%" height="100%">
                    <PC>
                        <Div width="750px" height="95%" align_items="flex-start" flex_direction="column" margin="30px 0 0 0">
                            <H1 font_size="xl" color="grayscale7">
                                아이템
                            </H1>
                            <Div width="750px"  height="62px" justify_content="space-between" margin="25px 0 0 0" onChange={itemTabBtnEvent}>
                                <TabBtn id="tab1" after_img="/img_srcs/icons/storeBlueIcon.png" before_img="/img_srcs/icons/storeGrayIcon.png" txt="상점" width="33%"/>
                                <TabBtn id="tab2" after_img="/img_srcs/icons/heartBlueIcon.png" before_img="/img_srcs/icons/heartGrayIcon.png" txt="찜목록" width="33%"/>
                                <TabBtn id="tab3" after_img="/img_srcs/icons/myItemBlueIcon.png" before_img="/img_srcs/icons/myItemGrayIcon.png" txt="내 아이템" width="33%"/>
                            </Div>
                            <ItemContainerDiv align_items="flex-start" width="100%" height="100%" border_radius="0 0 3px 3px" background_color="blue2" padding="20px 0 20px 0">
                                <ItemContainerPcDiv width="100%" justify_content="flex-start" margin="0px 0 20px 80px">
                                    <ItemContainer/>
                                </ItemContainerPcDiv>
                            </ItemContainerDiv>
                        </Div>
                    </PC>
                    <Mobile>
                        <Div width="440px" height="800px"  align_items="flex-start" flex_direction="column">
                            <H1 font_size="l" color="grayscale7" margin="0 0 10px 0">
                                아이템
                            </H1>
                            <ItemContainerMobileDiv width="440px" height="100%" border_radius="10px 10px 10px 10px" background_color="blue2" padding="20px 0 20px 0">
                                <ItemContainer/>
                            </ItemContainerMobileDiv>
                            <Div width="440px"  height="62px" justify_content="space-between" margin="25px 0 0 0" onChange={itemTabBtnEvent}>
                                <TabBtn id="tab1" after_img="/img_srcs/icons/storeBlueIcon.png" before_img="/img_srcs/icons/storeGrayIcon.png" txt="상점" width="31%"/>
                                <TabBtn id="tab2" after_img="/img_srcs/icons/heartBlueIcon.png" before_img="/img_srcs/icons/heartGrayIcon.png" txt="찜목록" width="31%"/>
                                <TabBtn id="tab3" after_img="/img_srcs/icons/myItemBlueIcon.png" before_img="/img_srcs/icons/myItemGrayIcon.png" txt="내 아이템" width="31%"/>
                            </Div>
                        </Div>
                    </Mobile>
            </ItemDiv>
        </React.Fragment>
    )
}

export default Item