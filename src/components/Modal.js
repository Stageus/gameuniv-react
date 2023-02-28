// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState, useRecoilState} from "recoil"

// ===== import modal component =====
import DeleteAcoountModal from "./modal_components/DeleteAcoountModal"
import DevelopInfoModal from "./modal_components/DevelopInfoModal"
import EditProfileModal from "./modal_components/EditProfileModal"
import GameOverModal from "./modal_components/GameOverModal"
import PurchaseItemModal from "./modal_components/PurchaseItemModal"
import QuitGameModal from "./modal_components/QuitGameModal"
import Ranking from "./Ranking"
import RetryGameModal from "./modal_components/RetryGameModal"
import GameSelectModal from "./modal_components/GameSelectModal"
import SettingModal from "./modal_components/SettingModal"
import ItemPurchaseModal from "./modal_components/ItemPurchaseModal"

// ===== import recoil =====
import { isModalOpenState, whichModalState } from "../recoil/ModalState"

// ===== import style =====
import { Img, ImgBtn } from "../styles/Img"
import { Div } from "../styles/Div"

// ===== import style func =====
import { color } from "../styles/style"
import RankingModal from "./modal_components/RankingModal"


// ===== style =====
const Overlay = styled(Div)`
    position:fixed;
    z-index:99;
    background-color: rgba(0,0,0,0.3);
    top:0;
    right:0;
    bottom: 0;
    left:0;

`

const CancelBtn = styled(ImgBtn)`
    width: 23px;
    margin: 5px;
    padding: 5px;
    border-radius: 50%;

    &:hover{
        background-color: ${color("blue5")};
        transition: 0.5s;
    }
`

//  ===== component =====
const Modal = (props) =>{
    // ===== recoil state =====
    const [isModalOpen, setModalOpen] = useRecoilState(isModalOpenState)
    const whichModal = useRecoilValue(whichModalState)

    // ===== event =====
    const modalEvent = (e)=>{
        const target = e.target.id

        switch(target){
            case "overlay":
                setModalOpen(!isModalOpen)
                break
            case "cancel_btn":
                setModalOpen(!isModalOpen)
                break
        }

    }

    return(
        <React.Fragment>
        {
            isModalOpen 
            &&
            <Overlay onClick={modalEvent} id="overlay">
                <Div background_color="grayscale1" 
                flex_direction="column" justify_content="flex-start" border_radius="3px">
                    {/* 수정된 부분 - 게임오버 모달은 끄기 비활성화*/}
                    { 
                        whichModal != "gameOverModal" && 
                            <Div width="100%" justify_content="flex-end">
                                <CancelBtn src= {`${process.env.PUBLIC_URL}/img_srcs/icons/crossGrayIcon.png`} id="cancel_btn"/>
                            </Div>
                    }
                    <main>
                        {/* 여기에 조건에 따라 모달 넣으면 될듯 합니다 */}
                        {/* width height는 각 모달에서 지정해주시면 됩니다. */}
                        { whichModal === "deleteAccountModal" && <DeleteAcoountModal/>}
                        { whichModal === "developInfoModal" && <DevelopInfoModal/>}
                        { whichModal === "editProfileModal" && <EditProfileModal/>}
                        { whichModal === "gameOverModal" && <GameOverModal/>}
                        { whichModal === "purchaseItemModal" && <PurchaseItemModal/>}
                        { whichModal === "quitGameModal" && <QuitGameModal/>}
                        { whichModal === "rankingModal" && <RankingModal/>}
                        { whichModal === "retryGameModal" && <RetryGameModal/>}
                        { whichModal === "gameSelectModal" && <GameSelectModal/>}
                        { whichModal === "settingModal" && <SettingModal/>}
                        { whichModal === "itemPurchaseModal" && <ItemPurchaseModal/>}
                    </main>
                </Div>
            </Overlay>
        }
        </React.Fragment>
        
    )
}

export default Modal
