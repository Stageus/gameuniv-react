// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState, useRecoilState} from "recoil"

// ===== import recoil =====
import { isModalOpenState, whichModalState } from "../recoil/ModalState"

// ===== import react router =====
import {Routes, Route, Link, useParams, useLocation, useNavigate} from "react-router-dom"

// ===== import style =====
import {Img, ImgBtn} from "../styles/Img"
import {Div} from "../styles/Div"
import { P } from "../styles/P"

// ===== import style fun =====
import { color, fontWeight, fontSize } from "../styles/style"

// ===== import hooks =====
import { useSetModalState } from "../hooks/useSetModalState"

//  ===== component =====
import BtnAnimation from "./BtnAnimation"
import { coinState } from "../recoil/UserDataState"
import { domainAddressState } from "../recoil/DomainState"
import { useGet, useGetData } from "../hooks/useFetch"

const Header_style = styled.header`
    position:relative;
    display:flex;
    justify-content: space-between;
    align-items:center;
    width: 100%;
    background-color: ${color("grayscale1")};
    z-index: 20;
    border-bottom: 3px solid ${color("grayscale3")};
    
`

const Header = () =>{
    // recoil
    const setModalState = useSetRecoilState(whichModalState)
    const setModalOpen = useSetRecoilState(isModalOpenState)
    const whichModal = useRecoilValue(whichModalState)
    // ===== router =====  
    const navigate = useNavigate()
    const location = useLocation()
    const address = useRecoilValue(domainAddressState)
    const [coin, setCoin] = useRecoilState(coinState)
    const path = location.pathname
    const which_page = (path === "/" || path === "/idfind" || path === "/pwfind" || path === "/signup")

    // ===== event =====
    const logoEvent = () =>{
        if( which_page){
            navigate("/")
        }
        else{
            if(path === "/2048" || path === "/tetris"){
                setModalState("quitGameModal")
                setModalOpen(true)

            }
            else{
                navigate("/home")
            }
        }
        }
    

    const settingEvent  = () =>{
        setModalState("settingModal")
        setModalOpen(true)
    }

    const data = useGetData('/user/coin', location)
    
    // console.log(data && data)

    return(
        <Header_style>
            <ImgBtn src={`${process.env.PUBLIC_URL}/img_srcs/icons/headerLogoIcon.png`} height="48px" padding="6px"
            onClick={logoEvent}/>
            
            <Div height="60px" align_items="flex-end">
                {
                    which_page
                    ||
                    <React.Fragment>
                        <Div border={`2px solid ${color("grayscale6")}`} border_radius = "10px" height="36px" width="90px" justify_content = "space-around" margin="0 0 6px 0">
                            <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`} width="24px"/>
                            <P font_weight="regular" font_size="xss">{data && data.coin}</P>
                        </Div>
                        <BtnAnimation event={settingEvent}
                        before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/settingBeforeBtnImg.png`}
                        after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/settingAfterBtnImg.png`}
                        margin="0 20px 6px 10px"/>
                    </React.Fragment>
                }
            </Div>
        </Header_style>        
    )
}

export default Header