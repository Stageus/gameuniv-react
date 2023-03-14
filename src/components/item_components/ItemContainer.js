// ===== import base =====
import React, {useEffect} from "react"
import {useRecoilValue, useRecoilState} from "recoil"

// ===== import component =====
import ItemUnit from "./ItemUnit"

//  ===== import recoil =====
import { whichItemComponentState} from "../../recoil/ComponentState"
import { myItemDataState, storeDataState, dibsOnDataState } from "../../recoil/DataState"

//  ===== component =====
const ItemContainer = () =>{
    
    
    // ===== recoil state =====
    const whichItemComponent= useRecoilValue(whichItemComponentState)
    const [storeData,setStoreData]=useRecoilState(storeDataState)
    const [dibsOnData,setDibsOnData]=useRecoilState(dibsOnDataState)
    const [myItemData,setMyItemData]=useRecoilState(myItemDataState)


    const getItemDataEvent = async() =>{

        const response_all = await fetch(`http://gameuniv.site/item/all`)
        const result_all = await response_all.json()

        const response_pick = await fetch(`http://gameuniv.site/item/pick/all`)
        const result_pick = await response_pick.json()

        const response_buy = await fetch(`http://gameuniv.site/item/buy/all`)
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
    }

    // ===== hook =====
    useEffect(() => {
        getItemDataEvent()
    },[])

    return(
        <React.Fragment>
            {whichItemComponent === "store" && 
                (
                    storeData && storeData.map((data, item_idx)=>{
                    return <ItemUnit key={data} item_idx={item_idx}/>
                    })
                ) 
            }
            {whichItemComponent ==="dibsOn" && 
                (
                    dibsOnData && dibsOnData.map((data, item_idx)=>{
                    return <ItemUnit key={data} item_idx={item_idx}/>
                    })
                )
            }
            {whichItemComponent ==="myItem" && 
                (
                    myItemData && myItemData.map((data, item_idx)=>{
                    return <ItemUnit key={data} item_idx={item_idx}/>
                    })
                )
            }
        </React.Fragment>
    )
}

export default ItemContainer