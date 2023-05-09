// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====

// ===== import recoil =====
import { whichPageState } from "../../recoil/PageState"
import { isModalOpenState, whichModalState } from "../../recoil/ModalState"
import { whichGameState } from "../../recoil/PageState"
// ===== import hooks =====
import { useNavigate } from "react-router"
import {PC, Mobile} from "../../hooks/useMediaComponent"

// ===== import style =====
import { ImgBtn } from "../../styles/Img"
import { Div } from "../../styles/Div"
import { H1 } from "../../styles/H1"

// ===== style =====
const GameBeforeBtn = styled(ImgBtn)`
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

const GameSelectModal = () =>{

    // ===== recoil state =====
    const setModalOpen = useSetRecoilState(isModalOpenState)
    const setPageState= useSetRecoilState(whichPageState)
    const setGameState= useSetRecoilState(whichGameState)
    const setModalState = useSetRecoilState(whichModalState)

    // ===== hooks =====
    const navigate = useNavigate()

    // ===== event =====
    const gameSelctBtnEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "tetris_btn":
                navigate("/tetris")
                setModalOpen(false)
                setGameState("tetris")
                setModalState(null)
                break
            case "2048_btn":
                navigate("/2048")
                setModalOpen(false)
                setGameState("2048")
                setModalState(null)
                break
        }

    }
    return(
        <>
            <PC>
                <Div width="611px" height="450px" flex_direction="column" onClick={gameSelctBtnEvent}>
                    <Div  flex_direction="column"  align_items="flex-start">
                        <H1 font_size="m" color="grayscale7" font_weight="regular" margin="0 0 10px 0">게임 선택</H1>
                        <Div margin="0 0 10px 0">
                            <ImgBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/tetrisAfterBtnImg.png`}/>
                            <GameBeforeBtn id="tetris_btn" src={`${process.env.PUBLIC_URL}/img_srcs/btns/tetrisBeforeBtnImg.png`}/>
                        </Div>
                        <Div>
                            <ImgBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/2048AfterBtnImg.png`}/>
                            <GameBeforeBtn id="2048_btn" src={`${process.env.PUBLIC_URL}/img_srcs/btns/2048BeforeBtnImg.png`}/>
                        </Div>
                    </Div>
                </Div>
            </PC>
            <Mobile>
                <Div width="420px" height="350px" flex_direction="column" onClick={gameSelctBtnEvent}>
                    <Div  flex_direction="column"  align_items="flex-start">
                        <H1 font_size="m" color="grayscale7" font_weight="regular" margin="0 0 10px 0">게임 선택</H1>
                        <Div margin="0 0 10px 0">
                            <ImgBtn width="400px" src={`${process.env.PUBLIC_URL}/img_srcs/btns/tetrisAfterBtnImg.png`}/>
                            <GameBeforeBtn width="400px" id="tetris_btn" src={`${process.env.PUBLIC_URL}/img_srcs/btns/tetrisBeforeBtnImg.png`}/>
                        </Div>
                        <Div>
                            <ImgBtn width="400px" src={`${process.env.PUBLIC_URL}/img_srcs/btns/2048AfterBtnImg.png`}/>
                            <GameBeforeBtn width="400px" id="2048_btn" src={`${process.env.PUBLIC_URL}/img_srcs/btns/2048BeforeBtnImg.png`}/>
                        </Div>
                    </Div>
                </Div>
            </Mobile>
        </>
       
    )
}

export default GameSelectModal