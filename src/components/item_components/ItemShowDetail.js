// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====
import { isModalOpenState, whichModalState } from "../../recoil/ModalState"
import { isItemShowDetailOpenComponentState,whichItemComponentState } from "../../recoil/ComponentState"
import { storeDataState, dibsOnDataState, myItemDataState, itemIndexDataState} from "../../recoil/DataState"

// ===== import style =====
import { Img, NoneEventImg } from "../../styles/Img"
import { Div } from "../../styles/Div"
import { Button } from "../../styles/Button"
import { H1 } from "../../styles/H1"

// ===== style =====

const ItemShowDetailDiv = styled(Div)`
    position :absolute;
    right : 59%;
    top : 20%;
`

//  ===== component =====
const ItemShowDetail = () =>{

    // ===== var =====
    let item_data
    // ===== recoil state =====
    const setItemShowDetailOpenComponentState = useSetRecoilState(isItemShowDetailOpenComponentState)
    const setModalOpen = useSetRecoilState(isModalOpenState)
    const setModalState = useSetRecoilState(whichModalState)
    const whichItemComponent= useRecoilValue(whichItemComponentState)
    const storeData=useRecoilValue(storeDataState)
    const dibsOnData=useRecoilValue(dibsOnDataState)
    const myItemData=useRecoilValue(myItemDataState)
    const itemIndexData= useRecoilValue(itemIndexDataState)
     
    if(whichItemComponent==="store"){
        item_data = storeData
    }else if(whichItemComponent==="dibsOn"){
        item_data = dibsOnData
    }else if(whichItemComponent==="myItem"){
        item_data = myItemData
    }

    // ===== event =====
    const itemShowDetailBtnEvent = (e)=>{

        const target = e.target.id

        switch(target){
            case "purchase_btn":
                setModalOpen(true)
                setModalState("itemPurchaseModal")
                break
            case "close_btn":
                setItemShowDetailOpenComponentState(false)
                break
        }

    }

    return(
        <React.Fragment>
                <ItemShowDetailDiv width="30%" height="65%" background_color="grayscale2" flex_direction="column" justify_content="space-evenly"  border_radius="3px">
                    <H1 color="grayscale7" font_size="xxl" font_weight="regular">{item_data[itemIndexData].item_id}</H1>
                    <Div width="80%" height="70%" background_color="grayscale4" justify_content="space-evenly">
                        <Img width="60%" src={item_data[itemIndexData].item_img}/>
                    </Div>
                    <Div width="40%" height="100px" justify_content="space-evenly" onClick={itemShowDetailBtnEvent}>
                        <Button id="purchase_btn" width="140px" height="60px" font_size="l" font_weight="regular">
                            구매
                        </Button>
                        <Button id="close_btn" width="60px" height="60px" font_size="xs" font_weight="light" btn_type="red">
                            <NoneEventImg width="30px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/crossWhiteIcon.png`}/>
                        </Button>
                    </Div>
                </ItemShowDetailDiv>
        </React.Fragment>
    )
}

export default ItemShowDetail
