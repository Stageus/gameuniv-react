// ===== import base =====
import React, { useEffect } from "react"
import {useRecoilValue, useSetRecoilState, useRecoilState} from "recoil"
import styled from "styled-components"

// ===== import component =====
import ItemShowDetail from "./ItemShowDetail"

//  ===== import recoil =====
import { whichItemComponentState, isClickUnitState, isItemDetailOpenState} from "../../recoil/ComponentState"
import { storeDataState, dibsOnDataState, myItemDataState, itemIndexDataState, extraItemDataArrayState} from "../../recoil/DataState"
import { domainAddressState } from "../../recoil/DomainState"

// ===== import style =====
import {H1} from "../../styles/H1"
import {Div, ShadowDiv} from "../../styles/Div"
import {Img} from "../../styles/Img"
import {P} from "../../styles/P"

// ===== import hook =====
import {PC, Mobile} from "../../hooks/useMediaComponent"

// ===== style =====
const ItemUnitDiv = styled(Div)`
    position : relative;
    cursor :pointer;
`
const LockDiv = styled(Div)`
    position : absolute;
    background-color : rgba(0,0,0,0.5);
`
const UnitHeaderDiv = styled(Div)`
    position : relative;
`
const HeartDiv = styled(Div)`
    position : absolute;
    top : -10px;
    right : 1px;
`

