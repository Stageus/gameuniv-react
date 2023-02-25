// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled , {css}from "styled-components"

// ===== import style =====
import {Img} from "../styles/Img"
import {Div} from "../styles/Div"
import {P} from "../styles/P"

// ===== import style func =====
import {color} from "../styles/style"

// ===== style =====
const InputRadio = styled.input`
    display : none;
    &:checked + label > div{
        background-color : ${color("blue2")};
    }
    &:checked + label > div > div{
        display : none;
    }
`
const Label = styled.label`
    position:relative;
`
const TabBeforeDiv = styled(Div)`
    position:absolute;
    align_items:center;
    justify_content:center;
`
const TabDiv = styled(Div)`
    &:hover{
        background-color  : ${color("blue2")};
    }
    &:hover > div{
        opacity: 0;
        transition: 0.3s;
    }
`

//  ===== component =====
const TabBtn = (props) =>{
    // ===== props =====
    const {id, before_img, after_img, txt , width} = props
    
    return(
        <React.Fragment>
            <InputRadio id={id} type="radio" name="tab"/>
            <Label for={id}> 
                <TabDiv width={width} height="62px" align_items="center" border_radius="3px 3px 0 0" justify_content="center" background_color="grayscale3">
                    <Img  width="30px" margin="0 10px" src={`${process.env.PUBLIC_URL}${after_img}`}/>
                    <P font_size="m" font_weight="regular" color="blue4">{txt}</P>
                    <TabBeforeDiv>
                        <Img width="30px" margin="0 10px" src={`${process.env.PUBLIC_URL}${before_img}`}/>
                        <P font_size="m" font_weight="regular" color="grayscale6">{txt}</P>
                    </TabBeforeDiv>
                </TabDiv>
            </Label>     
        </React.Fragment>
    )
}

export default TabBtn