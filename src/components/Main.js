// ===== import base =====
import React from "react"
import styled from "styled-components"
import { useRecoilValue } from "recoil"

// ===== import component =====
import Login from "../pages/loginPage/Login"
import Find from "../pages/findPage/Find"
import SignUp from "../pages/signUpPage/SignUp"
import Home from "../pages/Home"
import Bg from "./Bg"

// ===== import recoil =====
import { whichPageState } from "../../src/recoil/PageState"

// ===== import style =====
import { Div } from "../styles/Div"
import { Img } from "../styles/Img"


// ===== style =====
const BackIcon = styled(Img)`
    position: fixed;
    top: 90%;
    left: 2%;
    width: 64px;
`

//  ===== component =====

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Main = () =>{
    // ===== recoil state =====
    const whichPage = useRecoilValue(whichPageState)

    console.log(whichPage)
    return(
        <main>
                <Div>
                    {/* 아마 랭킹 컴포넌트 자리 */}
                    {/* <Div width="50%">
                        Ranking
                        <BackIcon src={`${process.env.PUBLIC_URL}/imgsrc/icons/backBlueIcon.png`} />
                    </Div> */}
                    {/* 아마 따로 분리해야할 듯 */}
                    <Div flex_direction = "column" width = "50%" height="100vh">
                        <Home/>
                        {/* {whichPage === "logIn" && <Login></Login> }
                        {(whichPage === "idFind" || whichPage === "pwFind") && <Find></Find>}
                        {whichPage === "signUp" && <SignUp></SignUp>} */}
                    </Div>
                </Div>
                <Bg></Bg>
        </main>
    )
}

export default Main