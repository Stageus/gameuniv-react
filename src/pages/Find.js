// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

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

//  ===== component =====
const Timer = () =>{
    const [min,setMin] = React.useState(3)
    const [sec, setSec] = React.useState(0)
    const time = React.useRef(179)
    const timerId = React.useRef(null)

    React.useEffect( () => {
        timerId.current = setInterval( ()=>{
            setMin( Math.floor(parseInt(time.current)/ 60) )
            setSec( time.current % 60)
            time.current -= 1
        }, 1000)

        return () => clearInterval(timerId.current)
    }, [])

    // 시간 초과시
    React.useEffect( ()=>{
        if(time.current <=0){
            console.log("시간초과")
            clearInterval(timerId.current)
        }
    }, [sec])

    return(
        <React.Fragment>
        {
            sec < 10 
            ?
            <P>{min}:0{sec}</P>   
            :
            <P>{min}:{sec}</P>   
        }
        </React.Fragment>
        
        
    )
}



const Find = (props) =>{
    // ===== recoil state =====
    const whichPage = useRecoilValue(whichPageState)

    // ===== state =====
    const which_find = props.which_find
    const [idFindStep, setIdFindStep] = React.useState(1)
    const [pwFindStep, setPwFindStep] = React.useState(1)

    //  ===== router =====
    const navigate = useNavigate()

    // ===== event =====
    const checkEvent = (e) =>{
        e.preventDefault()
        // ===== var =====
        const target = e.target.id
        
        
        switch(target){
            case "id_find":
            case "pw_find":
                const email_regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                const email = document.getElementById("email_input").value
                const email_check = email_regex.test(email)
                if(email === ""){
                    alert("빈 칸을 채워주십시오")
                }
                else if(!email_check){
                    alert("email 형식이 올바르지 않습니다")
                }
                else{
                    if(target === "id_find") setIdFindStep(idFindStep+1)
                    else setPwFindStep(pwFindStep+1)
                }
                break
            
            case "certification_check":
                setIdFindStep(idFindStep+1)
                break
            
            case "pw_certification_check":
                setPwFindStep(pwFindStep+1)
                break
            // case "pw_find":
                

            //     if(email === "" || id === ""){
            //         alert("빈 칸을 채워주십시오")
            //     }
            //     else if(!email_check){
            //         alert("email 형식이 올바르지 않습니다")
            //     }
            //     else if(!id_check){
            //         alert("아이디 형식이 올바르지 않습니다(6~20자 영문, 숫자)")
            //     }
            //     else{
            //         setPwFindStep(pwFindStep+1)
            //     }
            //     break
            case "change_pw":
                const pw_regex = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/
                const pw = document.getElementById("new_pw").value
                const pw_check = pw_regex.test(pw)
                if(pw_check){
                    setPwFindStep(pwFindStep+1)
                }
                else{
                    alert("비밀번호 양식이 올바르지 않습니다. 8~20자 영문, 숫자, 특수문자 최소 1회 이상 포함")
                }
                break

            case "move_loginpage":
                navigate("/")
                break


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
                        idFindStep === 1
                        &&
                        <form>
                            <Div flex_direction="column">
                                <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                                    <H1 font_size= "xxl" padding="20px 0" color="grayscale7">아이디 찾기</H1>
                                    <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                                    <P font_size = "xxs" padding="5px 0">이메일</P>
                                    <Input width="100%" max_width="289px" height="28px" placeholder="예시 : 00000@inha.ac.kr" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="email_input"/>
                                </Div>
                                <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                                onClick={checkEvent} id="id_find">인증번호 받기</Button>
                            </Div>
                        </form>
                    }
                    {
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
                    }
                    
                </React.Fragment>
                :
                // 비밀번호 찾기
                <React.Fragment>
                    {
                        pwFindStep === 1
                        &&
                        <form>
                            <Div flex_direction="column">
                                <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                                    <H1 font_size= "xxl" padding="20px 0" color="grayscale7">비밀번호 찾기</H1>
                                    <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                                    <P font_size = "xxs" padding="5px 0">이메일</P>
                                    <Input width="100%" max_width="289px" height="28px" placeholder="예시 : 00000@inha.ac.kr" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="email_input"/>
                                    {/* <P font_size = "xxs" padding="5px 0">아이디</P>
                                    <Input width="100%" max_width="289px" height="28px" placeholder="아이디" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="id_input" minLength={6} maxLength={20}/> */}
                                </Div>
                                <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                                onClick={checkEvent} id="pw_find">비밀번호 찾기</Button>
                            </Div>
                        </form>
                    }
                    {
                        pwFindStep === 2
                        &&
                        <form>
                            <Div flex_direction="column">
                                <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                                    <H1 font_size= "xxl" padding="20px 0" color="grayscale7">비밀번호 찾기</H1>
                                    <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                                    <P font_size = "xxs" padding="5px 0">인증번호</P>
                                    <Div>
                                        <Input width="100%" max_width="289px" height="28px" placeholder="인증번호를 입력해주세요" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                        id="certification_number"/>
                                        <Timer/>
                                    </Div>
                                </Div>
                                <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                                onClick={checkEvent} id="pw_certification_check">인증 확인</Button>
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
                                    <Div>
                                        <Input type="password" width="100%" max_width="289px" height="28px" placeholder="8~20자 영문, 숫자, 특수문자 최소 1회 이상 포함" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                        id="new_pw"/>
                                    </Div>
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
