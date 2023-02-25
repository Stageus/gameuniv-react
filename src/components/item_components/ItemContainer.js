// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled , {css}from "styled-components"

// ===== import component =====
import Store from "./Store"
import DibsOn from "./DibsOn"
import MyItem from "./MyItem"

//  ===== import recoil =====
import { whichItemComponentState } from "../../recoil/ComponentState"

//  ===== component =====
const ItemContainer = () =>{
    // ===== recoil state =====
    const whichItemComponent= useRecoilValue(whichItemComponentState)

    return(
        <React.Fragment>
            {whichItemComponent === "store" && <Store/>}
            {whichItemComponent ==="dibsOn" && <DibsOn/>}
            {whichItemComponent ==="myItem" && <MyItem/>}
        </React.Fragment>
    )
}

export default ItemContainer