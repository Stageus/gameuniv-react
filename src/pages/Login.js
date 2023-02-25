// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled from "styled-components"

//  ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import style =====
import {Img} from "../styles/Img"

import {Div} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P, LinkP} from "../styles/P"
import { H1 } from "../styles/H1"

// ===== style =====
const Logo = styled(Img)`
    position:relative;
    width: 100%;
    max-width: 379px;
    margin: 0 0 20px 0;
    left: -20px;
`


//  ===== component =====

const Login = () =>{
    const setPageState = useSetRecoilState(whichPageState)

    const loginMenuBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "idfind_btn":
                setPageState("idFind")
                break
            case "pwfind_btn":
                setPageState("pwFind")
                break
            case "signup_btn":
                setPageState("signUp")
                break
            case "login_btn":
                setPageState("home")
                break
            case "2048_btn":
                setPageState("2048")
                break
        }

    }
    return(
        <React.Fragment>
                
            {/* 로고 */}
            <Logo src={`${process.env.PUBLIC_URL}/img_srcs/icons/logoIcon.png`}/>

            {/* 로그인 폼 */}
            <Div width = "50%" max_width="341px" flex_direction="column">
                <P>Game Univ에 오신걸 환영합니다.
                    <br/><br/>
                    저희 GameUniv는 간단한 게임을 통한 대학생 경쟁 어플리케이션 입니다.
                    게임에 참여해 전국에 있는 대학생들과 경쟁해보세요!
                </P>
                <form>
                    <Div flex_direction="column" width="100%">
                        <Input placeholder="아이디" minLength="6" maxLength="20" 
                        width="100%" max_width="311px" height="28px" margin="20px 0 5px 0" padding="8px 15px"/>
                        <Input type="password" placeholder="비밀번호" 
                        width="100%" max_width="311px" height="28px" margin="5px 0 10px 0" padding="8px 15px"/>
                    </Div>

                    <Div flex_direction="column" onClick={loginMenuBtnEvent}>
                        <Div margin="0 0 10px 0">
                            <LinkP font_size ="xxs" border_right="1px solid black" padding="0 10px" id="idfind_btn">아이디 찾기</LinkP>
                            <LinkP font_size ="xxs" border_right="1px solid black" padding="0 10px" id="pwfind_btn">비밀번호 찾기</LinkP>
                            <LinkP font_size ="xxs" padding="0 10px" id="signup_btn">회원가입</LinkP>
                        </Div>
                        <Button type="button" width="100%" max_width="341px" height="56px" id="login_btn">로그인</Button>
                        {/* 임시 게임 구현 확인용 */}
                        <Button type="button" width="100%" margin="5px" id="2048_btn">2048 구현 확인용</Button>
                    </Div>
                    
                </form>
                
            </Div>
        </React.Fragment>
    )
}

export default Login