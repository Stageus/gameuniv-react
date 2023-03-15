// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"
import { useNavigate } from "react-router"
// ===== import component =====

// ===== import recoil =====
import { domainAddressState } from "../../recoil/DomainState"
import { isModalOpenState } from "../../recoil/ModalState"

// ===== import style =====
import { Img, ImgBtn } from "../../styles/Img"
import { Div } from "../../styles/Div"
import { H1 } from "../../styles/H1"
import { P } from "../../styles/P"
import { Button } from "../../styles/Button"

// ===== import style func =====
import { color } from "../../styles/style"




// ===== style =====

//  ===== component =====

const DeleteAcoountModal = () =>{
    // ===== recoil state =====
    const address = useRecoilValue(domainAddressState)
    const setModalOpen = useSetRecoilState(isModalOpenState)
    const navigate = useNavigate()

    const deleteAccountEvent = async() =>{
        // const response = await fetch(`${address}/user/${email}`,{
        //     method: "DELETE"
        // })

        // const result = await response.json()

        // if(result.message){
        //     alert(result.message)
        // }
        // else{
        //     setModalOpen(false)
        //     navigate("/")
        //     alert("계정삭제 성공")
        // }
    }
    return(
        <Div width="330px" height="287px" flex_direction="column" justify_content="space-evenly">
            <Div flex_direction="column" align_items="flex-start">
                <H1 font_size="m" color="grayscale7" font_weight="regular" margin="0 0 10px 0">계정 삭제</H1>
                <P>정말로 계정을 삭제하시겠습니까?</P>
                <P>계정이 삭제되면 다시 복구할 수 없습니다.</P>
            </Div>
            <Button onClick={deleteAccountEvent}
            width="107px" height="43px" font_size="xs" font_weight="light" btn_type="red">계정삭제</Button>
        </Div>
    )
}

export default DeleteAcoountModal