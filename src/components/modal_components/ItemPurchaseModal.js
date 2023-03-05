// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====
import { whichItemComponentState ,isItemDetailOpenState, isClickUnitState} from "../../recoil/ComponentState"
import { isModalOpenState} from "../../recoil/ModalState"
import { storeDataState, dibsOnDataState, myItemDataState, itemIndexDataState} from "../../recoil/DataState"

// ===== import style =====
import { Img, ImgBtn } from "../../styles/Img"
import { Div } from "../../styles/Div"
import { H1 } from "../../styles/H1"
import { P } from "../../styles/P"
import { Button } from "../../styles/Button"

//  ===== component =====

const ItemPurchaseModal = () =>{

    // ===== var =====
    let item_data
    // ===== recoil state =====
    const whichItemComponent= useRecoilValue(whichItemComponentState)
    const storeData=useRecoilValue(storeDataState)
    const dibsOnData=useRecoilValue(dibsOnDataState)
    const myItemData=useRecoilValue(myItemDataState)
    const itemIndexData= useRecoilValue(itemIndexDataState)
    const setModalOpen = useSetRecoilState(isModalOpenState)
    const setItemDetailOpenStateState = useSetRecoilState(isItemDetailOpenState)
    const setClickUnitState = useSetRecoilState(isClickUnitState)

    if(whichItemComponent==="store"){
        item_data = storeData
    }else if(whichItemComponent==="dibsOn"){
        item_data = dibsOnData
    }else if(whichItemComponent==="myItem"){
        item_data = myItemData
    }
    // ===== event =====
    const purchaseEvent=()=>{
        setItemDetailOpenStateState(false)
        setModalOpen(false)
        setClickUnitState(null)
    }

    return(
        <Div width="420px" height="400px" flex_direction="column" justify_content="space-evenly">
                <H1 font_size="m" color="grayscale7" font_weight="regular" margin="0 0 10px 0">
                    정말 구매하시겠습니까?
                </H1>
                <Img width="150px"  src={item_data[itemIndexData].item_img} />
                <Div width="100px" height="40px" border="4px solid gray" border_radius="10px" align_items="center" justify_content="space-around">
                    <Img width="30px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`}/>
                    <P font_size="s"  font_weight="regular">{item_data[itemIndexData].item_price}</P>
                </Div>
                <Button id="purchase_btn" width="120px" height="50px" font_size="m" font_weight="regular" onClick={purchaseEvent}>
                    구매
                </Button>
        </Div>

    )
}

export default ItemPurchaseModal