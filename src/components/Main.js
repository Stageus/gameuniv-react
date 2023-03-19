// ===== import base =====
import React from "react"
import styled, {css} from "styled-components"
import { useRecoilValue, useSetRecoilState } from "recoil"

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


// ===== style =====
const MainStyle = styled.main`
    width:100%;
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
    right: 160px;
`

//  ===== component =====

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Main = () =>{
    // ===== hooks =====
    const isMobile = useMobile()
    // ===== state =====
    const [isMouseHover, setMouseHover] = React.useState(false)
    const isMobileRankingClick = useRecoilValue(isMobileRankingClickState)

    // ===== recoil state =====
    const setRanking = useSetRecoilState(whichRankingState)

    // const whichPage = useRecoilValue(whichPageState)
    const setModalState = useSetRecoilState(whichModalState)
    const setModalOpen = useSetRecoilState(isModalOpenState)

    //  ===== router =====
    const location = useLocation().pathname;
    const navigate = useNavigate()
    // ===== event =====
    //수정한 부분
    const gameStartBtnEvent = (e) =>{
        setModalState("gameSelectModal")
        setModalOpen(true)
    }

    // 뒤로가기 버튼
    const backBtnEvent = ()=>{
        
        if(location === "/2048"){
            setModalState("quitGameModal")
            setModalOpen(true)
        }
        else{
            navigate(-1)
        }
    }
    // ===== event =====
    return(
        <MainStyle>
            <Modal></Modal>
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
                                    { //수정한 부분
                                        location==="/home" && 
                                        <GameStartDiv margin="0 0 20px 0" onClick={gameStartBtnEvent}>
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
                
                <Div width="100%" flex_direction="column" height="940px">
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
                                {/* 나머지 부분 추가해주시면 될듯 합니다 */}
                            </Routes>
                        </LoginDiv>
                        <Link to={"/2048"}>
                            2048
                        </Link>
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

