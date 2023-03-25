// ===== import base =====
import React from "react"
import {useEffect,useState,useRef}  from "react"
import {useRecoilValue, useSetRecoilState, useRecoilState} from "recoil"
import styled from "styled-components"
import { Navigate } from "react-router-dom"
// ===== import component =====
import Profile from "../components/home_components/Profile"
import IndividualTetrisRanking from "../components/home_components/IndividualTetrisRanking"
import Individual2048Ranking from "../components/home_components/Individual2048Ranking"

//  ===== import recoil =====
import { whichPageState } from "../recoil/PageState"
import { isLoginState, domainAddressState } from "../recoil/DomainState"
import { userDataState, userTetrisRankDataState, user2048RankDataState } from "../recoil/UserDataState"
// ===== import react router =====
import {Route, Link, useNavigate} from "react-router-dom"

// ===== import hook =====
import {PC, Mobile} from "../hooks/useMediaComponent"

// ===== import style =====
import {H1} from "../styles/H1"
import {Img} from "../styles/Img"
import {Div, ShadowDiv} from "../styles/Div"
import {P} from "../styles/P"

// ===== import hook =====
import {useMobile} from "../hooks/useMediaComponent"

// ===== import style func =====
import {color} from "../styles/style"



// ===== style =====
const ItemBtnPcDiv = styled(ShadowDiv)`
    position:relative;
    background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/itemDarkYellowIcon.png);
    background-repeat : no-repeat;
    background-position : right bottom;
    background-size :  none;
    z-index: 0;
    &:hover{
        background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/itemLightYellowIcon.png);
        background-color : ${color("yellow2")};
        box-shadow : none;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`
const AchivementBtnPcDiv = styled(ShadowDiv)`
    position:relative;
    background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/achivementDarkYellowIcon.png);
    background-repeat : no-repeat;
    background-position : right bottom;
    background-size : none;
    z-index: 0;
    &:hover{
        background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/achivementLightYellowIcon.png);
        background-color : ${color("yellow2")};
        box-shadow : none;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`
const ItemBtnMobileDiv = styled(ShadowDiv)`
    position:relative;
    background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/itemDarkYellowMobileIcon.png);
    background-repeat : no-repeat;
    background-position : 90%;
    background-size : 120px;
    z-index: 0;
    &:hover{
        background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/itemLightYellowMobileIcon.png);
        background-color : ${color("yellow2")};
        box-shadow : none;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`
const AchivementBtnMobileDiv = styled(ShadowDiv)`
    position:relative;
    background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/achievementDarkYellowMobileIcon.png);
    background-repeat : no-repeat;
    background-position : 90%;
    background-size :  120px;
    z-index: 0;
    &:hover{
        background-image: url(${process.env.PUBLIC_URL}/img_srcs/icons/achievementLightYellowMobileIcon.png);
        background-color : ${color("yellow2")};
        box-shadow : none;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`
