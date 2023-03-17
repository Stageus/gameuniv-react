// ===== import base =====
import React from "react"
import styled, { keyframes } from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====
import UploadBox from "../components/signup_components/UploadBox"
import ProgressBar from "../components/ProgressBar"
import BtnAnimation from "../components/BtnAnimation"
import Timer from "../components/signup_components/Timer"
import SignUpInput from "../components/signup_components/SignUpInput"
import UnivList from "../components/signup_components/UnivList"

// ===== import recoil =====
import { domainAddressState } from "../recoil/DomainState"

// ===== import hooks =====
import {PC, Mobile} from "../hooks/useMediaComponent"

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

const StepDiv = styled(Div)`
    z-index:1;
`

const InputBoxDiv = styled(Div)`
    flex-direction:column;
    align-items: flex-start;
    width: 90%;
`

//  ===== component =====
const SignUp = () =>{
    // ===== domain =====
    const address = useRecoilValue(domainAddressState)

    // ===== state =====
    const [isConfirm, setConfirm] = React.useState(false)
    const [isIdDouble, setIdDouble] = React.useState(false)
    const [stepState, setStep] = React.useState(1)
    const [authState, setAuth] = React.useState(false)
    const [postDataState, setPostData] = React.useState({
        email: "",
        id: "",
        name: "",
        pw: "",
        pwCheck: "",
        universityIdx: undefined,
        defaultImg: "",
        profileImg: [],
    })
    const [univIdx, setUnivIdx] = React.useState(undefined)
    // console.log(postDataState)
    // ===== var =====
    // ===== event =====

    // 정규식 빈칸 등 체크
    const checkEvent = (e) =>{
        e.preventDefault()
        // ===== var =====
        const target = e.target.id

        if(stepState === 1){
            const name_regex = /^[가-힣]{2,4}|[a-zA-Z]{2,10}$/
            const name = document.getElementById("name").value
            const name_check = name_regex.test(name)
            const id_regex = /^[a-z0-9]{5,20}$/
            const id = document.getElementById("id").value
            const id_check = id_regex.test(id)
            const pw_regex = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/
            const pw = document.getElementById("pw").value
            const pw_check = pw_regex.test(pw)
    
            const pw_same = document.getElementById("pwCheck").value

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
            else if( !isIdDouble ){
                alert("아이디 중복확인을 해주십시오")
            }
            else{
                setStep(stepState+1)
                setPostData({
                    email: "",
                    id: id,
                    name: name,
                    pw: pw,
                    pwCheck: pw_same,
                    universityIdx: undefined,
                    defaultImg: "",
                    profileImg: [],
                })
            }
        }

        if(stepState === 2){
            const isImgUpload =  postDataState.defaultImg !== "" || postDataState.profileImg.length !== 0
            if(isImgUpload){
                setStep(stepState+1)
                
            }
            else{
                alert("프로필을 선택해 주십시오")
            }
        }

        if(stepState === 3){
            const email_regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g
            const email = document.getElementById("email").value
            const email_check = email_regex.test(email)

            const univ = document.getElementById("univ").value

            if(email === "" || univ === ""){
                alert("빈 칸을 채워주십시오")
            }
            else if(!email_check){
                alert("email 형식이 올바르지 않습니다")
            }
            else if(!isConfirm){
                alert("인증이 완료되지 않았습니다")
            }
            else{
                setPostData( (prevState) => ({
                    ...prevState, universityIdx: univIdx, email: email
                }))
                console.log(postDataState)
                postSignUpDataEvent(e)
                
                // universityIdx설정하기
            }
        }
    }

    // id duplication check 아이디 중복 확인
    const idDoubleCheckEvent = async(e) =>{
        e.preventDefault()
        const id = document.getElementById("id").value

        const response = await fetch(`${address}/user/id/duplication?id=${id}`)
        
        const result = await response.json()

        if(result.message){
            alert("이미 가입된 아이디입니다")
        }
        else{
            alert("사용가능한 아이디입니다")
            setIdDouble(true)
            
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
            setAuth(true)
        }
    }

    // 인증번호 확인
    const confirmAuthNumberEvent = async(e) =>{
        e.preventDefault()
        const email = document.getElementById("email").value
        const auth_number = document.getElementById("auth_number").value

        setPostData( (prevState) => ({
            ...prevState, universityIdx: univIdx, email: email
        }))

        console.log(postDataState)
        const response = await fetch(`${address}/auth/email/number?email=${email}&number=${auth_number}`)
        
        const result = await response.json()

        if(result.message){
            alert(result.message)
        }
        else{
            setConfirm(true)
            alert("인증이 완료되었습니다")
        }
    }

    // 회원가입 정보 보내기
    const postSignUpDataEvent = async(e) => {
        e.preventDefault()
        const {email, id, name, pw, pwCheck, universityIdx, defaultImg, profileImg} = {...postDataState}

        console.log(postDataState)
        const response = await fetch(`${address}/user`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                id: id,
                name: name,
                pw: pw,
                pwCheck: pwCheck,
                universityIdx: universityIdx,
                defaultImg: defaultImg,
                profileImg: profileImg,
            })
        })

        const result = await response.json()

        if(result.message){
            alert(result.message)
        }
        else if(!result.message && result.id){
            alert(`계정이 복구되었습니다. ${result.id}로 로그인해주시기 바랍니다`)
            setStep(stepState+1)
        }
        else{
            alert("회원가입 완료")
            setStep(stepState+1)
        }
    }

    console.log(postDataState)
    return(
        <React.Fragment>
            <Div width="100%">
                <PC>
                    <Div onClick={()=>setStep(stepState-1)} width="48px">
                        {
                            (stepState === 2 || stepState === 3)
                            &&
                            <BtnAnimation padding="0 30px 0 0"
                            before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/arrowBeforeBtnImg.png`}
                            after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/arrowAfterBtnImg.png`}/>
                        }
                    </Div>
                </PC>
                
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
                                {/* <Input width="100%" max_width="289px" height="28px" placeholder="이름" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                id="name" maxLength={10} value={postDataState.name} onChange={inputChangeEvent}/> */}
                                <SignUpInput placeholder="이름" id="name" value={postDataState.name} 
                                postDataState={postDataState} setPostData={setPostData}/>
                            </InputBoxDiv>
                            
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">아이디</P>
                                <Div width="105%" justify_content="space-between">
                                    {/* <Input width="80%" max_width="289px" height="28px" placeholder=" 6~20자 이하 영문 또는 숫자" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="id" value={postDataState.id} onChange={inputChangeEvent}/> */}
                                    <SignUpInput placeholder="6~20자 이하 영문 또는 숫자" id="id" value={postDataState.id} 
                                    postDataState={postDataState} setPostData={setPostData}/>

                                    <SignUpPageBtn width="81px" height="28px" onClick={idDoubleCheckEvent}>verification</SignUpPageBtn>
                                </Div>
                            </InputBoxDiv>
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">비밀번호</P>
                                {/* <Input type="password" placeholder="8~20자, 하나 이상의 문자와 하나의 숫자" width="100%" max_width="289px" height="28px"
                                font_size="xxs" padding="0 10px" margin="0 10px 0 0" id="pw" onChange={inputChangeEvent}/> */}
                                <SignUpInput placeholder="8~20자 하나 이상의 문자, 숫자, 특수문자" id="pw" value={postDataState.pw} 
                                postDataState={postDataState} setPostData={setPostData}/>
                            </InputBoxDiv>
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">비밀번호 확인</P>
                                {/* <Input type="password" placeholder="비밀번호 확인" width="100%" max_width="289px" height="28px" 
                                font_size="xxs" padding="0 10px" margin="0 10px 0 0" id="pwCheck" onChange={inputChangeEvent}/>     */}
                                <SignUpInput placeholder="비밀번호 확인" id="pwCheck" value={postDataState.pwCheck} 
                                postDataState={postDataState} setPostData={setPostData}/>
                            </InputBoxDiv>
                        </Div>
                    }
                    {/* step2 */}
                    {
                        stepState === 2
                        &&
                        <Div width="100%" flex_direction="column" align_items="flex-start">
                            <P font_size = "xxs" padding="10px 0">프로필 사진을 올리거나 기본 프로필을 선택해주세요</P>
                            <UploadBox id="upload_box" postDataState={postDataState} setPostData={setPostData}></UploadBox>
                            
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
                                {/* <Input width="100%" max_width="289px" height="28px" placeholder="예시 : 00000@inha.ac.kr" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                id="email" value={postDataState.email} onChange={inputChangeEvent}/> */}
                                <SignUpInput placeholder="예시 : 00000@inha.ac.kr" id="email" value={postDataState.email} 
                                postDataState={postDataState} setPostData={setPostData}/>
                            </InputBoxDiv>
                            
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">대학교</P>
                                {/* <Input width="100%" max_width="289px" height="28px" placeholder="대학교" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                id="univ_input"/> */}
                                {/* <SignUpInput placeholder="대학교" id="universityIdx" value={postDataState.universityIdx} 
                                postDataState={postDataState} setPostData={setPostData}/> */}
                                <UnivList univIdx={univIdx} setUnivIdx={setUnivIdx}/>
                            </InputBoxDiv>
                            <InputBoxDiv >
                                <P font_size = "xxs" padding="5px 0">인증번호</P>
                                <Div width="100%">
                                    <Input width="100%" max_width="289px" height="28px" placeholder="인증번호" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                                    id="auth_number"/>
                                    {authState && (isConfirm || <Timer/>)}
                                </Div>
                                <Div width="100%">
                                    {/* 인증 진행 관련 */}
                                    {
                                        authState
                                        ?
                                        <Button margin="10px 0" font_size = "s" max_width="195px" height="46px" width="100%"
                                        id="confirm_auth" onClick={confirmAuthNumberEvent}>
                                        인증번호 확인
                                        </Button>
                                        :
                                        <Button margin="10px 0" font_size = "s" max_width="195px" height="46px" width="100%"
                                        id="get_auth" onClick={sendAuthNumberEvent}>
                                        인증번호 발송
                                        </Button>
                                    }
                                </Div>
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
                    <Mobile>
                        <Div width="100%" height = "42px" margin ="10px 0" justify_content="space-evenly">
                            {
                                (stepState === 2 || stepState === 3)
                                &&
                                <SignUpPageBtn width="100px" height="32px" onClick={()=>setStep(stepState-1)}>
                                    이전 단계
                                </SignUpPageBtn>
                            }
                            {
                                stepState === 4
                                ||
                                <SignUpPageBtn width="100px" height="32px" onClick={checkEvent}>
                                    다음 단계
                                </SignUpPageBtn>
                            }
                        </Div>
                    </Mobile>
                </StepDiv>
                <PC>
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
                </PC>
            </Div>
        </React.Fragment>
    )
}
export default SignUp