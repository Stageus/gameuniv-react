// ===== import base =====
import React from "react"
import styled from "styled-components"
import { useRecoilValue } from "recoil"

// ===== import page =====
import Login from "../pages/Login"
import Find from "../pages/Find"
import SignUp from "../pages/SignUp"
import Home from "../pages/Home"
import Achivement from "../pages/Achivement"
import Item from "../pages/Item"
import Game2048 from "../pages/Game2048"

// ===== import component =====
import Bg from "./Bg"
import Ranking from "./Ranking"
import Modal from "./Modal"

// ===== import recoil =====
import { whichPageState } from "../../src/recoil/PageState"

// ===== import style =====
import { Div } from "../styles/Div"
import { Img, ImgBtn } from "../styles/Img"

// ===== style =====
const BackIcon = styled(ImgBtn)`
    position: fixed;
    top: 90%;
    left: 2%;
    width: 48px;

    &:hover{
        opacity: 1;
        transition: 0.5s;
    }
    &:not(:hover){
        opacity: 0;
        transition: 0.5s;
    }

`
const BackIconBeforeBtn = styled(ImgBtn)`
    position:fixed;
    top: 90%;
    left: 2%;
    width: 48px;
    &:hover{
        opacity: 0;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`

//  ===== component =====

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Main = () =>{
    // ===== recoil state =====
    const whichPage = useRecoilValue(whichPageState)

    return(
        <main>
            {/* <Modal></Modal> */}
            {
                (whichPage !=="2048")
                ?
                <Div width="100%">
                    {/* 아마 랭킹 컴포넌트 자리 */}
                    <Div width="50%">
                        {
                            (whichPage === "logIn" || whichPage==="home")
                            &&
                            <Div width="100%"flex_direction="column" height="100vh" >
                                <Ranking game="tetris"/>
                                <Ranking game="2048"/>
                            </Div>
                        }
                        
                        <Div>
                            <BackIconBeforeBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/backBeforeBtnImg.png`} />
                            <BackIcon src={`${process.env.PUBLIC_URL}/img_srcs/btns/backAfterBtnImg.png`} />
                        </Div>
                        
                    </Div>
                    {/* 아마 따로 분리해야할 듯 */}
                    <Div flex_direction = "column" width = "50%" height="100vh">
                        {whichPage === "logIn" && <Login></Login> }
                        {(whichPage === "idFind" || whichPage === "pwFind") && <Find></Find>}
                        {whichPage === "signUp" && <SignUp></SignUp>}
                        {whichPage ==="home" && <Home/>}
                        {whichPage ==="item" && <Item/>}
                        {whichPage ==="achivement" && <Achivement/>}
                        
                    </Div>
                    
                </Div>
                :
                <Div height="100vh" width="100%">
                    <Game2048/>
                </Div>
                
            }
                
                

                <Bg></Bg>
        </main>
    )
}

export default Main