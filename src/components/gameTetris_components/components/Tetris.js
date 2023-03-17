// ===== import base =====
import React, {useState} from "react"
import styled from "styled-components"

// ===== import hooks =====
import {useInterval} from "../hooks/useInterval"
import {usePlayer} from "../hooks/usePlayer"
import {useStage} from "../hooks/useStage"


import {createStage, checkCollision} from "../gameHelpers"


// ===== import components =====
import Stage from "./Stage"
import Level from "./displays/Level"
import ScoreContainer from "./displays/ScoreContainer"
import NextBlock from "./displays/NextBlock"
import ReplayBtn from "./displays/ReplayBtn"
import Controller from "./displays/Controller"
import ScoresContainer from "../../game2048_components/components/ScoresContainer/ScoresContainer"


// ===== import utils =====


import { Div } from "../../../styles/Div"
import { H1 } from "../../../styles/H1"

const TetrisDiv=styled(Div)`
width: 734px;
height: 760px;
background: #FFF7CB;
border: 20px solid #FFE973;
border-radius : 62px;

`

const Tetris =()=>{
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const[player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
    const[stage, setStage] = useStage(player, resetPlayer)

    useInterval(()=>{
        drop()
    }, dropTime)

    const movePlayer = (dir) =>{
        if(!checkCollision(player, stage, {x: dir, y:0})){
            updatePlayerPos({x: dir, y:0 })
        }
    } 

    const startGame = () =>{
        setStage(createStage())
        setDropTime(1000)
        resetPlayer()
        setGameOver(false)
    } 

    const drop =() =>{
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
        if(!gameOver){
            if(keyCode === 40){
                console.log("interval on")
                setDropTime(1000)
            }
        }
    }

    const dropPlayer=() =>{
        console.log("interval off")
        setDropTime(null);
        drop()
    }

    const move=({keyCode}) =>{
        if(!gameOver){
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


    return(
            
                // gameOver 
                // ? 
                // <div>zz</div>
                // :
                
                    <TetrisDiv align_items="center" justify_content="space-around"
                    role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
                        
                        <Stage stage={stage}/>
                        <Div padding="0 20px" flex_direction="column">
                            <H1>Tetris</H1>
                            <Div flex_direction="column">    
                                <Level text="Level"/>
                                <ScoreContainer/>
                                <NextBlock text="NextBlock"/>
                                <ReplayBtn text="ReplayBtn" callback={startGame}/>
                                <Controller text="Controller"/>
                            </Div>
                        </Div>
                
                    </TetrisDiv>
            
        )

    
}

export default Tetris