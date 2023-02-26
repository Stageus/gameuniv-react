// ===== import base =====
import React from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled from "styled-components"

//  ===== import recoil =====
// 수정한 부분
import { isModalOpenState, whichModalState } from "../../recoil/ModalState"

// ===== import style =====
import {H1} from "../../styles/H1"
import {Img,ImgBtn} from "../../styles/Img"
import {Div, ShadowDiv} from "../../styles/Div"
import {P} from "../../styles/P"


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
const ProfileChangeBeforeBtn = styled(ImgBtn)`
    position:absolute;
    &:hover{
        opacity: 0;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`

//  ===== component =====
const Profile = () =>{ 
    // ===== recoil state =====
    // 수정한 부분
    const setModalState = useSetRecoilState(whichModalState)
    const setModalOpen = useSetRecoilState(isModalOpenState)

    // ===== event =====
    // 수정한 부분
    const changeBtnEvent = (e) =>{
        setModalState("editProfileModal")
        setModalOpen(true)
    }

    return(
        <ProfileInfoDiv  width = "100%" max_width="693px" height="301px" flex_direction="column" align_items="flex-end">
            <H1 font_size="m" color="blue4" font_weight="regular">
                나의 프로필
            </H1>
            <ProfileInfoImgDiv width="260px" height="260px" border_radius="50%" background_color="grayscale3">
                {/* 백엔드 데이터 */}
                <Img width="150px" src={`${process.env.PUBLIC_URL}/img_srcs/Profiles/defaultProfileImg0.png`}/>
            </ProfileInfoImgDiv>
            <ProfileChangeBtn onClick={changeBtnEvent}>
                <ImgBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/profileChangeAfterBtnImg.png`}
                width="55px" padding="0 10px"/>
                <ProfileChangeBeforeBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/profileChangeBeforeBtnImg.png`}
                width="55px" padding="0 10px"/>
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
    )
}

export default Profile