// ===== import base =====
import React from "react"
import styled from "styled-components"

//  ===== import recoil =====
import { useSetModalState } from "../../hooks/useSetModalState"

// ===== import style =====
import {H1} from "../../styles/H1"
import {Img} from "../../styles/Img"
import {Div, ShadowDiv} from "../../styles/Div"
import {P} from "../../styles/P"

// ===== import hook =====
import {PC, Mobile,useMobile} from "../../hooks/useMediaComponent"

//  ===== component =====
import BtnAnimation from "../BtnAnimation"

// ===== style =====
const ProfileInfoDiv = styled(Div)`
    position : relative;
`
const ProfileImgPcDiv = styled(ShadowDiv)`
    position : absolute;
    left : 40px;
    z-index : 1;
`
const ProfileImgMobileDiv = styled(ShadowDiv)`
    position : absolute;
    left : 10px;
    z-index : 1;
`
const ProfileChangePcBtn = styled(Div)`
    position : absolute;
    left : 235px;
    top : 190px;
    z-index : 2;
`
const ProfileChangeMobileBtn = styled(Div)`
    position : absolute;
    left : 160px;
    top : 160px;
    z-index : 2;
`

//  ===== component =====
const Profile = () =>{ 
    // ===== media query =====
    let isMobile=useMobile()

    return(
        <React.Fragment>
                <ProfileInfoDiv  width ={isMobile ? "440px" : "100%" }   height="301px" flex_direction="column" align_items="flex-end">
                    <H1 font_size="m" color="blue4" font_weight="regular">
                        나의 프로필
                    </H1>

                    <PC>
                        <ProfileImgPcDiv width="250px" height="250px" border_radius="50%" background_color="grayscale3">
                            <Img width="150px" src={`${process.env.PUBLIC_URL}/img_srcs/Profiles/defaultProfileImg0.png`}/>
                        </ProfileImgPcDiv>
                        <ProfileChangePcBtn>
                            <BtnAnimation event={useSetModalState("editProfileModal")}
                                before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/profileChangeBeforeBtnImg.png`}
                                after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/profileChangeAfterBtnImg.png`}
                                padding="0 20px 6px 10px"/>
                        </ProfileChangePcBtn>
                    </PC>
                    <Mobile>
                        <ProfileImgMobileDiv width="200px" height="200px" border_radius="50%" background_color="grayscale3">
                            <Img width="100px" src={`${process.env.PUBLIC_URL}/img_srcs/Profiles/defaultProfileImg0.png`}/>
                        </ProfileImgMobileDiv>
                        <ProfileChangeMobileBtn>
                            <BtnAnimation event={useSetModalState("editProfileModal")}
                                before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/profileChangeBeforeBtnImg.png`}
                                after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/profileChangeAfterBtnImg.png`}
                                padding="0 20px 6px 10px"/>
                        </ProfileChangeMobileBtn>
                    </Mobile>

                    <Div width="100%" height="230px" margin="10px 0px 0px 0px" border_radius="3px" background_color="grayscale2" flex_direction="column" align_items="flex-end">
                        <Div margin={isMobile ? "0 20px 0 0" :  "0 50px 0 0"} flex_direction="column">
                            {/* 백엔드 데이터 */}
                            <H1 font_size={isMobile ? "xl" : "xxl" }color="grayscale7" font_weight="bold">{11111111}</H1>
                            <Div>
                                <Img width={isMobile ? "20px" : "35px" } margin="0px 5px 0px 0px"  src={`${process.env.PUBLIC_URL}/img_srcs/univ_logos/ajouUniversityLogoImg.png`}/>
                                <P font_size={isMobile ? "s" : "m" } color="grayscale7" font_weight="light">{111111}</P>
                            </Div> 
                        </Div>
                    </Div>
                </ProfileInfoDiv>
        </React.Fragment>
    )
}

export default Profile