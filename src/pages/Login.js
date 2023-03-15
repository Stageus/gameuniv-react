// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled from "styled-components"

// ===== import cookies =====
import { useCookies, setCookie } from "react-cookie"

//  ===== import recoil =====
import { domainAddressState, isLoginState } from "../recoil/DomainState"
import { userDataState } from "../recoil/UserDataState"


// ===== import react router =====
import {Route, Link, useNavigate} from "react-router-dom"

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
    // ===== recoil state =====
    const address = useRecoilValue(domainAddressState)
    const userData = useRecoilValue(userDataState)
    const setUserData = useSetRecoilState(userDataState)
    const setLogin = useSetRecoilState(isLoginState)
    // ===== router =====
    const navigate = useNavigate()
    const audio = document.getElementById("audio")
    const login_form = document.getElementById("login_form")
    const [token, setToken, removeToken] = useCookies(['token'])
    // ===== event =====


    const postLoginData = async() =>{
        const id = document.getElementById("id").value
        const pw = document.getElementById("pw").value

        console.log(id, pw)
        const response = await fetch(`${address}/auth`,{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                pw: pw,
                autoLogin: true,
            })
        })

        const result = await response.json()
        if(result.message){
            alert(result.message)
        }
        else{
            alert("로그인 성공")
            testUserData()
            setLogin(true)
            navigate("/home")
        }
    }

    const loginEvent = (e) =>{
        e.preventDefault()
        const id_regex = /^[a-z0-9]{5,20}$/
        const id = document.getElementById("id").value
        const id_check = id_regex.test(id)
        
        const pw_regex = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/
        const pw = document.getElementById("pw").value
        const pw_check = pw_regex.test(pw)
        if(id === "" || pw === ""){
            alert("빈 칸을 입력해 주십시오")
        }
        else if(!id_check){
            alert("아이디 형식이 올바르지 않습니다(6~20자 영문, 숫자)")
        }
        else if(!pw_check){
            alert("비밀번호 형식이 올바르지 않습니다(8~20자, 하나 이상의 숫자, 문자, 특수문자")
        }
        else{
            postLoginData(e)
            
        }
    }


    const testUserData = async() =>{
        const response = await fetch(`${address}/auth/user`,
        {
            credentials: "include",
        })

        const result = await response.json()
        
        if(result.message){
            alert(result.message)
        }
        else{
            setUserData(result.data)
        }
    }
    
    // console.log(userData)

    return(
        <React.Fragment>
            {/* 로고 */}
            {/* <Button onClick={testUserData}>유저정보 확인</Button> */}
            <Div flex_direction="column" width="100%">
                <Logo src={`${process.env.PUBLIC_URL}/img_srcs/icons/logoIcon.png`}/>
                {/* 로그인 폼 */}
                <Div width = "50%" max_width="341px" flex_direction="column">
                    <P>Game Univ에 오신걸 환영합니다.
                        <br/><br/>
                        저희 GameUniv는 간단한 게임을 통한 대학생 경쟁 어플리케이션 입니다.
                        게임에 참여해 전국에 있는 대학생들과 경쟁해보세요!
                    </P>
                    <form id="login_form">
                        <Div flex_direction="column" width="100%">
                            <Input placeholder="아이디" minLength="6" maxLength="20" 
                            width="100%" max_width="311px" height="28px" margin="20px 0 5px 0" padding="8px 15px" id="id"/>
                            <Input type="password" placeholder="비밀번호" 
                            width="100%" max_width="311px" height="28px" margin="5px 0 10px 0" padding="8px 15px" id="pw"/>
                        </Div>

                        <Div flex_direction="column">
                            <Div margin="0 0 10px 0">
                                <Link to={"/idfind"} which_find="idfind">
                                    <LinkP font_size ="xxs" border_right="1px solid black" padding="0 10px" id="idfind_btn">아이디 찾기</LinkP>
                                </Link>
                                
                                <Link to={"/pwfind"}>
                                    <LinkP font_size ="xxs" border_right="1px solid black" padding="0 10px" id="pwfind_btn">비밀번호 찾기</LinkP>
                                </Link>
                                
                                <Link to={"/signup"}>
                                    <LinkP font_size ="xxs" padding="0 10px" id="signup_btn">회원가입</LinkP>
                                </Link>
                            </Div>
                            <Button width="341px" height="56px" id="login_btn" onClick={loginEvent}>로그인</Button>
                        </Div>
                    </form>
                    
                </Div>
            </Div>
        </React.Fragment>
    )
}

export default Login
