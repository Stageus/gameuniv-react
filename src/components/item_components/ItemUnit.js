// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState, useRecoilState} from "recoil"

// ===== import component =====
import ItemShowDetail from "./ItemShowDetail"

//  ===== import recoil =====
import { whichItemComponentState, isItemShowDetailOpenComponentState } from "../../recoil/ComponentState"
import { storeDataState, dibsOnDataState, myItemDataState, itemIndexDataState} from "../../recoil/DataState"

// ===== import style =====
import {H1} from "../../styles/H1"
import {Div, ShadowDiv} from "../../styles/Div"
import {Img} from "../../styles/Img"
import {P} from "../../styles/P"

//  ===== component =====
const ItemUnit = (props) =>{

    const {index}=props

    const whichItemComponent= useRecoilValue(whichItemComponentState)
    const storeData=useRecoilValue(storeDataState)
    const dibsOnData=useRecoilValue(dibsOnDataState)
    const myItemData=useRecoilValue(myItemDataState)
    const setItemIndexData=useSetRecoilState(itemIndexDataState)
    const [isItemShowDetailOpenComponent, setItemShowDetailOpenComponentState] = useRecoilState(isItemShowDetailOpenComponentState)

    let item_data
    
    if(whichItemComponent==="store"){
        item_data = storeData
    }else if(whichItemComponent==="dibsOn"){
        item_data = dibsOnData
    }else if(whichItemComponent==="myItem"){
        item_data = myItemData
    }

    const itemShowDetailEvent=()=>{
        setItemIndexData(index)
        setItemShowDetailOpenComponentState(true)
    }

    
    return(
        <React.Fragment>
            {
                isItemShowDetailOpenComponent === true
                &&
                <ItemShowDetail data={item_data}/>
            }
        <ShadowDiv width = "285px" height="200px"  flex_direction="column" justify_content="space-around" background_color="grayscale1"
        border_radius="10px" onClick={itemShowDetailEvent}>
            <Div width = "87%" align_items="flex-end" justify_content="space-between">
                <H1 font_size="l" color="grayscale7" font_weight="regular">{item_data[index].item_id}</H1>
                <Img width="45px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/heartBeforeIcon.png`}/>
            </Div>
            <Div width = "88%"  align_items="flex-end" justify_content="space-between">
                <Img width="100px" margin="0 0 10px 15px" src={item_data[index].item_img}/>
                <Div width="80px" height="30px" border="4px solid gray" border_radius="10px" align_items="center" justify_content="space-around">
                    <Img width="25px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`}/>
                    <P font_weight="regular">{item_data[index].item_price}</P>
                </Div>
            </Div>
        </ShadowDiv>
        </React.Fragment>
    )
}

export default ItemUnit