// ===== import base =====
import React, {useState, useRef, useEffect} from "react"
import styled, {ThemeProvider, css} from "styled-components"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

// ===== import hooks =====
import {useInterval} from "../hooks/useInterval"
import {usePlayer} from "../hooks/usePlayer"
import {useStage} from "../hooks/useStage"
import {useGameStatus} from "../hooks/useGameStatus"
import {PC, Mobile, useMobile } from "../../../hooks/useMediaComponent"

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
import { basicTheme, jellyTheme, pastelTheme,doodleTheme,retroTheme,legoTheme } from "../../../styles/TetrisTheme"

// ===== style =====
const TetrisDiv=styled(Div)`
    width: ${props => props.isMobile ? "430px": "734px"}; 
    height: ${props => props.isMobile ? "860px": "760px"}; 
    flex-direction :  ${props => props.isMobile ? "column": "row"}; 
    background-color : ${props => props.theme.totalBoxColor};
    ${props => props.theme != (retroTheme||legoTheme) && css`border-radius : 15px;`}

    ${props => props.theme === doodleTheme && css`
        border : 7px solid #000000;
    `
    }

    ${props => props.theme === jellyTheme && css`
        width: ${props => props.isMobile ? "450px": "735px"}; 
        height: ${props => props.isMobile ? "920px": "768px"}; 
        background-image: ${props => props.isMobile ? `url("img_srcs/game_img/tetris/jelly/asset/boardImgMobile.png");`: `url("img_srcs/game_img/tetris/jelly/asset/bigBoardImg.png")`}; 
        background-size : ${props => props.isMobile ? "450px 920px": "734px 760px"}; 
        background-repeat : no-repeat;
    `}

    ${props => props.theme === retroTheme && css`
        width: ${props => props.isMobile ? "430px": "705px"}; 
        height: ${props => props.isMobile ? "920px": "768px"}; 
        background-image: ${props => props.isMobile ? `url("img_srcs/game_img/tetris/retro/asset/boardImgMobile.png");`: `url("img_srcs/game_img/tetris/retro/asset/boardImg.png")`}; 
        background-size : cover;
        background-repeat : no-repeat;

    `}

    ${props => props.theme === legoTheme && css`
    width: ${props => props.isMobile ? "420px": "705px"}; 
        height: ${props => props.isMobile ? "870px": "768px"}; 
        background-image: ${props => props.isMobile ? `url("img_srcs/game_img/tetris/lego/asset/boardImgMobile.png")`: `url("img_srcs/game_img/tetris/lego/asset/boardImg.png")`}; 
        background-size : cover;
        background-repeat : no-repeat;
        padding-top :${props => props.isMobile ? "18px": "0"}; 
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
    ${props => (props.theme === retroTheme|| props.theme ===legoTheme) && css`
        margin-top: 18px;
        width: 90px;
        height: 90px;
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
    ${props => (props.theme === retroTheme||props.theme ===legoTheme) && css`
    width: 70px;
    height: 70px;
    `}
`
const BtnDiv=styled(Div)`
    width : 150px;
    height : 40px;
    border-radius : 10px;
    border : 6px solid ${props => props.theme.borderColor || "none"};

    margin : 20px 0 0 0;

    ${props => props.theme === retroTheme && css`
    border : none;
    margin-top :38px;`}

    ${props => props.theme ===legoTheme && css`
    border : none;
    margin-top :22px;`
}

}
`

const BtnP=styled(P)`
    color : ${props => props.theme.textColor || "none"};
`
const LevelP=styled(P)`
    color :  ${props => props.theme.textColor};
    
    margin-top :  ${props => (props.theme === retroTheme||props.theme ===legoTheme) ? " 10px": "20px"}
    // -webkit-text-stroke: 2px #FFEC3D;
`
//  ===== component =====
const Tetris =()=>{

    const isMobile = useMobile()

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
    }if(skinTetris===7){
        skin = retroTheme
        preview_img =player.preview.retroTetrominoImg
    }if(skinTetris===9){
        skin = legoTheme
        preview_img =player.preview.legoTetrominoImg
    }

    return(
        <ThemeProvider theme = {skin}> 
            <TetrisDiv margin="50px 0 0 0" isMobile={isMobile}
            role="button" tabIndex="0" flex_direction="column" onKeyDown={e => move(e)} onKeyUp={keyUp}>
                <Stage stage={stage}/>
                    <PC>
                        <Div height="90%" width={skin==legoTheme ? "248px" : "auto"}  margin={(skin==retroTheme||skin==legoTheme )? "0 0 0 35px" : "0 0 0 30px"} flex_direction="column">
                            <Div height="90%" justify_content="space-around" flex_direction="column">   
                                <Img height={(skin==retroTheme||skin==legoTheme )? "30px":"60px"} src={`img_srcs/game_img/tetris/${skin.themeName}/asset/tetrisLogoImg.png`}/> 
                                <LevelP font_size={(skin==retroTheme||skin==legoTheme )? "s":"l"} font_weight="bold">LEVEL : {level}</LevelP>
                                <TetrisScoresContainer score={score} rowsCleared={rowsCleared}/> 
                                <TetrominoPriviewDiv>
                                    <ImgDiv  img_address={preview_img}></ImgDiv>
                                </TetrominoPriviewDiv>
                                {
                                    isGameStart
                                    ?
                                    <BtnDiv  onClick={replayGame}>
                                        <BtnP font_size="s"  font_weight="bold" >다시 하기</BtnP>
                                    </BtnDiv>
                                    :
                                    <BtnDiv  width="150px" height="40px" border_radius="10px" border="6px solid #FFE973"  onClick={startGame}>
                                        <BtnP font_size="s" font_weight="bold">게임 시작</BtnP>
                                    </BtnDiv>
                                }
                                <Div margin={(skin==retroTheme||skin==legoTheme )&& "20px 0px 0px 0px"}>
                                    <Img height={(skin==retroTheme||skin==legoTheme )&& "50px"} src={`img_srcs/game_img/tetris/${skin.themeName}/asset/controllerImg.png`}/>
                                </Div>
                            </Div>
                        </Div>
                    </PC>
                    <Mobile>
                        <Div width={skin==legoTheme ? "auto" : "auto"}  flex_direction="column" padding={(skin==retroTheme||skin==legoTheme )? "0 0 67px 0":"0 0 0 0"} >
                                <Div>
                                    <LevelP margin="0 10px 0 0" font_size={(skin==retroTheme||skin==legoTheme )? "s":"m"} font_weight="bold">LEVEL : {level}</LevelP>
                                    {
                                        isGameStart
                                        ?
                                        <BtnDiv onClick={replayGame}  isMobile={isMobile}>
                                            <BtnP font_size="s" font_weight="bold">다시 하기</BtnP>
                                        </BtnDiv>
                                        :
                                        <BtnDiv  width="150px" height="40px" border_radius="10px" border="6px solid #FFE973"  onClick={startGame}  isMobile={isMobile}>
                                            <BtnP font_size="s" font_weight="bold">게임 시작</BtnP>
                                        </BtnDiv>
                                    }
                                </Div>
                                <Div>
                                    <TetrominoPriviewDiv margin="20px 10px 0 0">
                                        <ImgDiv img_address={preview_img}></ImgDiv>
                                    </TetrominoPriviewDiv>
                                    <TetrisScoresContainer score={score} rowsCleared={rowsCleared}/> 
                                </Div> 
                        </Div>
                    </Mobile>
            </TetrisDiv>
        </ThemeProvider>
        ) 
}

export default Tetris