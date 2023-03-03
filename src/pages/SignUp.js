// ===== import base =====
import React from "react"
import styled, { keyframes } from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====
import UploadBox from "../components/UploadBox"
import ProgressBar from "../components/ProgressBar"
import BtnAnimation from "../components/BtnAnimation"

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import react router =====
import {Route, Link} from "react-router-dom"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P} from "../styles/P"
import { Img, ImgBtn } from "../styles/Img"

// ===== import style func =====
import {color, fontWeight, fontSize} from "../styles/style"


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

const fadeIn = keyframes`
    0% {
        opacity: 0.1;
    }
    100% {
        opacity: 1;
    }
`

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`

const Arrow = styled(ImgBtn)`
    position: relative;
    width: 48px;
    top : ${props=> props.top || "auto"};
    right : ${props=> props.right || "auto"};
    transform:rotate(${props => props.deg || "0deg"});
    animation: ${ props => props.isMouseHover && fadeIn} 0.5s;
    
`
const ArrowBefore = styled(ImgBtn)`
    position: relative;
    width: 48px;
    top : ${props=> props.top || "auto"};
    right : ${props=> props.right || "auto"};
    transform:rotate(${props => props.deg || "0deg"});
`



const StepDiv = styled(Div)`
    z-index:1;
`

const ArrowDiv = styled(Div)`
    position : absolute;
    z-index: 0;
`

const InputBoxDiv = styled(Div)`
    flex-direction:column;
    align-items: flex-start;
    width: 90%;
