// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled from "styled-components"

//  ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import style =====
import {H1} from "../styles/H1"
import {Img} from "../styles/Img"
import {Div, AbsoluteDiv} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P} from "../styles/P"

// ===== import style fun =====
import {color} from "../styles/style"
import { fontWeight } from "../styles/style"
import { fontSize } from "../styles/style"

// ===== style =====
const SignUpPageBtn = styled(Button)`
    font-size: ${fontSize("xxxs")}; 
    ${fontWeight("light")};
    color: ${color("blue3")};
    background-color: ${color("grayscale1")};
    border: 1px solid ${color("blue3")};

    &:hover{
        background-color: ${color("blue3")};
        color: ${color("grayscale1")};
    }
`

//  ===== component =====

const Home = () =>{
    const setPageState = useSetRecoilState(whichPageState)

    // const loginMenuBtnEvent = (e)=>{
    //     const target = e.target.id

    //     switch(target){
    //         case "idfind_btn":
    //             setPageState("idFind")
    //             break
    //         case "pwfind_btn":
    //             setPageState("pwFind")
    //             break
    //         case "signup_btn":
    //             setPageState("signUp")
    //             break
    //     }

    // }
    return(
        <React.Fragment>
            <Div width = "50%" max_width="693px" height="301px" flex_direction="column">
            <Div  width = "100%">
                <Div width="45%" height="204px">

                </Div>
                <Div width="45%" height="204px">
                    
                </Div>
            </Div>
            <Div  width = "100%" max_width="693px" height="301px">
                <H1 font_size="m" color="blue4" font_weight="regular">
                    나의 프로필
                </H1>
                <Div width="30%" height="30%" border="50%" background_color="grayscale3">

                </Div>
                <Div width="100%" height="254px" border_radius="3px" background_color="grayscale2">
                    
                </Div>
            </Div>
            <Div width = "100%"  max_width="693px" height="301px">
                <Button width="45%" height="204px">

                </Button>
                <Button width="45%" height="204px">
                    
                </Button>
            </Div>
            </Div>
        </React.Fragment>
    )
}

export default Home