// ===== import base =====
import React, {useState, useRef, useEffect} from "react"
import styled, {ThemeProvider, css} from "styled-components"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

// ===== import hooks =====
import {useInterval} from "../hooks/useInterval"
import {usePlayer} from "../hooks/usePlayer"
import {useStage} from "../hooks/useStage"
import {useGameStatus} from "../hooks/useGameStatus"

// ===== import utils =====
import { TETROMINOS,randomTetromino} from "../tetrominos"
import {createStage, checkCollision} from "../gameHelpers"

//  ===== import recoil =====
import { isModalOpenState ,whichModalState} from "../../../recoil/ModalState"
import { tetrisScoreState, isGameOverState, skinTetrisState} from "../../../recoil/DataState"

// ===== import components =====
import Stage from "./Stage"
import TetrisScoresContainer from "./displays/TetrisScoresContainer"

// ===== import style =====
import { Div } from "../../../styles/Div"
import { H1 } from "../../../styles/H1"
import { P } from "../../../styles/P"
import { Img } from "../../../styles/Img"
import { basicTheme, jellyTheme, pastelTheme,doodleTheme} from "../../../styles/TetrisTheme"

// ===== style =====
const TetrisDiv=styled(Div)`
    width: 734px;
    height: 760px;
    background-color : ${props => props.theme.totalBoxColor};
    border-radius : 15px;

    ${props => props.theme === doodleTheme && css`
        border : 7px solid #000000;
    `
    }

    ${props => props.theme === jellyTheme && css`
        width: 734px;
        height: 760px;
        background-image: url("img_srcs/game_img/tetris/jelly/asset/bigBoardImg.png");
        background-size : 734px 760px;
        background-repeat : no-repeat;
    `}
    `
const TetrominoPriviewDiv=styled(Div)`
    width: 120px;
    height: 120px;
    border-radius : 20px;
    background-color : ${props => props.theme.boardColor || "none"};
  
    ${props => props.theme === pastelTheme && css`
        border : 7px solid #ffffff;
    `
    }
    ${props => props.theme === doodleTheme && css`
        border : 7px solid #000000;
    `
    }
    ${props => props.theme === jellyTheme && css`
        border : 7px solid #F258FF;
    `
    }
`
const ImgDiv = styled(Div)`
    width: 80px;
    height: 80px;
    background-image : url(${(props)=> props.img_address});
    background-repeat : no-repeat;
    background-position : center;
    background-size : contain;
`
const BtnDiv=styled(Div)`
    width : 150px;
    height : 40px;
    border-radius : 10px;
    border : 6px solid ${props => props.theme.borderColor || "none"};
`

const BtnP=styled(P)`
    color : ${props => props.theme.textColor || "none"};
`
const LevelP=styled(P)`
    color :  ${props => props.theme.textColor};
    // -webkit-text-stroke: 2px #FFEC3D;
`
//  ===== component =====
const Tetris =()=>{

    let skin
    let preview_img 
    
    // ===== recoil state =====
    const setModalState = useSetRecoilState(whichModalState)
    const setTetrisScore = useSetRecoilState(tetrisScoreState)
    const [isGameOver, setGameOver] = useRecoilState(isGameOverState)
    const [isModalOpen,setModalOpen] = useRecoilState(isModalOpenState)
    const skinTetris = useRecoilValue(skinTetrisState)

    // ===== state =====
    const [dropTime, setDropTime] = useState(null)
    const [isGameStart, setGameStart] = useState(false)

    // ===== hooks =====
    const mounted = useRef(false);
    const[player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
    const[stage, setStage, rowsCleared] = useStage(player, resetPlayer)
    const[score, setScore, rows, setRows, level, setLevel] =useGameStatus(rowsCleared)

    useInterval(()=>{
        drop()
    }, dropTime)

    // ===== event =====
    const movePlayer = (dir) =>{
        if(!checkCollision(player, stage, {x: dir, y:0})){
            updatePlayerPos({x: dir, y:0 })
        }
    } 

    const startGame = () =>{
        setGameStart(true)
        setStage(createStage())
        setDropTime(800)
        resetPlayer()
        setScore(0)
        setRows(0)
        setLevel(1)
    } 

    const replayGame = () =>{
        setModalOpen(true)
        setModalState("retryGameModal")
    } 

    const drop =() =>{
        if (rows > (level)*5){
            setLevel(prev => prev+1)
            setDropTime(800 /(level)+250)
        }

        if(!checkCollision(player,stage, {x: 0, y:1})){
            updatePlayerPos({x:0, y:1, collided : false})
        }else{
            if(player.pos.y<1){
            setGameOver(true)
            setDropTime(null)
            }
            updatePlayerPos({x:0, y:0 ,collided:true})
        }
        
    }

    const keyUp =({keyCode}) =>{
        if(!isGameOver){
            if(keyCode === 40){
                console.log(rows)
                setDropTime(800 /(level)+250)
            }
        }
    }

    const dropPlayer=() =>{
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

    useEffect( () =>{
        if(isModalOpen === true){
            setDropTime(null);
        }else{
            if (isGameStart === true){
                setDropTime(800 /(level)+250)
            }
        }
    }, [isModalOpen]) 

    //테트리스 스킨 설정

    if(skinTetris===-1){
        skin = basicTheme
        preview_img =player.preview.basicTetrominoImg
    }if(skinTetris===1){
        skin = pastelTheme
        preview_img =player.preview.pastelTetrominoImg
    }if(skinTetris===3){
        skin = doodleTheme
        preview_img =player.preview.doodleTetrominoImg
    }if(skinTetris===5){
        skin = jellyTheme
        preview_img =player.preview.jellyTetrominoImg
    }

    return(
        <ThemeProvider theme = {skin}> 
            <TetrisDiv align_items="center" justify_content="center" margin="50px 0 0 0"
            role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
                <Stage stage={stage}/>
                <Div height="90%" margin="0 0 20px 20px" flex_direction="column">
                    <Img height="60px" src={`img_srcs/game_img/tetris/${skin.themeName}/asset/tetrisLogoImg.png`}/>
                    <Div height="80%" justify_content="space-around" flex_direction="column">    
                        <LevelP font_size="l" font_weight="bold">LEVEL : {level}</LevelP>
                        <TetrisScoresContainer score={score} rowsCleared={rowsCleared}/> 
                        <TetrominoPriviewDiv>
                            <ImgDiv img_address={preview_img}></ImgDiv>
                        </TetrominoPriviewDiv>
                        {
                            isGameStart
                            ?
                            <BtnDiv onClick={replayGame}>
                                <BtnP font_size="s" font_weight="bold">다시 하기</BtnP>
                            </BtnDiv>
                            :
                            <BtnDiv  width="150px" height="40px" border_radius="10px" border="6px solid #FFE973"  onClick={startGame}>
                                <BtnP font_size="s" font_weight="bold">게임 시작</BtnP>
                            </BtnDiv>
                        }
                        <Div>
                            <Img src={`img_srcs/game_img/tetris/${skin.themeName}/asset/controllerImg.png`}/>
                        </Div>
                    </Div>
                </Div>
            </TetrisDiv>
        </ThemeProvider>
        ) 
}

export default Tetris