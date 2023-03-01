// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled , {css}from "styled-components"

// ===== import style =====
import {Img} from "../styles/Img"
import {Div} from "../styles/Div"
import {P} from "../styles/P"

// ===== style =====
const InputRadio = styled.input`
    display : none;
`
//  ===== component =====
const TabBtn = (props) =>{
    // ===== props =====
    const {id, before_img, after_img, txt , width, isTabOpen} = props
    
    return(
        <React.Fragment>
            <InputRadio id={id} type="radio" name="tab"/>
            <label for={id}> 
                <Div width={width} height="62px" align_items="center" border_radius="3px 3px 0 0" justify_content="center" background_color={isTabOpen===id ? "blue2": "grayscale3"}>
                        <Img  width="30px" margin="0 10px" src={isTabOpen===id ? `${process.env.PUBLIC_URL}${after_img} `:` ${process.env.PUBLIC_URL}${before_img}`}/>
                        <P font_size="m" font_weight="regular" color={isTabOpen===id ? "blue4" : "grayscale6"}>{txt}</P>
                </Div>
            </label>     
        </React.Fragment>
    )
}

export default TabBtn