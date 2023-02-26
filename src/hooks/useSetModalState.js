// ===== import base =====
import React from "react"
import styled from "styled-components"
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil"

// ===== import page =====

// ===== import component =====

// ===== import recoil =====
import { whichPageState } from "../../src/recoil/PageState"
import { isModalOpenState ,whichModalState } from "../recoil/ModalState"


//  ===== component =====

export const useSetModalState = (modal_name) =>{
    // ===== recoil state =====
    const [isModalOpen, setModalOpen] = useRecoilState(isModalOpenState)
    const setModalState = useSetRecoilState(whichModalState)

    const modalEvent = (e) =>{
        setModalState(modal_name)
        setModalOpen(!isModalOpen)
    }
    
    return modalEvent 
    
}
