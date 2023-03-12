import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====

// ===== import router =====
import { useNavigate } from "react-router"
import { useLocation } from "react-router"

// ===== import style =====
import {P} from "../../styles/P"

//  ===== component =====
const Timer = () =>{
    const [min,setMin] = React.useState(3)
    const [sec, setSec] = React.useState(0)
    const time = React.useRef(179)
    const timerId = React.useRef(null)

    React.useEffect( () => {
        timerId.current = setInterval( ()=>{
            setMin( Math.floor(parseInt(time.current)/ 60) )
            setSec( time.current % 60)
            time.current -= 1
        }, 1000)

        return () => clearInterval(timerId.current)
    }, [])

    // 시간 초과시
    React.useEffect( ()=>{
        if(time.current <=0){
            console.log("시간초과")
            clearInterval(timerId.current)
        }
    }, [sec])

    return(
        <React.Fragment>
        {
            sec < 10 
            ?
            <P>{min}:0{sec}</P>   
            :
            <P>{min}:{sec}</P>   
        }
        </React.Fragment>
        
        
    )
}

export default Timer