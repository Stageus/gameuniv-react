// ===== import base =====
import React, { useEffect } from "react"
import styled from "styled-components"

import { useGameContext } from "../Game/Game"
import { BoardProvider } from "./BoardProvider"



let startClientX = null
let startClientY = null

const BoardContainer = () =>{
    const { dispatch } = useGameContext()

    useEffect( () =>{
        const handleTouchStart = (e)=>{
            if(e.touches.length === 1){
                const startTouch = e.touches[0]
                startClientX = startTouch.startClientX
                startClientY = startTouch.startClientY
            }
        }

        const handleTouchEnd = (e)=>{
            if(!startClientX || !startClientY || e.touches.length > 0){
                return
            }

            const endTouch = e.changedTouches[0]
            let endClientX = endTouch.clientX
            let endClientY = endTouch.clientY

            let xDiff = startClientX - endClientX
            let yDiff = startClientY - endClientY

            if(Math.abs(xDiff) > Math.abs(yDiff)){

                if(xDiff < 0){
                    dispatch( { type: "move", payload: "right"})
                }
                else{
                    dispatch( { type: "move", payload: "left"})
                }
            }
            else{
                if(yDiff < 0){
                    dispatch( { type: "move", payload: "down"})
                }
                else{
                    dispatch( { type: "move", payload: "up"})
                }
            }
            startClientX = null
            startClientY = null
        }

        const boardContainer = document.getElementById("boardContainer")

        boardContainer.addEventListener("touchstart", handleTouchStart)
        boardContainer.addEventListener("touchend", handleTouchEnd)

        return () =>{
            boardContainer.removeEventListener("touchstart", handleTouchStart)
            boardContainer.removeEventListener("touchend", handleTouchEnd)
        }
    }, [dispatch] )

    return <BoardProvider/>
}

export default BoardContainer