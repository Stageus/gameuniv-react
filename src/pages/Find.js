// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====
import { domainAddressState } from "../recoil/DomainState"

// ===== import router =====
import { useNavigate } from "react-router"
import { useLocation } from "react-router"

// ===== import style =====
import {H1} from "../styles/H1"
import {Img} from "../styles/Img"
import {Div} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P} from "../styles/P"

// ===== import component =====
import Timer from "../components/signup_components/Timer"
import UnivList from "../components/signup_components/UnivList"

//  ===== component =====

const Find = (props) =>{
    // ===== recoil state =====
    const address = useRecoilValue(domainAddressState)
    // ===== state =====    
    const which_find = props.which_find
    // const [idFindStep, setIdFindStep] = React.useState(1)
    const [pwFindStep, setPwFindStep] = React.useState(1)
    const [isConfirm, setConfirm] = React.useState(false)
    const [isAuthClick, setAuthClick] = React.useState(false)
    const [emailState, setEmail] = React.useState("")
    //  ===== router =====
    const navigate = useNavigate()

    // ===== event =====
    // 아이디 찾기 이벤트 get
    const idFindEvent = async(e) =>{
        e.preventDefault()
        const email = document.getElementById("email").value
        
        const response = await fetch(`${address}/user/id?email=${email}`)
        
        const result = await response.json()

        if(result.message){
            alert(result.message)
        }
        else{
            alert("아이디 찾기가 완료되었습니다. 이메일을 확인해 주세요")
        }

    }
    console.log(emailState)
    const checkEvent = (e) =>{
        e.preventDefault()
        // ===== var =====
        const target = e.target.id
        
        
        switch(target){
            case "id_find":
            case "get_auth":
                const email_regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                const email = document.getElementById("email").value
                const email_check = email_regex.test(email)
                if(email === ""){
                    alert("빈 칸을 채워주십시오")
                }
                else if(!email_check){
                    alert("email 형식이 올바르지 않습니다")
                }
                else{
                    if(target === "get_auth") {
                        setEmail(email)
                        sendAuthNumberEvent(e)                    
                    }
                }
                break
            
            // case "certification_check":
            //     setIdFindStep(idFindStep+1)
            //     break
            
            case "confirm_auth":
                confirmAuthNumberEvent(e)
                
                break
    
            case "change_pw":
                const pw_regex = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/
                const pw = document.getElementById("new_pw").value
                const pw_check = pw_regex.test(pw)
                const pw_same = document.getElementById("pwCheck").value
                if(!pw_check){
                    alert("비밀번호 양식이 올바르지 않습니다. 8~20자 영문, 숫자, 특수문자 최소 1회 이상 포함")
                }
                else if(pw !== pw_same){
                    alert("비밀번호를 확인해 주십시오")
                }
                else{
                    pwChangeEvent(e)
                }
                break

            case "move_loginpage":
                navigate("/")
                break


        }
    }
        // 이메일 인증번호 발송
    const sendAuthNumberEvent = async(e) =>{

        e.preventDefault()
        const email = document.getElementById("email").value
        const university_name = document.getElementById("univ").value

        console.log(email, university_name)
        const response = await fetch(`${address}/auth/email/number`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                universityName : university_name,
            })
        })

        const result = await response.json()
        // console.log(result.message)
        if(result.message){
            alert(result.message)
        }
        else{
            setPwFindStep(pwFindStep+1)
            setAuthClick(true)
        }
    }

    // 인증번호 확인
    const confirmAuthNumberEvent = async(e) =>{
        e.preventDefault()
        const email = emailState
        const auth_number = document.getElementById("auth_number").value
        const response = await fetch(`${address}/auth/email/number?email=${email}&number=${auth_number}`)
        
        const result = await response.json()

        if(result.message){
            alert(result.message)
        }
        else{
            setConfirm(true)
            setPwFindStep(pwFindStep+1)
            alert("인증이 완료되었습니다")
        }
    }

    // 비밀번호 변경
    const pwChangeEvent  = async(e) =>{
        e.preventDefault()
        const pw = document.getElementById("new_pw").value
        const pwCheck = document.getElementById("pwCheck").value

        const response = await fetch(`${address}/user/pw`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailState,
                pw: pw,
                pwCheck: pwCheck
            })
        })

        const result = await response.json()

        if(result.message){
            alert(result.message)
        }
        else{
            setPwFindStep(pwFindStep+1)
        }
    }
    return(
        <React.Fragment>
            {/* 아이디 찾기 페이지 */}
            {
                which_find === "idfind"
                ?
                <React.Fragment >
                    {
                        // 아이디 찾기 이메일 입력
                        // idFindStep === 1
                        // &&
                        <form>
                            <Div flex_direction="column">
                                <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                                    <H1 font_size= "xxl" padding="20px 0" color="grayscale7">아이디 찾기</H1>
                                    <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                                    <P font_size = "xxs" padding="5px 0">이메일</P>
                                    <Input width="100%" max_width="289px" height="28px" placeholder="예시 : 00000@inha.ac.kr" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="email"/>
                                </Div>
                                {/* <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                                onClick={checkEvent} id="id_find">인증번호 받기</Button> */}
                                <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                                onClick={idFindEvent} id="id_find">아이디 찾기</Button>
                            </Div>
                        </form>
                    }
                    {/* {
                        idFindStep === 2
                        &&
                        <form>
                            <Div flex_direction="column">
                                <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                                    <H1 font_size= "xxl" padding="20px 0" color="grayscale7">아이디 찾기</H1>
                                    <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                                    <P font_size = "xxs" padding="5px 0">인증번호</P>
                                    <Div>
                                        <Input width="100%" max_width="289px" height="28px" placeholder="인증번호를 입력해주세요" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                        id="certification_number"/>
                                        <Timer/>
                                    </Div>
                                </Div>
                                <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                                onClick={checkEvent} id="certification_check">인증 확인</Button>
                            </Div>
                        </form>
                    }
                    {
                        idFindStep === 3
                        &&
                        
                        <Div flex_direction="column">
                            <Div flex_direction="column" align_items="center" padding="0 20px">
                                <H1 font_size= "xxl" padding="20px 0" color="grayscale7">아이디 찾기</H1>
                                <P>고객님의 아이디는 ---입니다</P>
                            </Div>
                            <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                            onClick={checkEvent} id="move_loginpage">로그인 페이지로 이동</Button>
                        </Div>
                    } */}
                    
                </React.Fragment>
                :
                // 비밀번호 찾기
                <React.Fragment>
                    {
                        pwFindStep === 1
                        &&
                        // 인증번호 발송
                        <form>
                            <Div flex_direction="column">
                                <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                                    <H1 font_size= "xxl" padding="20px 0" color="grayscale7">비밀번호 찾기</H1>
                                    <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                                    <P font_size = "xxs" padding="5px 0">이메일</P>
                                    <Input width="100%" max_width="289px" height="28px" placeholder="예시 : 00000@inha.ac.kr" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="email"/>
                                    <P font_size = "xxs" padding="5px 0">대학교</P>
                                    {/* <Input width="100%" max_width="289px" height="28px" placeholder="대학교" font_size="xxs" padding="0 10px" margin="0 10px 0 0" */}
                                    {/* id="univ"/> */}
                                    <UnivList></UnivList>
                                    {/* <P font_size = "xxs" padding="5px 0">아이디</P>
                                    <Input width="100%" max_width="289px" height="28px" placeholder="아이디" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="id_input" minLength={6} maxLength={20}/> */}
                                </Div>
                                <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                                onClick={checkEvent} id="get_auth">인증번호 발송</Button>
                            </Div>
                        </form>
                    }
                    {
                        pwFindStep === 2
                        // 인증번호 확인
                        &&
                        <form>
                            <Div flex_direction="column">
                                <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                                    <H1 font_size= "xxl" padding="20px 0" color="grayscale7">비밀번호 찾기</H1>
                                    <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                                    <P font_size = "xxs" padding="5px 0">인증번호</P>
                                    <Div>
                                        <Input width="100%" max_width="289px" height="28px" placeholder="인증번호를 입력해주세요" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                        id="auth_number"/>
                                        {isAuthClick && (isConfirm || <Timer/>)}
                                    </Div>
                                </Div>
                                <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                                onClick={checkEvent} id="confirm_auth">인증번호 확인</Button>
                            </Div>
                        </form>
                    }
                    {
                        pwFindStep === 3
                        &&
                        <form>
                            <Div flex_direction="column">
                                <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                                    <H1 font_size= "xxl" padding="20px 0" color="grayscale7">비밀번호 재설정</H1>
                                    <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                                    <P font_size = "xxs" padding="5px 0">새로운 비밀번호</P>
                                    <Input type="password" width="100%" max_width="289px" height="28px" placeholder="8~20자 영문, 숫자, 특수문자 최소 1회 이상 포함" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="new_pw"/>
                                    <P font_size = "xxs" padding="5px 0">비밀번호 확인</P>
                                    <Input type="password" width="100%" max_width="289px" height="28px" placeholder="8~20자 영문, 숫자, 특수문자 최소 1회 이상 포함" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="pwCheck"/>
                                </Div>
                                <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                                onClick={checkEvent} id="change_pw">비밀번호 변경</Button>
                            </Div>
                        </form>
                    }
                    {
                        pwFindStep === 4
                        &&
                        <Div flex_direction="column">
                            <Div flex_direction="column" align_items="center" padding="0 20px">
                                <H1 font_size= "xxl" padding="20px 0" color="grayscale7">비밀번호 재설정</H1>
                                <P>비밀번호 재설정이 완료되었습니다</P>
                            </Div>
                            <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                            onClick={checkEvent} id="move_loginpage">로그인 페이지로 이동</Button>
                        </Div>
                    }

                </React.Fragment>
            }
            
        </React.Fragment>
    )
}
export default Find
