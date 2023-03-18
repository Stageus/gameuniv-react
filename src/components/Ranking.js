// ===== import base =====
import React from "react"
import styled, {css} from "styled-components"
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil"

// ===== import component =====
import Login from "../pages/Login"
import Find from "../pages/Find"
import SignUp from "../pages/SignUp"
import Home from "../pages/Home"
import Achievement from "../pages/Achievement"
import Item from "../pages/Item"
import Bg from "./Bg"

// ===== import recoil =====
import { isModalOpenState, whichModalState, whichRankingState } from "../recoil/ModalState"
import { useSetModalState } from "../hooks/useSetModalState"
import { domainAddressState, imgDomainState, profilePathState } from "../recoil/DomainState"

// ===== import style =====
import { Div } from "../styles/Div"
import { Img, ImgBtn } from "../styles/Img"
import { H1 } from "../styles/H1"
import { P } from "../styles/P"

// ===== import style func =====
import { color, fontWeight, fontSize } from "../styles/style"


// ===== style =====
const RankHeader = styled(Div)`
    position: relative;
    
`
const RankImg = styled(Img)`
    position: absolute;
    filter: drop-shadow(5px 5px 5px ${color("grayscale4")});
    ${
        props =>{
            const game = props.game
            if(game === "tetris"){
                return css`
                    right: 0%;
                    top: -100px;
                    transform:rotate(30deg);
                `
            }
            else{
                return css`
                    right: 0%;
                    top: -30px;
                    transform:rotate(-15deg);
                `
            }
        }
    }
`

const RankList = styled(P)`
    width:33%;
    ${fontWeight("regular")};
`

const RankP = styled(P)`
    margin-left:10px;
    font-size: ${fontSize("s")};
    ${fontWeight("bold")};
`

const RankDiv = styled(Div)`
    ${
        props =>{
            const rank = props.rank
            if(rank % 2 === 1)
            return css`
                background-color: ${color("blue2")};
                border-radius: 3px;
            `
        }

    }
`

const ShowMore = styled(Div)`
    margin: 5px 0;
    align-items: flex-end;
    cursor:pointer;
`

const RankTotalBox = styled(Div)`
    z-index:10;
`

const ScoreP = styled(P)`
    margin-left: 10px;
    border-radius: 50px;
    width: 60px;
    text-align: center;
    font-size: ${fontSize("xxxs")};
    ${fontWeight("bold")};

    ${
        props =>{
            const rank = props.rank
            if(rank % 2 === 1){
                return css`
                    background-color: ${color("blue5")};
                `
            }
            else{
                return css`
                    background-color: ${color("grayscale3")};
                `
            }
        }

    }
`
//  ===== component =====

