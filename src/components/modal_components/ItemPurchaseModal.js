// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState,useRecoilState} from "recoil"

// ===== import recoil =====
import { whichItemComponentState ,isItemDetailOpenState, isClickUnitState} from "../../recoil/ComponentState"
import { isModalOpenState} from "../../recoil/ModalState"
import { storeDataState, dibsOnDataState, myItemDataState, itemIndexDataState} from "../../recoil/DataState"
import { domainAddressState } from "../../recoil/DomainState"

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
    const address = useRecoilValue(domainAddressState)
    const whichItemComponent= useRecoilValue(whichItemComponentState)
    const [storeData,setStoreData]=useRecoilState(storeDataState)
    const [dibsOnData,setDibsOnData]=useRecoilState(dibsOnDataState)
    const [myItemData,setMyItemData]=useRecoilState(myItemDataState)
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
    //구매 스테이트 서버에 보내주기
    const postPurchaseEvent = async(e) =>{

        e.preventDefault()

        console.log(itemIndexData)

        const response = await fetch(`${address}/item/buy`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                itemIdx: item_data[itemIndexData].item_idx
            }),
            credentials: "include"
        })

        const result = await response.json()

        if(result.message){
            alert(result.message)
        }
        else{
            const response_all = await fetch(`${address}/item/all`,
            {
                credentials: "include"
            })
            const result_all = await response_all.json()
    
            const response_pick = await fetch(`${address}/item/pick/all`,
            {
                credentials: "include"
            })
            const result_pick = await response_pick.json()
    
            const response_buy = await fetch(`${address}/item/buy/all`,
            {
                credentials: "include"
            })
            const result_buy = await response_buy.json()
    
            setStoreData(result_all.data)
            setDibsOnData(result_pick.data)
            setMyItemData(result_buy.data)
    
            if(result_all.message){
                alert(result_all.message)
            }if(result_pick.message){
                alert(result_pick.message)
            }if(result_buy.message){
                alert(result_buy.message)
            }

            if(whichItemComponent==="store"){
                item_data = storeData
            }else if(whichItemComponent==="dibsOn"){
                item_data = dibsOnData
            }else if(whichItemComponent==="myItem"){
                item_data = myItemData
            }
            setItemDetailOpenStateState(false)
            setModalOpen(false)
            setClickUnitState(null)
        }  
        
    }

    return(
        <Div width="420px" height="400px" flex_direction="column" justify_content="space-evenly">
                <H1 font_size="m" color="grayscale7" font_weight="regular" margin="0 0 10px 0">
                    정말 구매하시겠습니까?
                </H1>
                <Img width="120px"  src={`${process.env.PUBLIC_URL}/img_srcs/imgs/item_imgs/${item_data[itemIndexData].preview_img}`} />
                <Div width="100px" height="40px" border="4px solid gray" border_radius="10px" align_items="center" justify_content="space-around">
                    <Img width="30px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`}/>
                    <P font_size="s"  font_weight="regular">{item_data[itemIndexData].item_price}</P>
                </Div>
                <Button id="purchase_btn" width="120px" height="50px" font_size="m" font_weight="regular" onClick={postPurchaseEvent}>
                    구매
                </Button>
        </Div>

    )
}

export default ItemPurchaseModal