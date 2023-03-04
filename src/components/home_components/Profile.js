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
import {PC, Mobile} from "../../hooks/useMediaComponent"

//  ===== component =====
import BtnAnimation from "../BtnAnimation"

// ===== style =====
const ProfileInfoDiv = styled(Div)`
    position : relative;
`
const ProfileInfoImgDiv = styled(ShadowDiv)`
    position : absolute;
    left : 40px;
    z-index : 1;
`
const ProfileChangeBtn = styled(Div)`
    position : absolute;
    left : 235px;
    top : 190px;
    z-index : 2;
`

//  ===== component =====
const Profile = () =>{ 

    return(
        <React.Fragment>
            <PC>
                <ProfileInfoDiv  width = "100%"  height="301px" flex_direction="column" align_items="flex-end">
                    <H1 font_size="m" color="blue4" font_weight="regular">
                        나의 프로필
                    </H1>
                    <ProfileInfoImgDiv width="250px" height="250px" border_radius="50%" background_color="grayscale3">
                        {/* 백엔드 데이터 */}
                        <Img width="150px" src={`${process.env.PUBLIC_URL}/img_srcs/Profiles/defaultProfileImg0.png`}/>
                    </ProfileInfoImgDiv>
                    <ProfileChangeBtn>
                        <BtnAnimation event={useSetModalState("editProfileModal")}
                            before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/profileChangeBeforeBtnImg.png`}
                            after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/profileChangeAfterBtnImg.png`}
                            padding="0 20px 6px 10px"/>
                    </ProfileChangeBtn>
                    <Div width="100%" height="230px" margin="10px 0px 0px 0px" border_radius="3px" background_color="grayscale2" flex_direction="column" align_items="flex-end">
                        <Div margin="0 50px 0 0" flex_direction="column">
                            {/* 백엔드 데이터 */}
                            <H1 font_size="xxl" color="grayscale7" font_weight="bold">{11111111}</H1>
                            <Div>
                                <Img width="35px" margin="0px 5px 0px 0px"  src={`${process.env.PUBLIC_URL}/img_srcs/univ_logos/ajouUniversityLogoImg.png`}/>
                                <P font_size="m" color="grayscale7" font_weight="light">{111111}</P>
                            </Div> 
                        </Div>
                    </Div>
                </ProfileInfoDiv>
            </PC>
            <Mobile>
                <ProfileInfoDiv  width = "440px"  height="301px" flex_direction="column" align_items="flex-end">
                    <H1 font_size="m" color="blue4" font_weight="regular">
                        나의 프로필
                    </H1>
                    <ProfileInfoImgDiv width="200px" height="200px" border_radius="50%" background_color="grayscale3">
                        {/* 백엔드 데이터 */}
                        <Img width="120px" src={`${process.env.PUBLIC_URL}/img_srcs/Profiles/defaultProfileImg0.png`}/>
                    </ProfileInfoImgDiv>
                    <ProfileChangeBtn>
                        <BtnAnimation event={useSetModalState("editProfileModal")}
                            before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/profileChangeBeforeBtnImg.png`}
                            after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/profileChangeAfterBtnImg.png`}
                            padding="0 20px 6px 10px"/>
                    </ProfileChangeBtn>
                    <Div width="100%" height="230px" margin="10px 0px 0px 0px" border_radius="3px" background_color="grayscale2" flex_direction="column" align_items="flex-end">
                        <Div margin="0 50px 0 0" flex_direction="column">
                            {/* 백엔드 데이터 */}
                            <H1 font_size="xxl" color="grayscale7" font_weight="bold">{11111111}</H1>
                            <Div>
                                <Img width="35px" margin="0px 5px 0px 0px"  src={`${process.env.PUBLIC_URL}/img_srcs/univ_logos/ajouUniversityLogoImg.png`}/>
                                <P font_size="m" color="grayscale7" font_weight="light">{111111}</P>
                            </Div> 
                        </Div>
                    </Div>
                </ProfileInfoDiv>
            </Mobile>
        </React.Fragment>
    )
}

export default Profile