// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import hooks =====

// ===== import style =====
import {H1} from "../styles/H1"
import {Img} from "../styles/Img"
import {Div} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P} from "../styles/P"

//  ===== component =====
const Find = (props) =>{
    // ===== recoil state =====
    const whichPage = useRecoilValue(whichPageState)

    // ===== state =====
    const which_find = props.which_find

    // ===== event =====
    const checkEvent = (e) =>{
        e.preventDefault()
        // ===== var =====
        const target = e.target.id
        const email_regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.ac.kr$/g
        const email = document.getElementById("email_input").value
        const email_check = email_regex.test(email)
        
        switch(target){
            case "id_find":
                if(email === ""){
                    alert("빈 칸을 채워주십시오")
                }
                else if(!email_check){
                    alert("email 형식이 올바르지 않습니다")
                }
                break

            case "pw_find":
                const id_regex = /^[a-z0-9]{5,20}$/g
                const id = document.getElementById("id_input").value
                const id_check = id_regex.test(id)

                if(email === "" || id === ""){
                    alert("빈 칸을 채워주십시오")
                }
                else if(!email_check){
                    alert("email 형식이 올바르지 않습니다")
                }
                else if(!id_check){
                    alert("아이디 형식이 올바르지 않습니다(6~20자 영문, 숫자)")
                }
        }
    }

    return(
        <React.Fragment>
            {/* 아이디 찾기 페이지 */}
            {
                which_find === "idfind"
                ?
                <React.Fragment >
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
                            onClick={checkEvent} id="id_find">아이디 찾기</Button>
                        </Div>
                    </form>
                </React.Fragment>
                :
                // 비밀번호 찾기
                <React.Fragment>
                    <form>
                        <Div flex_direction="column">
                            <Div flex_direction="column" align_items="felx-start" padding="0 20px">
                                <H1 font_size= "xxl" padding="20px 0" color="grayscale7">비밀번호 찾기</H1>
                                <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                                <P font_size = "xxs" padding="5px 0">이메일</P>
                                <Input width="100%" max_width="289px" height="28px" placeholder="예시 : 00000@inha.ac.kr" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                id="email_input"/>
                                <P font_size = "xxs" padding="5px 0">아이디</P>
                                <Input width="100%" max_width="289px" height="28px" placeholder="아이디" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                id="id_input" minLength={6} maxLength={20}/>
                            </Div>
                            <Button margin="10px 0" font_size = "s" width="100%" max_width="195px" height="46px"
                            onClick={checkEvent} id="pw_find">비밀번호 찾기</Button>
                        </Div>
                    </form>
                </React.Fragment>
            }
            
        </React.Fragment>
    )
}
export default Find