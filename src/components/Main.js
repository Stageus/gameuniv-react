// ===== import base =====
import React from "react"
import styled, {css} from "styled-components"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

// ===== import page =====
import Login from "../pages/Login"
import Find from "../pages/Find"
import SignUp from "../pages/SignUp"
import Home from "../pages/Home"
import Achievement from "../pages/Achievement"
import Item from "../pages/Item"
import Game2048 from "../pages/Game2048"
import NotFound from "../pages/NotFound"
import GameTetris from "../pages/GameTetris"
import Tetris from "../components/gameTetris_components/components/Tetris"


// ===== import component =====
import Bg from "./Bg"
import Ranking from "./Ranking"
import Modal from "./Modal"
import BtnAnimation from "./BtnAnimation"
import MobileRangking from "./MobileRanking"

// ===== import react router =====
import {Routes, Route, Link, useParams, useLocation, useNavigate} from "react-router-dom"

// ===== import hook =====
import { useSetModalState } from "../hooks/useSetModalState"
import {PC, Mobile, useMobile} from "../hooks/useMediaComponent"


// ===== import recoil =====
import { isModalOpenState ,whichModalState, whichRankingState } from "../recoil/ModalState"
import { isMobileRankingClickState } from "../recoil/MobileRankingState"

// ===== import style =====
import { Div } from "../styles/Div"
import { Img, ImgBtn } from "../styles/Img"
import { Button } from "../styles/Button"
import { P } from "../styles/P"


// ===== import style func =====
import { color } from "../styles/style"
import { userDataState } from "../recoil/UserDataState"
import { useGet, useGetData } from "../hooks/useFetch"


// ===== style =====
const MainStyle = styled.main`
    margin-left: 3%;
    margin-right: 3%;
    z-index:10;

`
const GameStartBeforeBtn = styled(ImgBtn)`
    position:absolute;
    &:hover{
        opacity: 0;
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`

const MobileRankingDiv = styled(Div)`
    animation: fadeInDownBig;
    animation-duration: 0.5s;
`

const LoginDiv = styled(Div)`
    animation: fadeInUpBig;
    animation-duration: 0.5s;
`

const GameStartDiv = styled(Div)`
    position: relative;
    right: ${props=>props.isMobile ?"75px": "160px"};
    margin : ${props=>props.isMobile ?"0 0 10px 0": "0 0 20px 0"};
`

//  ===== component =====