`

//  ===== component =====
const SignUp = () =>{

    // ===== state =====
    const [stepState, setStep] = React.useState(1)

    // ===== var =====
    let id_double = false
    // ===== event =====
    const checkEvent = (e) =>{
        e.preventDefault()
        // ===== var =====
        const target = e.target.id

        if(stepState === 1){
            const name_regex = /^[가-힣]{2,4}|[a-zA-Z]{2,10}$/g
            const name = document.getElementById("name_input").value
            const name_check = name_regex.test(name)
    
            const id_regex = /^[a-z0-9]{5,20}$/g
            const id = document.getElementById("id_input").value
            const id_check = id_regex.test(id)
            
            const pw_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/g
            const pw = document.getElementById("pw_input").value
            const pw_check = pw_regex.test(pw)
    
            const pw_same = document.getElementById("pw_same").value

            if(id === "" || name === "" || pw === "" || pw_same === ""){
                alert("빈 칸을 입력해 주십시오")
            }
            else if(!name_check){
                alert("이름 형식이 올바르지 않습니다(한글 2~4자 또는 영문 2~10자)")
            }
            else if(!id_check){
                alert("아이디 형식이 올바르지 않습니다(6~20자 영문, 숫자)")
            }
            else if(!pw_check){
                alert("비밀번호 형식이 올바르지 않습니다(8~20자, 하나 이상의 문자와 하나의 숫자 정규식)")
            }
            else if( pw !== pw_same){
                alert("비밀번호를 확인해주십시오")
            }
            else if( !id_double ){
                alert("아이디 중복확인을 해주십시오")
            }
            else{
                setStep(stepState+1)
            }
        }

        if(stepState === 2){
            const img = document.getElementById("profileImg").value
            if(img === ""){
                alert("프로필을 선택해 주십시오")
            }
            else{
                setStep(stepState+1)
            }
        }

        if(stepState === 3){
            const email_regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.ac.kr$/g
            const email = document.getElementById("email_input").value
            const email_check = email_regex.test(email)

            const univ = document.getElementById("univ_input").value

            if(email === "" || univ === ""){
                alert("빈 칸을 채워주십시오")
            }
            else if(!email_check){
                alert("email 형식이 올바르지 않습니다")
            }
            else{
                setStep(stepState+1)
            }
        }
    }

    const idDoubleCheckEvent = (e) =>{
        const id = document.getElementById("id_input").value
        id_double = true
        
    }


    return(
        <React.Fragment>
            <Div width="100%">
                    
                    <Div onClick={()=>setStep(stepState-1)} width="48px">
                        {
                            (stepState === 2 || stepState === 3)
                            &&
                            <BtnAnimation padding="0 30px 0 0"
                            before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/arrowBeforeBtnImg.png`}
                            after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/arrowAfterBtnImg.png`}/>
                        }
                    </Div>
                
                
                <StepDiv flex_direction="column" width="80%" max_width="320px" height="440px" 
                align_items={ stepState !== 4 ? "felx-start" : "center"} 
                padding="0" justify_content={ stepState !==4 ? "flex_start" : "center"}>
                    { 
                        stepState !==4
                        ?
                        <H1 font_size= "xxl" padding="20px 0" color="grayscale7">계정 생성</H1>
                        :
                        <H1 font_size= "xl" padding="20px 0" color="grayscale7">계정 생성 완료!</H1>
                    }
                    {/* step progress bar 구현하기 */}
                    <ProgressBar step_state={stepState}/>
                    {/* step1 */}
                    {
                        stepState === 1
                        &&
                        <Div width="100%" flex_direction="column" align_items="flex-start">
                            <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">이름</P>
                                <Input width="100%" max_width="289px" height="28px" placeholder="이름" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                id="name_input" maxLength={10}/>                        
                            </InputBoxDiv>
                            
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">아이디</P>
                                <Div width="105%" justify_content="space-between">
                                    <Input width="80%" max_width="289px" height="28px" placeholder=" 6~20자 이하 영문 또는 숫자" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="id_input"/>
                                    <SignUpPageBtn width="81px" height="28px" onClick={idDoubleCheckEvent}>verification</SignUpPageBtn>
                                </Div>
                            </InputBoxDiv>
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">비밀번호</P>
                                <Input type="password" placeholder="8~20자, 하나 이상의 문자와 하나의 숫자" width="100%" max_width="289px" height="28px"
                                font_size="xxs" padding="0 10px" margin="0 10px 0 0" id="pw_input"/>
                            </InputBoxDiv>
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">비밀번호 확인</P>
                                <Input type="password" placeholder="비밀번호 확인" width="100%" max_width="289px" height="28px" 
                                font_size="xxs" padding="0 10px" margin="0 10px 0 0" id="pw_same"/>    
                            </InputBoxDiv>
                        </Div>
                    }
                    {/* step2 */}
                    {
                        stepState === 2
                        &&
                        <Div width="100%" flex_direction="column" align_items="flex-start">
                            <P font_size = "xxs" padding="10px 0">프로필 사진을 올리거나 기본 프로필을 선택해주세요</P>
                            <UploadBox id="upload_box"></UploadBox>
                            
                        </Div>
                    }
                    {/* step3 */}
                    {
                        stepState === 3
                        &&
                        <Div width="100%" flex_direction="column" align_items="flex-start">
                            <P font_size = "xxs" padding="10px 0">정보를 입력해주세요</P>
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">학교 이메일</P>
                                <Input width="100%" max_width="289px" height="28px" placeholder="예시 : 00000@inha.ac.kr" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                id="email_input"/>
                            </InputBoxDiv>
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">대학교</P>
                                <Input width="100%" max_width="289px" height="28px" placeholder="대학교" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                id="univ_input"/>
                            </InputBoxDiv>
                        </Div> 
                    }
                    {/* step4 */}
                    {
                        stepState === 4
                        &&
                        <Div width="100%" flex_direction="column" align_items="flex-start">
                            <P font_size = "xxs" padding="10px 0">GameUniv에 가입해주셔서 감사합니다</P>
                            <P font_size = "xxs" padding="10px 0">지금 바로 GameUniv에 접속해 전국 대학교 친구들과 즐기세요<br/></P>
                            <Div width="100%">
                                <Link to="/">
                                    <Button margin="10px 0" font_size = "s" width="273px" height="50px">로그인 페이지로 이동</Button>
                                </Link>
                                
                            </Div>
                        </Div>
                    }
                </StepDiv>

                <Div onClick={checkEvent} width="48px">
                    {
                        stepState === 4
                        ||
                        <BtnAnimation padding="0 0 0 30px"
                        before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/arrowBeforeBtnImg.png`}
                        after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/arrowAfterBtnImg.png`}
                        deg={"180deg"}/>
                    }
                </Div>
            </Div>
        </React.Fragment>
    )
}
export default SignUp