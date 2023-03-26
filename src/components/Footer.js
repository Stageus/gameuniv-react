// ===== import base =====
import React from "react"
import styled, {css} from "styled-components"
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil"

// ===== import page =====
import Login from "../pages/Login"
import Find from "../pages/Find"
import SignUp from "../pages/SignUp"
import Home from "../pages/Home"
import Achievement from "../pages/Achievement"
import Item from "../pages/Item"
import Game2048 from "../pages/Game2048"

// ===== import component =====
import Bg from "./Bg"
import Ranking from "./Ranking"
import Modal from "./Modal"
import BtnAnimation from "./BtnAnimation"
import MobileRangking from "./MobileRanking"

// ===== import react router =====
import {Routes, Route, Link, useParams, useLocation, useNavigate} from "react-router-dom"

// ===== import hook =====
import { useSetModalState } from "../hooks/useSetModalState"
import {PC, Mobile, useMobile} from "../hooks/useMediaComponent"


// ===== import recoil =====
import { isModalOpenState ,whichModalState } from "../recoil/ModalState"
import { isMobileRankingClickState } from "../recoil/MobileRankingState"

// ===== import style =====
import { Div } from "../styles/Div"
import { Img, ImgBtn } from "../styles/Img"
import { Button } from "../styles/Button"
import { P } from "../styles/P"


// ===== import style func =====
import { color } from "../styles/style"

// ===== style =====
const BackDiv = styled(Div)`
    margin: 0 0 20px 20px;
`

const MobileRankingBtn = styled.button`
    display: flex;
    width: 196px;
    height: 46px;
    background-color: ${color("grayscale2")};
    box-shadow:0 0 3px 3px ${color("grayscale4")};
    border-radius:50px;
    justify-content:center;
    align-items: center;
    border: none;
    position:relative;
    bottom: -15%;
    cursor:pointer;
    
`

const MobileRankingDiv = styled(Div)`
    animation: fadeInDownBig;
    animation-duration: 0.5s;
`

const FooterBox = styled.footer`
    display: flex;
    ${props => props.isMobile && (props.location === "/" || props.location === "/home") &&
    css`
        justify-content:center;
        margin-bottom:20px;
    `}
`

const Triangle = styled(Img)`
    transform:rotate(180deg);
`

//  ===== component =====

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Footer = () =>{
    // ===== hooks =====
    const isMobile = useMobile()

    // ===== recoil state =====
    const setModalState = useSetRecoilState(whichModalState)
    const setModalOpen = useSetRecoilState(isModalOpenState)

    const [isMobileRankingClick, setMobileRanking] = useRecoilState(isMobileRankingClickState)
    //  ===== router =====
    const location = useLocation().pathname;
    const navigate = useNavigate()
    // ===== event =====

    // 뒤로가기 버튼
    const backBtnEvent = ()=>{
        
        if(location === "/2048"){
            setModalState("quitGameModal")
            setModalOpen(true)
        }
        else if(location === "/tetris"){
            setModalState("quitGameModal")
            setModalOpen(true)
        }
        else{
            navigate(-1)
        }
    }
    return(
        <FooterBox isMobile={isMobile} location={location}>
                {
                    (location === "/" || location === "/home")
                    ?
                    <React.Fragment>
                        {
                            isMobile 
                            &&
                            <React.Fragment>
                                {
                                isMobileRankingClick
                                ?
                                    <MobileRankingBtn onClick={()=>setMobileRanking(false)}>
                                        <P color="grayscale6" font_weight="regular">
                                        로그인 페이지로 이동
                                        </P>
                                        <Triangle src={`${process.env.PUBLIC_URL}/img_srcs/icons/triangleGrayIcon.png`}
                                        width="20px" margin="5px 0 0 10px"/>
                                    </MobileRankingBtn>
                                :
                                    <MobileRankingBtn onClick={()=>setMobileRanking(true)}>
                                        <P color="grayscale6" font_weight="regular">
                                        현재 랭킹 확인
                                        </P>
                                        <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/triangleGrayIcon.png`}
                                        width="20px" margin="5px 0 0 10px"/>
                                    </MobileRankingBtn>
                                }
                            </React.Fragment>
                        }
                    </React.Fragment>
                    :
                    <React.Fragment>
                    <BackDiv onClick={backBtnEvent} isMobile={isMobile}>
                        <BtnAnimation 
                        before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/backBeforeBtnImg.png`}
                        after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/backAfterBtnImg.png`}
                        />
                    </BackDiv>
                    </React.Fragment>
                }
                
        </FooterBox>
    )
}

export default Footer

