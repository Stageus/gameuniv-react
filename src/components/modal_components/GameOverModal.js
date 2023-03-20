// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====
// import GameResultContainer from "../game2048_components/components/Board/GameResult"

// ===== import recoil =====
import { whichPageState } from "../../recoil/PageState"
import { isModalOpenState, whichModalState } from "../../recoil/ModalState"
import { domainAddressState } from "../../recoil/DomainState"
import { tetrisScoreState} from "../../recoil/DataState"

// ===== import style =====
import { Img, NoneEventImg } from "../../styles/Img"
import { Div ,ShadowDiv} from "../../styles/Div"
import { Button } from "../../styles/Button"
import { H1 } from "../../styles/H1"
import { P, NoneEventP } from "../../styles/P"

// ===== import style func =====
import { color } from "../../styles/style"

// ===== import hooks =====
import { useLocation, useNavigate } from "react-router"
import { useMobile } from "../../hooks/useMediaComponent"
import { coinState } from "../../recoil/UserDataState"
import { scoreDataState, scoreState } from "../game2048_components/recoil/ScoreState"
import { whichGameState } from "../../recoil/PageState"
// ===== style =====

//  ===== component =====

const GameOverModal = (props) =>{
    // ===== hooks =====
    const isMobile = useMobile()
    // ===== 2048 state =====
    const score2048 = useRecoilValue(scoreState)
    // ===== tetris state ===== 
    const scoreTetris = useRecoilValue(tetrisScoreState)
    // const scoreTetris = props.scoreTetris
    // const score2222 = useRecoilValue(scoreState)
    
    // ===== recoil state =====
    const setModalOpen = useSetRecoilState(isModalOpenState)
    const setCoin = useSetRecoilState(coinState)
    const coin = useRecoilValue(coinState)
    const setModalState = useSetRecoilState(whichModalState)
    const address = useRecoilValue(domainAddressState)
    const whichModal = useRecoilValue(whichGameState)
    const navigate = useNavigate()
    const location = useLocation().pathname
    // ===== event =====
    const gameOverBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "replay_btn":
                if(location === "/2048"){
                    props.onRestart()
                }
                window.location.reload()
                break
            case "home_btn":
                navigate("/home")
                setModalOpen(false)
                break
            case "share_btn":
                setModalState("shareModal")
                break
        }

    }

    // 게임오버 시 게임점수 보내기 2048
    const post2048Score = async() =>{
        // const first = 
        fetch(`${address}/2048/score/rank?score=${score2048}`,{
            credentials: "include"
        })
        
        // const result_first = await first.json()
        console.log(score2048)
        const response = await fetch(`${address}/2048/score`,{
            method: "POST",
            credentials: "include",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                score: score2048,
            })
        })

        const result = await response.json()

        if(result.message){
            alert(result.message)
        }
        else{
            // console.log(result.data.coin, coin)
            console.log(score2048)
            setCoin(prevState => prevState + result.data.coin)
        }
    }

    // 게임오버 시 게임점수 보내기 tetris
    const postTetrisScore = async() =>{
        fetch(`${address}/tetris/score/rank?score=${scoreTetris}`,{
            credentials: "include"
        })

        const response = await fetch(`${address}/tetris/score`,{
            method: "POST",
            credentials: "include",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                score: scoreTetris,
            })
        })

        const result = await response.json()

        if(result.message){
            alert(result.message)
        }
        else{
            console.log(result.data.coin)
            console.log(coin)
            setCoin(prevState => prevState + result.data.coin)
        }
    }

    React.useEffect( () =>{
        if(whichModal === "tetris"){
            postTetrisScore()
        }else{
            post2048Score()
        }
        
    }, [])
    // 수정 부분 ====================================================
    return(
        <Div width= {isMobile ? "416px": "560px"} height={isMobile ? "450px":"550px"} flex_direction="column" justify_content="space-between" padding="20px 0 40px 0">
            <H1 color="grayscale7" font_size="l" font_weight="regular">
                게임 오버
            </H1>

            <Div width="50%" justify_content="space-between">
                <Div width="120px" height="100px" border_radius="10px" background_color="blue4" flex_direction="column" margin="0 10px" >
                    <P color="blue3" font_size="m" font_weight="regular">점수</P>
                    <P color="grayscale1" font_size="s" font_weight="regular">
                    {
                        (whichModal === "tetris")
                        ?
                        scoreTetris
                        :
                        score2048
                    }
                    </P>
                </Div>
                <Div width="120px" height="100px" border_radius="10px" background_color="blue4" flex_direction="column" >
                    <P color="blue3" font_size="m" font_weight="regular">순위</P>
                    <P color="grayscale1" font_size="s" font_weight="regular">{111}</P>
                </Div>
            </Div>

            <Div width="18%" height="80px" flex_direction="column" justify_content="space-between">
                <P color="grayscale7" font_size="m" font_weight="regular">
                    코인
                </P>
                <Div width="100%" justify_content="space-between">
                    <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/severalCoinIcon.png`} height="29px"/>
                    <P color="green" font_size="m" font_weight="regular">+{111}</P>
                </Div>
            </Div>

            <Div width="50%" height="170px" flex_direction="column" justify_content="space-between">
                <P color="grayscale7" font_size="m" font_weight="regular">
                    업적
                </P>
                <Div>
                    {/* 아마 컴포넌트로 뺼듯 */}
                    <ShadowDiv width="181px" height="110px" padding="5px 0 5px 0" border_radius="10px" flex_direction="column" justify_content="space-around">
                        <H1 color="blue3" font_size="xs" font_weight="medium" >테트리스 랭킹 100위 이내 달성</H1>
                        <Div width="60%" justify_content="space-around">
                            <Img height="50px" src={`${process.env.PUBLIC_URL}/img_srcs/icons/coinIcon.png`}/>
                            <P  color="grayscale7" font_size="xxs" font_weight="regular">1코인</P>
                        </Div>
                        <Div width="50px" height="20px" border_radius="10px" background_color="green">
                            <P color="grayscale1" font_size="xxxs" font_weight="regular">달성!</P>
                        </Div>
                    </ShadowDiv>
                </Div>
            </Div>

            <Div width="88%" justify_content="space-evenly" onClick={gameOverBtnEvent}>
                <Button id="replay_btn" width="32%" height="50px" font_size={isMobile ? "xs":"s"} font_weight="regular">
                    다시하기
                </Button>
                <Button id="home_btn" width="32%" height="50px">
                    <NoneEventImg src={`${process.env.PUBLIC_URL}/img_srcs/icons/homeIcon.png`} height={isMobile ? "20px":"25px"}/>
                    <NoneEventP font_size={isMobile ? "xs":"s"} font_weight="regular" color="grayscale1" padding="0 0 0 10px">홈으로 이동</NoneEventP>
                </Button>
                <Button id="share_btn" width="32%"  height="50px">
                    <NoneEventImg src={`${process.env.PUBLIC_URL}/img_srcs/icons/shareIcon.png`} height={isMobile ? "20px":"25px"}/>
                    <NoneEventP font_size={isMobile ? "xs":"s"} font_weight="regular" color="grayscale1" padding="0 0 0 10px">공유</NoneEventP>
                </Button>
            </Div>
        </Div>
    )
}

export default GameOverModal