//  ===== component =====
const ItemUnit = (props) =>{
    //===== var =====
    let item_data
    //===== props =====
    const {idx}=props
   
    //===== recoil state =====
    const whichItemComponent= useRecoilValue(whichItemComponentState)
    const address = useRecoilValue(domainAddressState)
    const extraItemDataArray = useRecoilValue(extraItemDataArrayState)
    const [storeData,setStoreData]=useRecoilState(storeDataState)
    const [dibsOnData,setDibsOnData]=useRecoilState(dibsOnDataState)
    const myItemData=useRecoilValue(myItemDataState)
    const setItemIndexData=useSetRecoilState(itemIndexDataState)
    const [isClickUnit, setClickUnitState] = useRecoilState(isClickUnitState)
    const [isItemDetailOpen, setItemDetailOpenStateState] = useRecoilState(isItemDetailOpenState)
    // const [isUnlock, setUnlockState] = React.useState(storeData[idx].unlock_state)
    
    // 조건에 맞는 데이터 세팅
    if(whichItemComponent==="store"){
        item_data = storeData
    }else if(whichItemComponent==="dibsOn"){
        item_data = dibsOnData
    }else if(whichItemComponent==="myItem"){
        item_data = myItemData
    }

    //데이터 해금 데이터 설정
    const unitItemData=extraItemDataArray.filter(data => data[0] == item_data[idx].item_name)
    const isUnlock = unitItemData[0][1]
    const isDibsOn = unitItemData[0][2]
    const isBought = unitItemData[0][3]

    //===== event =====
    const itemShowDetailEvent=()=>{
        setItemIndexData(idx)
        setItemDetailOpenStateState(true)
        setClickUnitState(idx)
        // console.log(dibsOnData[idx].item_idx)
    }
    const dibsOnEvent=(e)=>{
        sendDibsOnStateEvent(e)
        e.stopPropagation()
    }

    //찜 스테이트 서버에 보내주기
    const sendDibsOnStateEvent = async(e) =>{

        e.preventDefault()

        console.log(item_data[idx].item_idx)
        console.log(item_data[idx].item_picked_state)
        console.log(isBought)

        if(isDibsOn){
            const response = await fetch(`${address}/item/pick?item-idx=${item_data[idx].item_idx}`,{
                method: "DELETE",
                credentials: "include"
            })

            const result = await response.json()

            if(result.message){
                alert(result.message)
            }
        }else{
            const response = await fetch(`${address}/item/pick`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    itemIdx: item_data[idx].item_idx
                }),
                credentials: "include"
            })

            const result = await response.json()
            
            if(result.message){
                alert(result.message)
            }
        }

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
        
        setStoreData(result_all.data)
        setDibsOnData(result_pick.data)

        if(whichItemComponent==="store"){
            item_data = storeData
        }else if(whichItemComponent==="dibsOn"){
            item_data = dibsOnData
        }
    }

    return(
        <React.Fragment>
            {
                isItemDetailOpen === true
                &&
                <ItemShowDetail item_data={item_data}/>
            }
            {
            ( isBought === false || whichItemComponent === "myItem" )
            &&
            <React.Fragment>
            <PC>
                <ItemUnitDiv width = "285px" height="200px"  flex_direction="column" justify_content="space-around" background_color={isClickUnit==idx ? "grayscale3" : "grayscale1" }
                border_radius="10px" onClick={(isUnlock === false) ? null : itemShowDetailEvent}>
                    {
                        (isUnlock === false)
                        &&
                        <LockDiv width = "285px" height="200px" border_radius="10px" >
                            <Img width="60px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/lockIcon.png`}/>
                        </LockDiv>  
                    }
                    <UnitHeaderDiv width = "87%" align_items="flex-end" justify_content={whichItemComponent==="myItem" ? "start" : "space-between"}>
                        <H1 font_size="s" color="grayscale7"   font_weight="regular">{item_data[idx].item_name}</H1>
                            <HeartDiv width="60px" height="60px">
                            {
                            whichItemComponent !="myItem" &&
                                (
                                    isDibsOn
                                    ? <Img width="50px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartAfterIcon.png`} onClick={dibsOnEvent}/>
                                    : <Img width="42px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartBeforeIcon.png`} onClick={dibsOnEvent}/>
                                )  
                            }
                            </HeartDiv>
                    </UnitHeaderDiv>
                    <Div width = "88%"  align_items="flex-end" justify_content="space-between">
                        <Img width="70px" margin="0 0 10px 15px" src={`${process.env.PUBLIC_URL}/img_srcs/imgs/item_imgs/${item_data[idx].preview_img}`}/>
                        {
                            whichItemComponent ==="myItem" 
                            ?
                            <Div width="90px" height="40px" border_radius="10px" align_items="center" justify_content="center" background_color="green">
                                <P color="grayscale1" font_weight="regular">Holding</P>
                            </Div>
                            :
                            <Div width="80px" height="30px" border="4px solid gray" border_radius="10px" align_items="center" justify_content="space-around">
                                <Img width="25px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`}/>
                                <P color="grayscale7" font_weight="regular">{item_data[idx].item_price}</P>
                            </Div>
                        }   
                    </Div>
                </ItemUnitDiv>
            </PC>

            <Mobile>
                <ShadowDiv width = "400px" height="150px"  background_color={isClickUnit==idx ? "grayscale3" : "grayscale1" }
                border_radius="10px" onClick={itemShowDetailEvent}>
                    <Div width = "90%" justify_content="space-between" >
                        <Img width="100px" margin="0 0 0 15px" src={`${process.env.PUBLIC_URL}/img_srcs/imgs/item_imgs/${item_data[idx].preview_img}`}/>
                        <Div align_items="flex-end" flex_direction="column" justify_content={whichItemComponent==="myItem" ? "start" : "space-between"}>
                            {
                                whichItemComponent ==="store" &&
                                    (
                                        item_data[idx].item_picked_state
                                        ? <Img width="45px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartAfterIcon.png`} onClick={dibsOnEvent}/>
                                        : <Img width="45px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartBeforeIcon.png`} onClick={dibsOnEvent}/>
                                    )  
                            }
                            <H1 font_size="s" margin="0 0 10px 0" color="grayscale7"  font_weight="regular">{item_data[idx].item_name}</H1>
                            {
                                whichItemComponent ==="myItem" 
                                ?
                                <Div width="90px" height="40px" border_radius="10px" align_items="center" justify_content="center" background_color="green">
                                    <P color="grayscale1" font_weight="regular">Holding</P>
                                </Div>
                                :
                                <Div width="80px" height="30px" border="4px solid gray" border_radius="10px" align_items="center" justify_content="space-around">
                                    <Img width="25px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`}/>
                                    <P color="grayscale7"  font_weight="regular">{item_data[idx].item_price}</P>
                                </Div>
                            }   
                            </Div>
                    </Div>
                </ShadowDiv>
            </Mobile>
            </React.Fragment>
            }
        </React.Fragment>
    )
}

export default ItemUnit