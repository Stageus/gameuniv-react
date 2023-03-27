// ===== import base =====
import React, {useState, useRef, useEffect} from "react"
import styled from "styled-components"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

// ===== import hooks =====
import {useInterval} from "../hooks/useInterval"
import {usePlayer} from "../hooks/usePlayer"
import {useStage} from "../hooks/useStage"
import {useGameStatus} from "../hooks/useGameStatus"
import { TETROMINOS,randomTetromino} from "../tetrominos"



import {createStage, checkCollision} from "../gameHelpers"

import { isModalOpenState ,whichModalState} from "../../../recoil/ModalState"
import { tetrisScoreState, isGameOverState} from "../../../recoil/DataState"
// ===== import components =====
import Stage from "./Stage"
import TetrisScoresContainer from "./displays/TetrisScoresContainer"


// ===== import utils =====


import { Div } from "../../../styles/Div"
import { H1 } from "../../../styles/H1"
import { P } from "../../../styles/P"
import { Img } from "../../../styles/Img"
import Display from "./Display"

const TetrisDiv=styled(Div)`
width: 734px;
height: 760px;
background-image: url("img_srcs/game_img/tetris/jelly/asset/bigBoardImg.png");
background-size : 734px 760px;
background-repeat : no-repeat;
`

const TetrominoPriviewDiv=styled(Div)`
width: 120px;
height: 120px;
border-radius : 25px;
border : 7px solid #F258FF;
`
const ImgDiv = styled(Div)`
    width: 80px;
    height: 80px;
    background-image : url(${(props)=> props.img_address});
    background-repeat : no-repeat;
    background-position : center;
    background-size : contain;
`
const BtnP=styled(P)`
    color : #F258FF;
`
const ArrowBtnImg =styled.img`
    transform:rotate(${props => props.deg || "0deg"});
`

const Tetris =()=>{
    const mounted = useRef(false);
    const [isModalOpen,setModalOpen] = useRecoilState(isModalOpenState)
    const setModalState = useSetRecoilState(whichModalState)
  
    const setTetrisScore = useSetRecoilState(tetrisScoreState)
    const [isGameOver, setGameOver] = useRecoilState(isGameOverState)
    const [dropTime, setDropTime] = useState(null)

    const [isGameStart, setGameStart] = useState(false)

    const[player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
    const[stage, setStage, rowsCleared] = useStage(player, resetPlayer)
    const[score, setScore, rows, setRows, level, setLevel] =useGameStatus(rowsCleared)


   

    useInterval(()=>{
        drop()
    }, dropTime)

    const movePlayer = (dir) =>{
        if(!checkCollision(player, stage, {x: dir, y:0})){
            updatePlayerPos({x: dir, y:0 })
        }
    } 

    const startGame = () =>{
        setGameStart(true)
        setGameOver(false)
        setStage(createStage())
        setDropTime(1200)
        resetPlayer()
        setScore(0)
        setRows(0)
        setLevel(0)
    } 

    const replayGame = () =>{
        setModalOpen(true)
        setModalState("retryGameModal")
    } 

    const drop =() =>{
        if (rows > (level +1)*10){
            setLevel(prev => prev+1)

            setDropTime(1200 /(level +1)+200)
        }

        if(!checkCollision(player,stage, {x: 0, y:1})){
            updatePlayerPos({x:0, y:1, collided : false})
        }else{
            if(player.pos.y<1){
                console.log("gameover")
            setGameOver(true)
            setDropTime(null)
            }
            updatePlayerPos({x:0, y:0 ,collided:true})
        }
        
    }

    const keyUp =({keyCode}) =>{
        if(!isGameOver){
            if(keyCode === 40){
                console.log("interval on")
                setDropTime(1200 /(level +1)+200)
            }
        }
    }

    const dropPlayer=() =>{
        console.log("interval off")
        setDropTime(null);
        drop()
    }

    const move=({keyCode}) =>{
            if(!isGameOver){
                if(keyCode===37){
                    movePlayer(-1);
                }else if(keyCode===39){
                    movePlayer(1);
                }else if(keyCode===40){
                    dropPlayer();
                }else if (keyCode === 32){
                    playerRotate(stage, 1)
                }
        }
    }
    console.log(rowsCleared)

    useEffect( () =>{
        if(isModalOpen === true){
            setDropTime(null);
        }else{
            if (isGameStart === true){
                setDropTime(1200 /(level +1)+200)
            }
        }
    }, [isModalOpen]) 



    return(
        <TetrisDiv align_items="center" justify_content="center" margin="50px 0 0 0"
        role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            
            <Stage stage={stage}/>
            <Div height="90%" margin="0 0 20px 20px" flex_direction="column">
                <Img height="60px" src={"img_srcs/game_img/tetris/jelly/asset/tetrisLogoImg.png"}/>
                <Div height="80%" justify_content="space-around" flex_direction="column">    
                    <P font_size="l" font_weight="bold">LEVEL : {level}</P>  {/* <Display text={`Lv : ${score}`}/> */}
                    <TetrisScoresContainer score={score} rowsCleared={rowsCleared}/> 
                    <TetrominoPriviewDiv>
                        <ImgDiv img_address={player.preview.tetrominoImg}></ImgDiv>
                    </TetrominoPriviewDiv>
                    {
                        isGameStart
                        ?
                        <Div width="150px" height="40px" border_radius="10px" border="6px solid #FFE973" onClick={replayGame}>
                            <BtnP font_size="s" font_weight="bold">다시 하기</BtnP>
                        </Div>
                        :
                        <Div  width="150px" height="40px" border_radius="10px" border="6px solid #FFE973"  onClick={startGame}>
                            <BtnP font_size="s" font_weight="bold">게임 시작</BtnP>
                        </Div>
                    }
                    <Div>
                        <Div flex_direction="column">
                            <Div  width="180px" justify_content="space-around" >
                                <ArrowBtnImg deg="90deg" src="img_srcs/game_img/tetris/jelly/asset/arrowBtnImg.png"/>
                                <ArrowBtnImg deg="270deg" src="img_srcs/game_img/tetris/jelly/asset/arrowBtnImg.png"/>
                            </Div>
                            <ArrowBtnImg src="img_srcs/game_img/tetris/jelly/asset/arrowBtnImg.png"/>
                        </Div>
                        <Img src="img_srcs/game_img/tetris/jelly/asset/rotateBtnImg.png"/>
                    </Div>
                </Div>
            </Div>
        </TetrisDiv>
        ) 
}

export default Tetris