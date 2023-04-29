import React from "react"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { Navigate, useNavigate } from "react-router"

// ===== import hooks =====
import {PC, Mobile, useMobile} from "../hooks/useMediaComponent"
import {useSetModalState} from "../hooks/useSetModalState"

// ===== import component =====
import ScoreBoard from "../components/ScoreBoard"
import { Game } from "../components/game2048_components/components/Game/Game"

// ===== import style =====
import { Div } from "../styles/Div"
import { H1 } from "../styles/H1"
import { Button } from "../styles/Button"

// ===== import recoil =====
import { isLoginState } from "../recoil/DomainState"


// ===== style =====
const Container = styled(Div)`
    width: ${props => props.isMobile ? "300px": "500px"};
    margin: 0 auto;
`

//  ===== component =====
const Game2048 = () =>{
    const [score, setScore] = React.useState(0)
    const isMobile = useMobile()
    const navigate = useNavigate()

    React.useEffect( ()=>{
        return window.localStorage.removeItem("2048game")
    }, [])
    
    // 비정상 접근 막기
    const isLogin = useRecoilValue(isLoginState)
    
    React.useEffect( ()=>{
        if(!isLogin){
            alert("로그인 후 이용 가능합니다")
            navigate('/')
        }
    },[])
    
    return(
        <React.Fragment>
            <Game/>
        </React.Fragment>
    )
}
export default Game2048