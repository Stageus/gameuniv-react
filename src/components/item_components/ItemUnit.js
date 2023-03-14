// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState, useRecoilState} from "recoil"

// ===== import component =====
import ItemShowDetail from "./ItemShowDetail"

//  ===== import recoil =====
import { whichItemComponentState, isClickUnitState, isItemDetailOpenState} from "../../recoil/ComponentState"
import { storeDataState, dibsOnDataState, myItemDataState, itemIndexDataState} from "../../recoil/DataState"

// ===== import style =====
import {H1} from "../../styles/H1"
import {Div, ShadowDiv} from "../../styles/Div"
import {Img} from "../../styles/Img"
import {P} from "../../styles/P"

// ===== import hook =====
import {PC, Mobile} from "../../hooks/useMediaComponent"

//  ===== component =====
const ItemUnit = (props) =>{
    //===== var =====
    let item_data
    //===== props =====
    const {item_idx}=props
    //===== state =====
    const [isHeartFiled, setHeartFiledState] = React.useState(false)
    //===== recoil state =====
    const whichItemComponent= useRecoilValue(whichItemComponentState)
    const storeData=useRecoilValue(storeDataState)
    const dibsOnData=useRecoilValue(dibsOnDataState)
    const myItemData=useRecoilValue(myItemDataState)
    const setItemIndexData=useSetRecoilState(itemIndexDataState)
    const [isClickUnit, setClickUnitState] = useRecoilState(isClickUnitState)
    const [isItemDetailOpen, setItemDetailOpenStateState] = useRecoilState(isItemDetailOpenState)

    // 조건에 맞는 데이터 세팅
    if(whichItemComponent==="store"){
        item_data = storeData
    }else if(whichItemComponent==="dibsOn"){
        item_data = dibsOnData
    }else if(whichItemComponent==="myItem"){
        item_data = myItemData
    }
    //===== event =====
    const itemShowDetailEvent=()=>{
        setItemIndexData(item_idx)
        setItemDetailOpenStateState(true)
        setClickUnitState(item_idx)
    }
    const dibsOnEvent=(e)=>{
        sendDibsOnStateEvent(e)
        e.stopPropagation()
    }

    //찜 스테이트 서버에 보내주기
    const sendDibsOnStateEvent = async(e) =>{

        e.preventDefault()

        console.log(item_idx)

        if(isHeartFiled){
            const response = await fetch("http://gameuniv.site/item/pick",{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    itemIdx: item_idx
                })
            })

            const result = await response.json()

            if(result.message){
                alert(result.message)
            }
            else{
                setHeartFiledState(false)
            }
        }else{
            const response = await fetch("http://gameuniv.site/item/pick",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    itemIdx: item_idx
                })
            })

            const result = await response.json()

            if(result.message){
                alert(result.message)
            }
            else{
                setHeartFiledState(true)
            }  
        }
    }


    return(
        <React.Fragment>
            {
                isItemDetailOpen === true
                &&
                <ItemShowDetail item_data={item_data}/>
            }
            <PC>
                <ShadowDiv width = "285px" height="200px"  flex_direction="column" justify_content="space-around" background_color={isClickUnit==item_idx ? "blue6" : "grayscale1" }
                border_radius="10px" onClick={itemShowDetailEvent}>
                    <Div width = "87%" align_items="flex-end" justify_content={whichItemComponent==="myItem" ? "start" : "space-between"}>
                        <H1 font_size="s" color={isClickUnit===item_idx ? "grayscale1" : "grayscale7"}  font_weight="regular">{item_data[item_idx].item_name}</H1>
                        {
                        whichItemComponent !="myItem" &&
                            (
                                isHeartFiled
                                ? <Img width="45px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartAfterIcon.png`} onClick={dibsOnEvent}/>
                                : <Img width="45px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartBeforeIcon.png`} onClick={dibsOnEvent}/>
                            )  
                        }
                    </Div>
                    <Div width = "88%"  align_items="flex-end" justify_content="space-between">
                        <Img width="70px" margin="0 0 10px 15px" src={`${process.env.PUBLIC_URL}/img_srcs/imgs/item_imgs/${item_data[item_idx].preview_img}`}/>
                        {
                            whichItemComponent ==="myItem" 
                            ?
                            <Div width="90px" height="40px" border_radius="10px" align_items="center" justify_content="center" background_color="green">
                                <P color="grayscale1" font_weight="regular">Holding</P>
                            </Div>
                            :
                            <Div width="80px" height="30px" border="4px solid gray" border_radius="10px" align_items="center" justify_content="space-around">
                                <Img width="25px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`}/>
                                <P color={isClickUnit===item_idx ? "grayscale1" : "grayscale7"} font_weight="regular">{item_data[item_idx].item_price}</P>
                            </Div>
                        }   
                    </Div>
                </ShadowDiv>
            </PC>

            <Mobile>
                <ShadowDiv width = "400px" height="150px"  background_color={isClickUnit==item_idx ? "blue6" : "grayscale1" }
                border_radius="10px" onClick={itemShowDetailEvent}>
                    <Div width = "90%" justify_content="space-between" >
                        <Img width="100px" margin="0 0 0 15px" src={`${process.env.PUBLIC_URL}/img_srcs/imgs/item_imgs/${item_data[item_idx].preview_img}`}/>
                        <Div align_items="flex-end" flex_direction="column" justify_content={whichItemComponent==="myItem" ? "start" : "space-between"}>
                            {
                                whichItemComponent !="myItem" &&
                                    (
                                        isHeartFiled
                                        ? <Img width="45px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartAfterIcon.png`} onClick={dibsOnEvent}/>
                                        : <Img width="45px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartBeforeIcon.png`} onClick={dibsOnEvent}/>
                                    )  
                            }
                            <H1 font_size="s" margin="0 0 10px 0" color={isClickUnit===item_idx ? "grayscale1" : "grayscale7"}  font_weight="regular">{item_data[item_idx].item_name}</H1>
                            {
                                whichItemComponent ==="myItem" 
                                ?
                                <Div width="90px" height="40px" border_radius="10px" align_items="center" justify_content="center" background_color="green">
                                    <P color="grayscale1" font_weight="regular">Holding</P>
                                </Div>
                                :
                                <Div width="80px" height="30px" border="4px solid gray" border_radius="10px" align_items="center" justify_content="space-around">
                                    <Img width="25px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`}/>
                                    <P color={isClickUnit===item_idx ? "grayscale1" : "grayscale7"} font_weight="regular">{item_data[item_idx].item_price}</P>
                                </Div>
                            }   
                            </Div>
                    </Div>
                </ShadowDiv>
            </Mobile>
        </React.Fragment>
    )
}

export default ItemUnit