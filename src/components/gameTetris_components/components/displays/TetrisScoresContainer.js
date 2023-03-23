// ===== import base =====
import React, {useEffect, useState} from "react";
import styled, {keyframes, css} from "styled-components";
import { useSetRecoilState, useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";

// ===== import component =====
import ScoreBox from "./ScoreBox"


// ===== import recoil =====
import { gameTetrisResultState, tetrisScoreDataState, tetrisScoreState , isGameOverState} from "../../../../recoil/DataState";
import { domainAddressState } from "../../../../recoil/DomainState";
import { userDataState, coinState } from "../../../../recoil/UserDataState";
import { isModalOpenState ,whichModalState} from "../../../../recoil/ModalState"
// ===== import style =====
import { Div } from "../../../../styles/Div";
import { H1 } from "../../../../styles/H1";
import { Img } from "../../../../styles/Img";
import { P } from "../../../../styles/P";

// ===== import style func =====
import { color, fontSize, fontWeight } from "../../../../styles/style";
// import { doodleTheme, jellyTheme, legoTheme, retroTheme } from "../../styles/theme";
// import { isGetState } from "../../recoil/Game2048State";



// ===== style =====
const moveUp = keyframes`
    0%  {
        top: 25px;
        opacity: 1;
    }
    100% {
        top: -50px;
        opacity: 0;
    }
`

const AddScore = styled(Div)`
    position: absolute;
    right: 0;
    font-size: 15px;
    line-height: 25px;
    font-weight: bold;
    z-index: 100;
    animation: ${moveUp} 600ms ease-in;
    animation-fill-mode: both;
`

const MyScore = styled(Div)`
    position: relative;
    right:0;
`


const UserId = styled.div`
    font-size: ${fontSize("xs")};
    ${fontWeight("bold")};
`
const UserUniv = styled.div`
    font-size: 3px;
`

const MyRank = styled(Div)`
    font-size:${fontSize("s")};
    width:34px;
    height:34px;
    border-radius:50%;
    ${fontWeight("bold")};
    margin-right: 20px;

`

const OtherScore = styled(MyScore)`
    width:140px;
    height: 29px;
    border: none;
`


const OtherRank = styled(MyRank)`
    position:relative;
    width: 20px;
    height: 20px;
    font-size:${fontSize("xxs")};
    margin-right: 0px;
    
`

const OtherId = styled(UserId)`
    font-size: 10px;
    position:relative;
    left: 5px;
`

const OtherUniv = styled(UserUniv)`
    font-size: 10px;
    position:relative;
    left: 5px;
`
const TetrisScoresContainer = (props) =>{

    const {score, rowsCleared}=props
    const setModalState = useSetRecoilState(whichModalState)
    const setModalOpen = useSetRecoilState(isModalOpenState)

    // ===== state =====
    // const [state, dispatch] = useGameLocalStorage("scores", initState(), stateReducer)
    const [tetrisScoreData, setTetrisScoreDataState] = useRecoilState(tetrisScoreDataState)

    // ===== recoil =====
    const [isGameOver, setGameOver] = useRecoilState(isGameOverState)
    const [tetrisScore,setTetrisScore] = useRecoilState(tetrisScoreState)
    const address = useRecoilValue(domainAddressState)
    const userData = useRecoilValue(userDataState)
    const setGameTetrisResult= useSetRecoilState(gameTetrisResultState)
    // const setIsGet = useSetRecoilState(isGetState)
    // const isGet = useRecoilValue(isGetState)
    const gameTetrisResult = useRecoilValue(gameTetrisResultState)
    const setCoin = useSetRecoilState(coinState)

    
    // ===== event =====

    // useEffect( () =>{
    //     if(state.newPoints > 0){
    //         const oldAddScore = document.getElementById("additionScore")
    //         oldAddScore.innerText = `+${state.newPoints}`
    //         const newAddScore = oldAddScore.cloneNode(true)
    //         oldAddScore.parentNode.replaceChild( newAddScore, oldAddScore)
    //         setScore(state.score)
    //     }
    // }, [tetrisScore])

    // 랭킹 추적
    const showRankTetris = async(tetrisScore)=>{
        const response = await fetch(`${address}/tetris/score/rank?score=${tetrisScore}`,{
            credentials: "include"
        })

        const result = await response.json()
        if(result.message){
        }
        else{
            setTetrisScoreDataState(result.data)
        }
    }

    // React.useEffect( ()=>{
    //     if(timer){
    //         console.log('clear timer')
    //         clearTimeout(timer)
    //     }
    //     const newTimer = setTimeout( async () => {
    //         showRank2048(state.score)    
    //     }, 500)
    //     setTimer(newTimer)
    // }, [score])

    // console.log(gameState.status)
    // React.useEffect( ()=> {
    //     // setScore(state.score)
    //     if(gameState.status === "GAME_OVER") setGameOver(true)
    // }, [gameState.status])

    React.useEffect( () =>{
        
        showRankTetris(tetrisScore)
    }, [(tetrisScore > tetrisScoreData.pre_max_score), rowsCleared])


    //게임 오버 시 점수보내기
    const postTetrisScore = async() =>{
        // setTetrisScore()
 

        await fetch(`${address}/tetris/score/rank?score=${tetrisScore}`,{
            credentials: "include"
        })
        
        const response = await fetch(`${address}/tetris/score`,{
            method: "POST",
            credentials: "include",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                score: tetrisScore,
            })
        })

        const result = await response.json()

        if(result.message){
            alert(result.message)
        }
        else{
            setGameTetrisResult(result.data)
            const achieve_list = result.data.achieveList
            let achieve_coin = 0

            if(achieve_list){
                achieve_list.forEach( achieve => {
                    achieve_coin += achieve.reward_coin
                })
            }

            setCoin(prevState => prevState + (result.data.coin + achieve_coin) )
        }
    }
    // 게임오버 시 점수 보내기
    useEffect( () => {
        if(isGameOver === true){
            postTetrisScore()
            setTetrisScore(score)
            setModalOpen(true)
            setTimeout(()=>{
                setModalState("gameOverModal")
            }, 2000)
            
        }
    }, [isGameOver]) 

    return(
        <Div width ="248px" height ="135px" border_radius="5px" border =" 2px solid white" flex_direction="column" justify_content="space-evenly">
            {/* 높은 등수 */}
            <OtherScore>
                {
                    tetrisScoreData.rank > 100 ||
                    <OtherRank>{tetrisScoreData.pre_rank}</OtherRank>
                }
                <Div flex_direction="column">
                    <OtherId>{tetrisScoreData.pre_id}</OtherId>
                    <OtherUniv>{tetrisScoreData.pre_university_name}</OtherUniv>
                </Div>
                <ScoreBox score={tetrisScoreData.pre_max_score}/>
            </OtherScore>
            {/* 내 등수 */}
            <MyScore width ="90%" height ="49px" border_radius="10px" border =" 2px solid white">
                {
                    // tetrisScoreData.rank > 100 ||
                    <MyRank >{tetrisScoreData.rank}</MyRank>
                }
                <Div flex_direction="column">
                    <UserId >{userData.id}</UserId>
                    <UserUniv>{userData.universityName}</UserUniv>
                </Div>
                <ScoreBox score={score}/>
                <AddScore></AddScore>
            </MyScore>
            {/* 아래 등수 */}
            <OtherScore>
                {
                tetrisScoreData.rank > 100 || 
                <OtherRank>{tetrisScoreData.next_rank}</OtherRank>
                }
                
                <Div flex_direction="column">
                    <OtherId>{tetrisScoreData.next_id}</OtherId>
                    <OtherUniv>{tetrisScoreData.next_university_name}</OtherUniv>
                </Div>
                <ScoreBox score={tetrisScoreData.next_max_score} />
            </OtherScore>
        </Div>
    )
}

export default TetrisScoresContainer