// 헤더 아이콘 크기가 너무크다고 생각 줄이는거 어떨지?
const Ranking = (props) =>{
    // ===== recoil state =====
    const game = props.game
    const setModalState = useSetRecoilState(whichModalState)
    const setModalOpen = useSetRecoilState(isModalOpenState)
    const [whichRanking, setRanking] = useRecoilState(whichRankingState)
    const address = useRecoilValue(domainAddressState)
    const img_domain = useRecoilValue(imgDomainState)
    const profile_path = useRecoilValue(profilePathState)
    const img_src = `${img_domain}/${profile_path}`
    // ===== state =====
    const [rank2048, set2048] = React.useState([
        {},
        // {
        //     id: "20481",
        //     profile_img: `${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`,
        //     max_score: 300,
        //     university_name: "인하대학교"
        // },
        // {
        //     id: "20482",
        //     profile_img: `${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`,
        //     max_score: 305,
        //     university_name: "인하대학교"
        // }
    ])

    const [rankTetris, setTetris] = React.useState([
        {},
        // {
        //     id: "test1",
        //     profile_img: `${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`,
        //     max_score: 300,
        //     university_name: "인하대학교"
        // },
        // {
        //     id: "test2",
        //     profile_img: `${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`,
        //     max_score: 305,
        //     university_name: "인하대학교"
        // }
    ])

    // ===== func =====
    // 랭킹 데이터 가져오기
    const getRankingData = React.useCallback( async() =>{
        const response2048 = await fetch(`${address}/2048/record/all?offset=${0}`,{
            credentials: "include"
        })
        const responseTetris = await fetch(`${address}/Tetris/record/all?offset=${0}`,{
            credentials: "include"
        })

        const result2048 = await response2048.json()
        const resultTetris = await responseTetris.json()

        if(result2048.message){
            // alert(result2048.message)
        }
        else{
            set2048(result2048.data)
        }
    
        if(resultTetris.message){
            // alert(resultTetris.message)
        }
        else{
            setTetris(resultTetris.data)
        }
    },[])

    React.useEffect( ()=>{
        getRankingData()
    }, [])

    // ===== event =====
    const showMoreBtnEvent = (e) =>{

        setModalState("rankingModal")
        setModalOpen(true)
        setRanking(game)
        
        // console.log(game, whichRanking)
    }
    // ===== variable =====
    // const rank = [1,2,3,4,5]

    return(
        <RankTotalBox flex_direction="column" max_width="596px" width="90%" background_color="blue1" padding="0 10px" margin="5px 0">
            <RankHeader width="100%" justify_content="flex-start">
                {
                    game === "tetris"
                    ?
                    <React.Fragment>
                        <H1 color="blue4" font_size="xl">Tetris</H1>
                        <RankImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/TetrisImg.png`}
                        width="100px" game={game}/>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <H1 color="blue4" font_size="xl">2048</H1>
                        <RankImg src={`${process.env.PUBLIC_URL}/img_srcs/imgs/2048Img.png`}
                        width="100px" game={game}/>
                    </React.Fragment>
                }
            </RankHeader>
            {/* rank list name */}
            <Div width="100%" justify_content="space-between" margin="0 0 5px 0">
                <RankList>순위</RankList>                
                <RankList>아이디</RankList>
                <RankList>대학</RankList>
            </Div>
            {/* rank list */}
            {

                game === "tetris"
                ?
                rankTetris.length < 1
                ?
                <Div width="100%" height="185px">
                    이번달 Tetris 기록이 없습니다
                </Div>
                :

                (
                rankTetris.map( (data,idx) =>{
                    return(
                        <RankDiv width="100%" height="37px" justify_content="space-between" rank={idx+1}>
                            <Div width= "33%" justify_content="flex_start">
                                <RankP>{idx+1}</RankP>
                                <ScoreP rank={idx+1}>{data.max_score}</ScoreP>
                            </Div>
                            
                            <Div width="33%" justify_content="flex_start" >
                                <Div width="26px" height="26px" background_color="grayscale1" border_radius="50%" margin="0 5px 0 0">
                                    <Img src= {`${img_src}/${data.profile_img}`}
                                    width="20px" height="20px" border_radius="50%"/>
                                </Div>
                                <P font_weight="bold">{data.id}</P>
                            </Div>
                            <Div width="33%" justify_content="flex_start">
                                <P>{data.university_name}</P>
                            </Div>
                        </RankDiv>
                    )
                    })
                )
                
                :
                rank2048.length < 1
                ?
                <Div width="100%" height="185px">
                    이번달 2048 기록이 없습니다
                </Div>
                :
                rank2048.map( (data,idx) =>{
                    return(
                        <RankDiv width="100%" height="37px" justify_content="space-between" rank={idx+1}>
                            <Div width= "33%" justify_content="flex_start">
                                <RankP>{idx+1}</RankP>
                                <ScoreP rank={idx+1}>{data.max_score}</ScoreP>
                            </Div>
                            
                            <Div width="33%" justify_content="flex_start" >
                                <Div width="26px" height="26px" background_color="grayscale1" border_radius="50%" margin="0 5px 0 0">
                                    <Img src={`${img_src}/${data.profile_img}`}
                                    width="20px" height="20px" border_radius="50%"/>
                                </Div>
                                <P font_weight="bold">{data.id}</P>
                            </Div>
                            <Div width="33%" justify_content="flex_start">
                                <P>{data.university_name}</P>
                            </Div>
                        </RankDiv>
                    )
                })
            }
                <ShowMore margin="5px 0" align_items="flex-end" onClick={showMoreBtnEvent} id="tetris">
                    <P font_size="xxxs" font_weight="regular" color="grayscale6" margin="0 3px 0 0">더보기</P>
                    <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/triangleGrayIcon.png`}
                    width="14px" margin="0 5px 0 0"/>
                </ShowMore>

        </RankTotalBox>
    )
}

export default Ranking