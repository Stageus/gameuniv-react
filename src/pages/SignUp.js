// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====
import UploadBox from "../components/UploadBox"
import ProgressBar from "../components/ProgressBar"

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

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

const Arrow = styled(ImgBtn)`
    position: relative;
    width: 48px;
    top : ${props=> props.top || "auto"};
    right : ${props=> props.right || "auto"};
    transform:rotate(${props => props.deg || "0deg"});

    &:hover{
        opacity: 1;
        transition: 0.5s;
    }
    &:not(:hover){
        opacity: 0;
        transition: 0.5s;
    }
`

const ArrowBeforeBtn = styled(ImgBtn)`
    position:absolute;
    width: 48px;
    transform:rotate(${props => props.deg || "0deg"});
    &:hover{
        opacity: 0;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
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

    // ===== recoil state =====
    const setPageState = useSetRecoilState(whichPageState)

    return(
        <React.Fragment>
            <Div width="100%">
                <Div padding="0 30px 0 0">
                    <ArrowBeforeBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/arrowBeforeBtnImg.png`} onClick={()=>setStep(stepState-1)} margin="0 0 0 10px"/>
                    <Arrow src={`${process.env.PUBLIC_URL}/img_srcs/btns/arrowAfterBtnImg.png`} onClick={()=>setStep(stepState-1)} margin="0 0 0 10px"/>
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
                                <Input width="100%" max_width="289px" height="28px" placeholder="이름" font_size="xxs" padding="0 10px" margin="0 10px 0 0"/>                        
                            </InputBoxDiv>
                            
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">아이디</P>
                                <Div width="105%" justify_content="space-between">
                                    <Input width="80%" max_width="289px" height="28px" placeholder="아이디" font_size="xxs" padding="0 10px" margin="0 10px 0 0"/>
                                    <SignUpPageBtn width="81px" height="28px" >verification</SignUpPageBtn>
                                </Div>
                            </InputBoxDiv>
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">비밀번호</P>
                                <Input type="password" placeholder="비밀번호" width="100%" max_width="289px" height="28px"
                                font_size="xxs" padding="0 10px" margin="0 10px 0 0"/>
                            </InputBoxDiv>
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">비밀번호 확인</P>
                                <Input type="password" placeholder="비밀번호 확인" width="100%" max_width="289px" height="28px" 
                                font_size="xxs" padding="0 10px" margin="0 10px 0 0"/>    
                            </InputBoxDiv>
                        </Div>
                    }
                    {/* step2 */}
                    {
                        stepState === 2
                        &&
                        <Div width="100%" flex_direction="column" align_items="flex-start">
                            <P font_size = "xxs" padding="10px 0">프로필 사진을 올리거나 기본 프로필을 선택해주세요</P>
                            <Div  background_color="blue2" border_radius="3px" width="312px" height="188px">
                                <UploadBox></UploadBox>
                                
                            </Div>
                            
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
                                <Input width="100%" max_width="289px" height="28px" placeholder="학교 이메일" font_size="xxs" padding="0 10px" margin="0 10px 0 0"/>                        
                            </InputBoxDiv>
                            <InputBoxDiv>
                                <P font_size = "xxs" padding="5px 0">대학교</P>
                                <Input width="100%" max_width="289px" height="28px" placeholder="대학교" font_size="xxs" padding="0 10px" margin="0 10px 0 0"/>
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
                                <Button margin="10px 0" font_size = "s" width="100%" max_width="273px" height="50px" onClick={()=>setPageState("logIn")}>로그인 페이지로 이동</Button>
                            </Div>
                        </Div>
                    }
                </StepDiv>
                <Div padding="0 0 0 30px">
                    <ArrowBeforeBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/arrowBeforeBtnImg.png`} deg="180deg" onClick={()=>setStep(stepState+1)} margin="0 10px 0 0"/>
                    <Arrow src={`${process.env.PUBLIC_URL}/img_srcs/btns/arrowAfterBtnImg.png`} deg="180deg" onClick={()=>setStep(stepState+1)} margin="0 10px 0 0"/>
                </Div>
            </Div>
        </React.Fragment>
    )
}
export default SignUp