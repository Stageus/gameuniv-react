// ===== import base =====
import React, {useEffect} from "react"
import {useRecoilValue, useRecoilState,useSetRecoilState} from "recoil"

// ===== import cookies =====
import { useCookies, setCookie } from "react-cookie"

// ===== import component =====
import ItemUnit from "./ItemUnit"


//  ===== import recoil =====
import { whichItemComponentState} from "../../recoil/ComponentState"
import { domainAddressState} from "../../recoil/DomainState"
import { myItemDataState, storeDataState, dibsOnDataState } from "../../recoil/DataState"

//  ===== component =====
const ItemContainer = () =>{

    // ===== recoil state =====
    const whichItemComponent= useRecoilValue(whichItemComponentState)
    const address= useRecoilValue(domainAddressState)
    const [storeData,setStoreData]=useRecoilState(storeDataState)
    const [dibsOnData,setDibsOnData]=useRecoilState(dibsOnDataState)
    const [myItemData,setMyItemData]=useRecoilState(myItemDataState)

    const getItemDataEvent = async() =>{

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
    }

    // ===== hook =====
    useEffect(() => {
        getItemDataEvent()
    },[])

    return(
        <React.Fragment>
            {whichItemComponent === "store" && 
                (
                    storeData && storeData.map((data, idx)=>{
                    return <ItemUnit key={data} idx={idx}/>
                    })
                ) 
            }
            {whichItemComponent ==="dibsOn" && 
                (
                    dibsOnData && dibsOnData.map((data, idx)=>{
                    return <ItemUnit key={data} idx={idx}/>
                    })
                )
            }
            {whichItemComponent ==="myItem" && 
                (
                    myItemData && myItemData.map((data, idx)=>{
                    return <ItemUnit key={data} idx={idx}/>
                    })
                )
            }
        </React.Fragment>
    )
}

export default ItemContainer