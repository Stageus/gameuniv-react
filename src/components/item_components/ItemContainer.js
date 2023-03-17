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
    //===== dynamic data =====
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

    const dibsOnItemData=[
        {   "item_id":"0",
            "item_name":"Dummy0",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`,
            "item_price":"10",
        },
        {   "item_id":"1",
            "item_name":"Dummy1",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "item_price":"132",
        },
        {   "item_id":"2",
            "item_name":"Dummy2",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "item_price":"11",
        },
        {   "item_id":"3",
            "item_name":"Dummy3",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "item_price":"11",
        },
        {   "item_id":"4",
            "item_name":"Dummy4",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "item_price":"112",
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

    const myItemItemData=[
        {   "item_id":"0",
            "item_name":"Dummy2",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "item_price":"19",
        },
        {   "item_id":"1",
            "item_name":"Dummy3",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "item_price":"18",
        },
        {   "item_id":"2",
            "item_name":"Dummy2",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`,
            "item_price":"17",
        },
        {   "item_id":"3",
            "item_name":"Dummy3",
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "item_price":"16",
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
            "item_img":`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`,
            "item_price":"11",
        }
    ]
    // ===== recoil state =====
    const whichItemComponent= useRecoilValue(whichItemComponentState)
    const [storeData,setStoreData]=useRecoilState(storeDataState)
    const [dibsOnData,setDibsOnData]=useRecoilState(dibsOnDataState)
    const [myItemData,setMyItemData]=useRecoilState(myItemDataState)
    // ===== hook =====
    useEffect(() => {
        setStoreData(storeItemData)
        setDibsOnData(dibsOnItemData)
        setMyItemData(myItemItemData)
    },[])

    return(
        <React.Fragment>
            {whichItemComponent === "store" && 
                (
                    storeData && storeData.map((data, index)=>{
                    return <ItemUnit key={data} index={index}/>
                    })
                ) 
            }
            {whichItemComponent ==="dibsOn" && 
                (
                    dibsOnData && dibsOnData.map((data, index)=>{
                    return <ItemUnit key={data} index={index}/>
                    })
                )
            }
            {whichItemComponent ==="myItem" && 
                (
                    myItemData && myItemData.map((data, index)=>{
                    return <ItemUnit key={data} index={index}/>
                    })
                )
            }
        </React.Fragment>
    )
}

export default ItemContainer