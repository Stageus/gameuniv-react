// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====
import { isModalOpenState, whichModalState } from "../../recoil/ModalState"
import { whichItemComponentState, isClickUnitState, isItemDetailOpenState} from "../../recoil/ComponentState"
import { itemIndexDataState} from "../../recoil/DataState"

// ===== import style =====
import { Img, NoneEventImg } from "../../styles/Img"
import { Div , ShadowDiv} from "../../styles/Div"
import { Button } from "../../styles/Button"
import { H1 } from "../../styles/H1"

// ===== import hook =====
import {PC, Mobile} from "../../hooks/useMediaComponent"

// ===== style =====
const Overlay = styled(Div)`
    position:fixed;
    z-index:98;
    background-color: rgba(0,0,0,0.1);
    top:0;
    right:0;
    bottom: 0;
    left:0;
`
const ItemShowDetailPcDiv = styled(ShadowDiv)`
    position :absolute;
    right : 58%;
    top : 20%;
`
const ItemShowDetailMobileDiv = styled(ShadowDiv)`
    position :absolute;
    right : 58%;
    top : 20%;
`

//  ===== component =====
const ItemShowDetail = (props) =>{
    //===== props =====
    const {item_data}=props
    // ===== recoil state =====
    const setModalOpen = useSetRecoilState(isModalOpenState)
    const setModalState = useSetRecoilState(whichModalState)
    const setItemDetailOpenStateState = useSetRecoilState(isItemDetailOpenState)
    const setClickUnitState=useSetRecoilState(isClickUnitState)
    const itemIndexData= useRecoilValue(itemIndexDataState)
    const whichItemComponent= useRecoilValue(whichItemComponentState)
    
    // ===== event =====
    const itemShowDetailBtnEvent = (e)=>{

        const target = e.target.id

        switch(target){
            case "purchase_btn":
                setModalOpen(true)
                setModalState("itemPurchaseModal")
                break
            case "close_btn":
                setItemDetailOpenStateState(false)
                setClickUnitState(null)
                break
            case "equip_btn":
                setModalOpen(true)
                setModalState("itemEquipModal")
                break
        }

    }

    return(
        <React.Fragment>
            <PC>
                <ItemShowDetailPcDiv width="600px" height="800px" background_color="grayscale1" flex_direction="column" justify_content="space-evenly"  border_radius="3px">
                    <H1 color="grayscale7" font_size="xxl" font_weight="regular">{item_data[itemIndexData].item_id}</H1>
                    <Div width="80%" height="70%" background_color="grayscale4" justify_content="space-evenly">
                        <Img width="60%" src={item_data[itemIndexData].item_img}/>
                    </Div>
                    <Div width="40%" height="100px" justify_content="space-evenly" onClick={itemShowDetailBtnEvent}>
                        {
                        whichItemComponent === "myItem"
                        ?
                        <Button id="equip_btn" width="140px" height="60px" font_size="l" font_weight="regular">
                            착용
                        </Button>
                        :
                        <React.Fragment>
                            <Button id="purchase_btn" width="140px" height="60px" font_size="l" font_weight="regular">
                                구매
                            </Button>
                            <Button id="close_btn" width="60px" height="60px" font_size="xs" font_weight="light" btn_type="red">
                                <NoneEventImg width="30px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/crossWhiteIcon.png`}/>
                            </Button>
                        </React.Fragment>
                        }
                    </Div>
                </ItemShowDetailPcDiv>
            </PC>
            <Mobile>
                <Overlay id="overlay">
                    <ShadowDiv width="420px" height="600px" background_color="grayscale1" flex_direction="column" justify_content="space-evenly"  border_radius="3px">
                        <H1 color="grayscale7" font_size="xxl" font_weight="regular">{item_data[itemIndexData].item_id}</H1>
                        <Div width="80%" height="70%" background_color="grayscale4" justify_content="space-evenly">
                            <Img width="60%" src={item_data[itemIndexData].item_img}/>
                        </Div>
                        <Div width="60%" height="100px" justify_content="space-evenly" onClick={itemShowDetailBtnEvent}>
                            {
                            whichItemComponent === "myItem"
                            ?
                            <Button id="equip_btn" width="140px" height="60px" font_size="l" font_weight="regular">
                                착용
                            </Button>
                            :
                            <React.Fragment>
                                <Button id="purchase_btn" width="140px" height="60px" font_size="l" font_weight="regular">
                                    구매
                                </Button>
                                <Button id="close_btn" width="60px" height="60px" font_size="xs" font_weight="light" btn_type="red">
                                    <NoneEventImg width="30px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/crossWhiteIcon.png`}/>
                                </Button>
                            </React.Fragment>
                            }
                        </Div>
                    </ShadowDiv>
                </Overlay>
            </Mobile>
        </React.Fragment>
    )
}

export default ItemShowDetail
