// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====
import { Effect } from "../game2048_components/utils/effect"

// ===== import hooks =====
import useVolumeControl from "../../hooks/useVolumeControl"

// ===== import recoil =====
import { whichModalState, isModalOpenState } from "../../recoil/ModalState"
import { domainAddressState, isLoginState } from "../../recoil/DomainState"
import { userDataState } from "../../recoil/UserDataState"

// ===== import react router =====
import {Routes, Route, Link, useParams, useLocation, useNavigate} from "react-router-dom"

// ===== import style =====
import { Img, ImgBtn } from "../../styles/Img"
import { Div } from "../../styles/Div"
import { Button } from "../../styles/Button"
import { H1 } from "../../styles/H1"
import { P } from "../../styles/P"

// ===== import style func =====
import { color, fontSize, fontWeight } from "../../styles/style"



// ===== style =====
const GrayButton = styled(Button)`
    width: 126px;
    height: 34px;
    background-color: ${color("grayscale5")};
    font-size: ${fontSize("xxs")};
    ${fontWeight("light")};
    &:hover{
        background-color: ${color("grayscale6")};
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`

//  ===== component =====
const VolumeBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    left: -4px;
`  
const CheckBox = styled.input`
    appearance:none;
    width:19px;
    height:19px;
    background-color:${color("grayscale4")};
    border-radius: 5px;

    &:checked{
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(3,0,137)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-color:${color("blue2")};
    }
`

const Range = styled.input`
    width: 60%;
    // overflow: hidden;
    // height: 8px;
    // -webkit-appearance: none;
    // margin: 10px 0;
    // width: 100%;
    // background: transparent;
    
    // ::-webkit-slider-runnable-track {
    //     width: 100%;
    //     height: 100%;
    //     cursor: pointer;
    //     border-radius: 5px;
    //     background: ${color("grayscale4")};
    // }

    // ::-webkit-slider-thumb {
    //     -webkit-appearance: none;
    //     position: relative;
    //     width: 17px;
    //     height: 17px;
    //     border-radius: 50%;
    //     background: ${color("blue4")};
    //     cursor: pointer;
    //     box-shadow: -100vw 0 0 100vw ${color("blue3")};
    // }

    // &:focus {
    //     outline: none;
    // }
`

const SettingModal = () =>{

    // ===== var =====
    const back_volume_control = document.getElementById("back_volume_control")
    const audio = document.getElementById("audio")
    const effect = Effect
    // ===== router =====
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname

    // ===== recoil state =====
    const setModalState = useSetRecoilState(whichModalState)
    const address = useRecoilValue(domainAddressState)
    const setLogin = useSetRecoilState(isLoginState)
    const setUserData = useSetRecoilState(userDataState)
    const which_page = (path === "/" || path === "/idfind" || path === "/pwfind" || path === "/signup")
    const setModalOpen = useSetRecoilState(isModalOpenState)

    // ===== state =====
    const [bgmOn, setBgm] = useVolumeControl("bgmOn", false)
    const [effectOn, setEffect] = useVolumeControl("effectOn", false)
    const [bgmRange, setBgmRange] = useVolumeControl("bgmRange", 50)
    const [effectRange, setEffectRange] = useVolumeControl("effectRange", 50)
    // ===== event =====

    const logoutBtnEvent = async() => {

        const response = await fetch(`${address}/auth`,
            {
                method: "DELETE",
                credentials:"include"
            })

        const result = await response.json()
        
        if(result.message){
            alert(result.message)
        }
        else{
            // alert("로그아웃 성공")
            navigate("/")
            setModalOpen(false)
            setLogin(false)
            setUserData({})
            window.localStorage.removeItem("recoil-persist")
        }
    }

    // sound 관련
    const backControlEvent = (e) =>{
        let value = e.target.value
        setBgmRange(value)
        audio.volume = bgmRange/100
    }

    const backMuteEvent = (e) =>{
        let check = e.target.checked
        setBgm(!bgmOn)
        check = bgmOn
        if(check){
            audio.play()
        }
        else{
            audio.pause()
        }
    }

    const effectControlEvent = (e) =>{
        let value = e.target.value
        setEffectRange(value)
        effect.volume = effectRange/100
    }

    const effectMuteEvent = (e) =>{
        let check = e.target.checked
        setEffect(!effectOn)
        check = effectOn
        if(check){
            effect.volume = 0
        }
        else{
            effect.volume = 1
        }
    }



    return(
        <Div width="330px" height={which_page ? "220px" : "325px"}>
            <Div width="80%" height="100%">
                <Div flex_direction="column" align_items="flex-start" justify_content="space-evenly"
                width="100%" height="100%">
                    <H1 font_size="m" color="grayscale7">설정</H1>
                    {/* 사운드 관련 */}
                    <Div width="100%" flex_direction="column" align_items="flex-start">
                        <Div width="103%" justify_content="space-between">
                        <P font_weight="regular" font_size="xs" margin="0 0 5px 0">사운드</P>
                        <P font_weight="regular" font_size="xxs" margin="0 0 5px 0">켜기 / 끄기</P>
                        </Div>
                        
                        <VolumeBox>
                            <Div margin="0 0 5px 0" width="100%" justify_content="space-around">
                                <P font_size="xxs" font_weight="regular" color="grayscale6">배경음</P>
                                <Range type="range" id="back_volume_control" value={bgmRange} onChange={backControlEvent}></Range>
                                <CheckBox type="checkbox" checked={bgmOn} id="check_btn" onChange={backMuteEvent}></CheckBox>    
                            </Div>
                            <Div margin="0 0 5px 0" width="100%" justify_content="space-around">
                                <P font_size="xxs" font_weight="regular" color="grayscale6">효과음</P>
                                <Range type="range" value={effectRange} onChange={effectControlEvent}></Range>
                                <CheckBox type="checkbox" checked={effectOn} id="check_btn" onChange={effectMuteEvent}></CheckBox>    
                            </Div>
                        </VolumeBox>
                    </Div>
                    {/* 버튼 */}
                    <Div flex_direction="column" width="100%">
                        <Div justify_content={which_page ? "center" : "space-around"} 
                        align_items="center" width="100%" margin="0 0 5px 0">
                            { 
                                which_page
                                || 
                                <GrayButton onClick={()=>setModalState("deleteAccountModal")}>계정 삭제</GrayButton>
                            }
                            <GrayButton onClick={()=>setModalState("developInfoModal")} background_>
                                개발자 정보
                            </GrayButton>
                            
                        </Div>
                        {   which_page
                            ||  
                            <Button width="258px" height="61px" onClick={logoutBtnEvent}>
                                <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/logOutIcon.png`} height="29px"/>
                                <P font_size="m" font_weight="regular" color="grayscale1" padding="0 0 0 10px">로그아웃</P>
                            </Button> }
                    </Div>
                {/* <Button>로그아웃</Button> */}
                </Div>
            </Div>
        </Div>
    )
}

export default SettingModal
