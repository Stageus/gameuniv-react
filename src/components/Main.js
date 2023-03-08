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
import { whichPageState } from "../../src/recoil/PageState"
import { isModalOpenState ,whichModalState } from "../recoil/ModalState"

// ===== import style =====
import { Div } from "../styles/Div"
import { Img, ImgBtn } from "../styles/Img"
import { Button } from "../styles/Button"
import { P } from "../styles/P"


// ===== import style func =====
import { color } from "../styles/style"

// ===== style =====
const BackDiv = styled(Div)`
    position:absolute;
    top: 90%;
    left:2%;

    ${props => props.isMobile &&css`
        position: relative;
        top: 90%;
        left: -40%;
    `}
`

const MainStyle = styled.main`
    width:100%;
    margin-left:auto;
    margin-right:auto;

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
const MobileRankingBtn = styled.button`
    display: flex;
    width: 196px;
    height: 46px;
    background-color: ${color("grayscale2")};
    box-shadow:0 0 3px 3px ${color("grayscale4")};
    border-radius:50px;
    justify-content:center;
    align-items: center;
    border: none;
    position:relative;
    bottom: -15%;
    cursor:pointer;
`

const Triangle = styled(Img)`
    transform:rotate(180deg);
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
    const [isMobileRankingClick, setMobileRanking] = React.useState(false)

    // ===== recoil state =====
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
    return(
        <MainStyle>
            <Modal></Modal>
            {/* PC */}
            <PC>
                <Div width="90%" min_width="1533px" height="calc(100vh - 101px);">
                    
                    {/* 아마 랭킹 컴포넌트 자리 */}
                    
                    {
                        location === "/2048"
                        ?
                        <Routes>
                            {/* <Route path="/" element = {<Login/>}/>
                            <Route path="/home" element = {<Home/>}/>
                            <Route path="/signup" element = {<SignUp/>}/>
                            <Route path="/idfind" element = {<Find which_find="idfind"/>} />
                            <Route path="/pwfind" element = {<Find/>}/>
                            <Route path="/item" element = {<Item/>}/>
                            <Route path="/achievement" element = {<Achievement/>}/> */}
                            <Route path="/2048" element = {<Game2048/>}/>
                            {/* 나머지 부분 추가해주시면 될듯 합니다 */}
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
                                    
                                </Routes>
                                <Link to={"/2048"}>
                                    2048
                                </Link>
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
                        <MobileRangking/>
                        <MobileRangking/>
                        <MobileRankingBtn onClick={()=>setMobileRanking(false)}>
                            <P color="grayscale6" font_weight="regular">
                            로그인 페이지로 이동
                            </P>
                            <Triangle src={`${process.env.PUBLIC_URL}/img_srcs/icons/triangleGrayIcon.png`}
                            width="20px" margin="5px 0 0 10px"/>
                        </MobileRankingBtn>
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
                        <MobileRankingBtn onClick={()=>setMobileRanking(true)}>
                            <P color="grayscale6" font_weight="regular">
                            현재 랭킹 확인
                            </P>
                            <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/triangleGrayIcon.png`}
                            width="20px" margin="5px 0 0 10px"/>
                        </MobileRankingBtn>
                    </React.Fragment>
                }
                </Div>
            </Mobile>
            {/* footer로 빼야할 듯 */}
            {
                (location === "/" || location === "/home")
                ||
                <BackDiv onClick={backBtnEvent} isMobile={isMobile}>
                    <BtnAnimation 
                    before_src={`${process.env.PUBLIC_URL}/img_srcs/btns/backBeforeBtnImg.png`}
                    after_src={`${process.env.PUBLIC_URL}/img_srcs/btns/backAfterBtnImg.png`}
                    />
                </BackDiv>
            }
            <PC>
                <Bg location={location}></Bg>
            </PC>
        </MainStyle>
    )
}

export default Main

