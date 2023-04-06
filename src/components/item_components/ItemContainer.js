// ===== import base =====
import React, {useEffect} from "react"
import {useRecoilValue, useRecoilState,useSetRecoilState} from "recoil"

// ===== import cookies =====
import { useCookies, setCookie } from "react-cookie"

// ===== import component =====
import ItemUnit from "./ItemUnit"


//  ===== import recoil =====
import { isModalOpenState, whichModalState } from "../../recoil/ModalState"
import { whichItemComponentState} from "../../recoil/ComponentState"
import { domainAddressState} from "../../recoil/DomainState"
import { myItemDataState, storeDataState, dibsOnDataState,skin2048State, skinTetrisState } from "../../recoil/DataState"

// ===== import style =====
import { Div } from "../../styles/Div"
import { Button } from "../../styles/Button"
import { H1 } from "../../styles/H1"
import { P, NoneEventP } from "../../styles/P"

//  ===== component =====
const ItemContainer = () =>{

    // ===== recoil state =====
    const setModalOpen = useSetRecoilState(isModalOpenState)
    const setModalState = useSetRecoilState(whichModalState)
    const whichItemComponent= useRecoilValue(whichItemComponentState)
    const address= useRecoilValue(domainAddressState)
    const [storeData,setStoreData]=useRecoilState(storeDataState)
    const [dibsOnData,setDibsOnData]=useRecoilState(dibsOnDataState)
    const [myItemData,setMyItemData]=useRecoilState(myItemDataState)
    const setSkin2048 = useSetRecoilState(skin2048State)
    const setSkinTetris = useSetRecoilState(skinTetrisState)

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

    const equipBasicSkinBtnEvent = (e)=>{

        const target = e.target.id

        switch(target){
            case "basic_tetris_btn":
                setModalOpen(true)
                setModalState("itemEquipModal")
                setSkinTetris(-1)
            break
            case "basic_2048_btn":
                setModalOpen(true)
                setModalState("itemEquipModal")
                setSkin2048(-2)
            break
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
                    <React.Fragment>
                    <Div width="70%" justify_content="space-around" margin="0 0 0 68px" onClick={equipBasicSkinBtnEvent}>
                        <Button id="basic_tetris_btn" width="220px" height="50px">
                            <NoneEventP font_size="s" font_weight="regular" color="grayscale1" >테트리스 기본 스킨 착용</NoneEventP>
                        </Button>
                        <Button id="basic_2048_btn" width="220px" height="50px">
                            <NoneEventP font_size="s" font_weight="regular" color="grayscale1" >2048 기본 스킨 착용</NoneEventP>
                        </Button>
                    </Div>
                    {
                        myItemData && myItemData.map((data, idx)=>{
                            return <ItemUnit key={data} idx={idx}/>
                            })

                    }
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}

export default ItemContainer