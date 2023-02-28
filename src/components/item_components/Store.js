// ===== import base =====
import React from "react"
import {useEffect}  from "react"
import {useRecoilState} from "recoil"
import styled , {css}from "styled-components"

// ===== import component =====
import ItemUnit from "./ItemUnit"

//  ===== import recoil =====
import { storeDataState } from "../../recoil/DataState"

//  ===== component =====
const Store = () =>{

    const storeItemData=[
        {   "item_id":"0",
            "item_name":"Dummy0",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`,
            "item_price":"01",
        },
        {   "item_id":"1",
            "item_name":"Dummy1",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "item_price":"12",
        },
        {   "item_id":"2",
            "item_name":"Dummy2",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`,
            "item_price":"13",
        },
        {   "item_id":"3",
            "item_name":"Dummy3",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`,
            "item_price":"14",
        },
        {   "item_id":"4",
            "item_name":"Dummy4",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`,
            "item_price":"11",
        },
        {   "item_id":"5",
            "item_name":"Dummy5",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "item_price":"11",
        },
        {   "item_id":"6",
            "item_name":"Dummy6",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`,
            "item_price":"11",
        }
    ]

    // ===== recoil state =====
    const [storeData,setStoreData]=useRecoilState(storeDataState)

    useEffect(() => {
        setStoreData(storeItemData)
    },[])

    return(
        <React.Fragment>
            {
                storeData && storeData.map((data, index)=>{
                return <ItemUnit key={data} index={index}/>
                })
            } 
        </React.Fragment>
    )
}

export default Store