const RelativeDiv = styled(ShadowDiv)`
    position:relative;
    z-index: -1;
`
const AbsoluteImg = styled(Img)`
    position:absolute;
    right :0px;
    z-index: -1;
    opacity : ${props=> props.opacity || "100%"};
`
//  ===== component =====
const Home = () =>{
    // ===== media query =====
    let isMobile=useMobile()
    const mounted = useRef(false);


    // ===== recoil state =====
    const address= useRecoilValue(domainAddressState)
    const isLogin = useRecoilValue(isLoginState)
    const userData= useRecoilValue(userDataState)
    const setPageState = useSetRecoilState(whichPageState)
    const [userTetrisRankData,setUserTetrisRankData]=useRecoilState(userTetrisRankDataState)
    const [user2048RankData, setUser2048RankDataState]=useRecoilState(user2048RankDataState)


    // ===== router =====
    const navigate = useNavigate()
    // ===== event =====

    const utilityBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "item_btn":
                setPageState("item")
                break
            case "achivement_btn":
                setPageState("achievement")
                break
        }

    }
    const getUserRankDataEvent = async() =>{

        // console.log(userData.email)
        // console.log(userData)
        // console.log(userData)

        const response_tetris = await fetch(`${address}/tetris/record/${userData.email}`,
        {
            credentials: "include"
        })
        const result_tetris = await response_tetris.json()

        const response_2048 = await fetch(`${address}/2048/record/${userData.email}`,
        {
            credentials: "include"
        })
        const result_2048 = await response_2048.json()

        setUserTetrisRankData(result_tetris.data)
        setUser2048RankDataState(result_2048.data)

        if(result_tetris.message){
            alert(result_tetris.message)
            // 수정 => 자동로그인 푸렸을시 홈으로 이동
            navigate("/")
        }if(result_2048.message){
            alert(result_2048.message)
            // 수정
            navigate("/")
        }
    }

    // getUserRankDataEvent()
    // // ===== hook =====
    useEffect(() => {
        if(!mounted.current){
            mounted.current = true;
          } else {
            getUserRankDataEvent()
          }
        
    },[userData])

    if(!isLogin){
        alert("로그인 후 이용 가능합니다")
        return <Navigate to="/" replace={true}/>
    }
   

    return(
        <React.Fragment>
            <Div width = "700px" height="730px" flex_direction="column">
                <PC>
                    <Div width="100%"   height="301px" justify_content="space-between">
                        <RelativeDiv width="49%" height="204px" border_radius="3px" background_color="blue2" justify_content="space-between">
                            {
                                (userData != null && userTetrisRankData.rank != -2)
                                ?
                                <React.Fragment>
                                    <Div flex_direction="column" align_items="flex-start" margin="0 0 0 20px">
                                        <H1 font_size="m" color="blue4">Tetris</H1>
                                        <P font_size="xxxl" font_weight="bold" color="grayscale7">
                                            {((userTetrisRankData.rank === -1) || (userTetrisRankData.rank > 100))
                                            ?
                                            "99등 초과"
                                            :
                                            userTetrisRankData.rank + "등"
                                            }               
                                        </P>
                                        <H1 font_size="s" color="grayscale7">최고 점수</H1>
                                        <P font_size="xs" color="grayscale7">{userTetrisRankData.max_score}</P>
                                    </Div>
                                    <AbsoluteImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/TetrisCropImg.png`}/>
                                </React.Fragment>
                                :
                                <Div width="100%" justify_content="center" align_items="center">
                                    {
                                        (userTetrisRankData.rank != -2)
                                        ?
                                        <P font_size="s" font_weight="bold">이번 달 Teteis 기록이 없습니다</P>
                                        :
                                        <P font_size="s" font_weight="bold">로딩중...</P>

                                    }
                                    
                                </Div>
                            
                            }   
                        </RelativeDiv>
                        <RelativeDiv width="49%" height="204px" border_radius="3px" background_color="blue2" justify_content="space-between">
                            {

                                (userData != null && user2048RankData.rank != -2)
                                ?
                                <React.Fragment>
                                    <Div flex_direction="column" align_items="flex-start" margin="0 0 0 20px">
                                        <H1 font_size="m" color="blue4">2048</H1>
                                        <P font_size="xxxl" font_weight="bold" color="grayscale7">
                                            {((user2048RankData.rank === -1) || (user2048RankData.rank > 100))
                                            ?
                                            "99등 초과"
                                            :
                                            user2048RankData.rank + "등"
                                            }       
                                            </P>
                                        <H1 font_size="s" color="grayscale7">최고 점수</H1>
                                        <P font_size="xs" color="grayscale7">{user2048RankData.max_score}</P>
                                    </Div>
                                    <AbsoluteImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/2048CropImg.png`}/>
                                </React.Fragment>
                                :
                                <Div width="100%" justify_content="center" align_items="center">
                                    {
                                        (user2048RankData.rank != -2)
                                        ?
                                        <P font_size="s" font_weight="bold">이번 달 2048 기록이 없습니다</P>
                                        :
                                        <P font_size="s" font_weight="bold">로딩중...</P>
                                    }
                                </Div>
                            }  
                        </RelativeDiv>
                    </Div>
                    <Profile/>
                    <Div width="100%"   height="301px" justify_content="space-between" onClick={utilityBtnEvent}>
    
                        <ItemBtnPcDiv width="49%" height="204px" border_radius="3px" background_color="yellow1" background_size="auto" align_items="flex-end" justify_content="space-between" id="item_btn"
                        onClick={()=>navigate("/item")}>
                            <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">아이템</H1>
                        </ItemBtnPcDiv>

                        <AchivementBtnPcDiv width="49%" height="204px" border_radius="3px" background_color="yellow1" background_size="auto" align_items="flex-end" justify_content="space-between" id="achivement_btn"
                        onClick={()=>navigate("/achievement")}>
                            <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">업적</H1>
                        </AchivementBtnPcDiv>
                    </Div>
                </PC>


                
                <Mobile>
                    <Div width="440px"   height="301px" justify_content="space-between">
                        <RelativeDiv width="49%" height="204px" border_radius="3px" background_color="blue2" justify_content="space-between">
                            <Div flex_direction="column" align_items="flex-start" margin="0 0 0 20px">
                                <H1 font_size="m" color="blue4">Tetris</H1>
                                <P font_size="xxxl" font_weight="bold" color="grayscale7">{11}th</P>
                                <H1 font_size="m" color="grayscale7">Your Score</H1>
                                <P font_size="xxs" font_weight="light" color="grayscale7">{11111}</P>
                            </Div>
                            <AbsoluteImg opacity="40%" src={`${process.env.PUBLIC_URL}/img_srcs/imgs/TetrisCropImg.png`}/>
                        </RelativeDiv>
                        <RelativeDiv width="49%" height="204px" border_radius="3px" background_color="blue2" justify_content="space-between">
                            <Div flex_direction="column" align_items="flex-start" margin="0 0 0 20px">
                                <H1 font_size="m" color="blue4">2048</H1>
                                <P font_size="xxxl" font_weight="bold" color="grayscale7">{11}th</P>
                                <H1 font_size="m" color="grayscale7">Your Score</H1>
                                <P font_size="xxs" font_weight="light" color="grayscale7">{11111}</P>
                            </Div>
                            <AbsoluteImg opacity="40%" src={`${process.env.PUBLIC_URL}/img_srcs/imgs/2048CropImg.png`}/>
                        </RelativeDiv>
                    </Div>
                    <Profile/>
                    <Div width="440px"  max_width="693px" height="301px" flex_direction="column" justify_content="space-evenly" onClick={utilityBtnEvent}>
  
                        <ItemBtnMobileDiv width="100%" height="100px" border_radius="3px" background_color="yellow1" background_size="185px" align_items="center" justify_content="start" id="item_btn"
                        onClick={()=>navigate("/item")}>
                            <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">아이템</H1>
                        </ItemBtnMobileDiv>

                        <AchivementBtnMobileDiv width="100%" height="100px" border_radius="3px" background_color="yellow1" background_size="185px" align_items="center" justify_content="start" id="achivement_btn"
                        onClick={()=>navigate("/achievement")}>
                            <H1 font_size="xl" font_weight="regular" color="grayscale5" margin="0px 0px 0px 20px">업적</H1>
                        </AchivementBtnMobileDiv>
                    </Div>
                </Mobile>
            </Div>
        </React.Fragment>
    )
}

export default Home