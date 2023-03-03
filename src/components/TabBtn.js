// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled , {css}from "styled-components"

// ===== import style =====
import {Img} from "../styles/Img"
import {Div} from "../styles/Div"
import {P} from "../styles/P"

//  ===== import recoil =====
import { isTabOpenState } from "../recoil/ComponentState"

// ===== style =====
const Label = styled.label`
    display : flex;
    align-items :center;
    justify-content :center;
    width: 100%;
    height: 100%;
`

const InputRadio = styled.input`
    display : none;
`
//  ===== component =====
const TabBtn = (props) =>{
    const isTabOpen=useRecoilValue(isTabOpenState)
    // ===== props =====
    const {id, before_img, after_img, txt , width} = props
    
    return(
        <Div width={width}  height="62px" border_radius="3px 3px 0 0"  background_color={isTabOpen===id ? "blue2": "grayscale3"}>
            <InputRadio id={id} type="radio" name="tab"/>
            <Label for={id}>
                <Img height="25px" margin="0 10px" src={isTabOpen===id ? `${process.env.PUBLIC_URL}${after_img} `:` ${process.env.PUBLIC_URL}${before_img}`}/>
                <P font_size="m" font_weight="regular" color={isTabOpen===id ? "blue4" : "grayscale6"}>{txt}</P>
            </Label> 
        </Div>
    )
}

export default TabBtn