const Main = () =>{

    // ===== hooks =====
    const isMobile = useMobile()
    // ===== state =====
    const [isMouseHover, setMouseHover] = React.useState(false)
    const isMobileRankingClick = useRecoilValue(isMobileRankingClickState)
    const [userData, setUserData] = useRecoilState(userDataState)
    // ===== recoil state =====
    const setRanking = useSetRecoilState(whichRankingState)

    // const whichPage = useRecoilValue(whichPageState)
    const setModalState = useSetRecoilState(whichModalState)
    const setModalOpen = useSetRecoilState(isModalOpenState)
    // const data = useGetData("/auth/user")
    // console.log(data)
    //  ===== router =====
    const location = useLocation().pathname;
    const navigate = useNavigate()
    // ===== event =====
    //수정한 부분
    const gameStartBtnEvent = (e) =>{
        setModalState("gameSelectModal")
        setModalOpen(true)
    }

    const getUserData = async() =>{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/user`,
        {
            credentials: "include",
        })

        const result = await response.json()
        
        if(result.message){
            // alert(result.message)
        }
        else{
            // console.log(1)
            setUserData(result.data)
        }
    }
    
    React.useEffect( ()=>{
        if(location !== '/'){
            getUserData()
        }
        
        // console.log(1)
        return setModalOpen(false)
    },[location])
    // console.log(userData)
    // ===== event =====
    return(
        <MainStyle>
            {
                location !== "/2048"
                &&
                <Modal></Modal>
            }
            
            {/* PC */}
            <PC>
                <Div width="90%" min_width="1533px" height="calc(100vh - 155px);">
                    {/* 아마 랭킹 컴포넌트 자리 */}
                    {
                        location === "/2048" //
                        ?
                        <Routes>                            
                            <Route path="/2048" element = {<Game2048/>}/> 
                        </Routes>
                        : 
                        location === "/tetris"
                        ? 
                        <Routes>                            
                            <Route path="/tetris" element = {<Tetris/>}/> 
                        </Routes>
                        :
                        <React.Fragment>
                            <Div width="50%">
                                <Div width="100%" flex_direction="column" height="100%" margin="0 0 0 20px">
                                    {/* 게임시작 버튼 */}
                                    { 
                                        location==="/home" && 
                                        <GameStartDiv onClick={gameStartBtnEvent}>
                                            <ImgBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/gameStartAfterBtnImg.png`}/>
                                            <GameStartBeforeBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/gameStartBeforeBtnImg.png`}/>
                                        </GameStartDiv>
                                    }
                                    {/* 랭킹 판 */}
                                    {
                                        (location === "/" || location === "/home")
                                        &&
                                        <React.Fragment>
                                            <Ranking game="tetris"/>
                                            <Ranking game="2048"/>
                                        </React.Fragment>
                                    }
                                </Div>                                                
                            </Div>
                            <Div flex_direction = "column" width = "50%" height="100%">
                                <Routes>
                                    <Route path="/" element = {<Login/>}/>
                                    <Route path="/home" element = {<Home/>}/>
                                    <Route path="/signup" element = {<SignUp/>}/>
                                    <Route path="/idfind" element = {<Find which_find="idfind"/>} />
                                    <Route path="/pwfind" element = {<Find/>}/>
                                    <Route path="/item" element = {<Item/>}/>
                                    <Route path="/achievement" element = {<Achievement/>}/>
                                    <Route path="/*" element = {<NotFound/>} />
                                </Routes>
                            </Div>
                        </React.Fragment>
                    }
                </Div>
            </PC>
            {/* 모바일 */}
            <Mobile>
                <Div width="100%" flex_direction="column" height="850px">
                {/* 게임시작 버튼 */}
                { 
                    location==="/home" && 
                    (
                        (isMobileRankingClick === false) &&
                        <GameStartDiv isMobile={isMobile} onClick={gameStartBtnEvent}>
                            <ImgBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/gameStartAfterBtnImg.png`}/>
                            <GameStartBeforeBtn src={`${process.env.PUBLIC_URL}/img_srcs/btns/gameStartBeforeBtnImg.png`}/>
                        </GameStartDiv>
                    )
                }
                {
                    isMobileRankingClick
                    ?
                    <MobileRankingDiv width="95%" flex_direction="column" height="80%" justify_content="space-evenly">
                        <MobileRangking game="tetris"/>
                        <MobileRangking game="2048"/>
                    </MobileRankingDiv>
                    :
                    <React.Fragment>
                        <LoginDiv>
                            <Routes>
                                
                                <Route path="/" element = {<Login/>}/>
                                <Route path="/home" element = {<Home/>}/>
                                <Route path="/signup" element = {<SignUp/>}/>
                                <Route path="/idfind" element = {<Find which_find="idfind"/>} />
                                <Route path="/pwfind" element = {<Find/>}/>
                                <Route path="/item" element = {<Item/>}/>
                                <Route path="/achievement" element = {<Achievement/>}/>
                                <Route path="/2048" element = {<Game2048/>}/>
                                <Route path="/tetris" element = {<Tetris/>}/>
                                {/* 나머지 부분 추가해주시면 될듯 합니다 */}
                            </Routes>
                        </LoginDiv>
                    </React.Fragment>
                }
                </Div>
            </Mobile>
            <PC>
                <Bg location={location}></Bg>
            </PC>
        </MainStyle>
    )
}

export default Main

