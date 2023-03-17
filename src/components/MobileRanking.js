// ===== import base =====
import React from "react"
import styled, {css} from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"
import 'animate.css'

// ===== import component =====

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"

// ===== import style =====
import { Img, ImgBtn } from "../styles/Img"
import { Div } from "../styles/Div"
import { H1 } from "../styles/H1"
import { P } from "../styles/P"
// ===== import style func =====
import { color, fontSize, fontWeight } from "../styles/style"
import { domainAddressState } from "../recoil/DomainState"
import { useInView } from "react-intersection-observer"

// ===== style =====
const RankList = styled(P)`
    width:33%;
    font-size: ${fontSize("xxs")};
    ${fontWeight("regular")};
`

const RankP = styled(P)`
    margin-left:10px;
    font-size: ${fontSize("s")};
    ${fontWeight("bold")};
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

const RankScroll = styled(Div)`
    overflow-y:auto;
    justify-content: flex-start;
`

const RankingTotalBox = styled(Div)`
    min-width: 300px;
`

//  ===== component =====

const MobileRangking = (props) =>{
    // ===== props =====
    const game = props.game

    // ===== recoil state =====
    const address = useRecoilValue(domainAddressState)
    const rank = Array.from({length:100}, (v,i)=>i+1);

    // ===== state =====
    const[page2048, setPage2048] = React.useState(1)
    const[pageTetris, setPageTetris] = React.useState(1)
    const [loading2048, setLoading2048] = React.useState(false)
    const [loadingTetris, setLoadingTetris] = React.useState(false)
    const [ref2048, inView2048] = useInView()
    const [refTetris, inViewTetris] = useInView()
    const [rank2048, set2048] = React.useState([
        // {},
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
        // {},
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
    // 2048 랭킹 데이터 가져오기
    const getRankingData2048 = React.useCallback( async() =>{
        setLoading2048(true)
        const response = await fetch(`${address}/2048/record/all?offset=${page2048}`, {
            credentials: "include"
        })

        const result = await response.json()

        if(result.message || result.data.length < 1){
            alert(result.message)
        }
        else{
            set2048( prevState => [...prevState, ...result.data])
            setLoading2048(false)
            console.log(rank2048)
        }
        
    },[page2048])

    React.useEffect( ()=>{
        getRankingData2048()
    }, [getRankingData2048])

    React.useEffect( ()=>{
        if(inView2048 && !loading2048){
            setPage2048(prevState => prevState+1)
        }
    }, [inView2048, loading2048])

    // tetris 랭킹 데이터 가져오기
    const getRankingDataTetris = React.useCallback( async() =>{
        setLoading2048(true)
        const response = await fetch(`${address}/tetris/record/all?offset=${pageTetris}`, {
            credentials: "include"
        })

        const result = await response.json()

        if(result.message || result.data.length < 1){
            alert(result.message)
        }
        else{
            setTetris( prevState => [...prevState, ...result.data])
            setLoadingTetris(false)
        }
        
    },[page2048])

    React.useEffect( ()=>{
        getRankingDataTetris()
    }, [getRankingDataTetris])

    React.useEffect( ()=>{
        if(inViewTetris && !loadingTetris){
            setPageTetris(prevState => prevState+1)
        }
    }, [inViewTetris, loadingTetris])

    // console.log(rank2048)
    // console.log(rankTetris)
    return(
        <RankingTotalBox width="95%" height="300px" align_items="flex-start">
            <Div width="90%" flex_direction="column" justify_content="flex-start" align_items="flex-start"> 
                <H1 font_size="xl" color="blue4" margin="0 0 10px 0">{game === "tetris" ? "Tetris" : 2048}</H1>

                {
                    ( game === "tetris" && rankTetris.length <1 )
                    ?
                    <Div flex_direction="column" width="100%" background_color="grayscale2" height="220px">
                        이번 달 Tetris 기록이 없습니다.
                    </Div>
                    :
                    ( game === "2048" && rank2048.length <1 )
                    ?
                    <Div flex_direction="column" width="100%" background_color="grayscale2" height="220px">
                        이번 달 2048 기록이 없습니다.
                    </Div>
                    :
                    <Div flex_direction="column" width="100%" background_color="grayscale2">
                    {/* rank list name */}
                        <Div width="95%" justify_content="space-between" margin="10px 0 5px 0">
                            <RankList>순위</RankList>                
                            <RankList>아이디</RankList>
                            <RankList>대학</RankList>
                        </Div>
                    {/* rank list */}
                        <RankScroll ref={game==="tetris"? refTetris : ref2048} flex_direction="column" width="100%" height="220px">
                            {
                                game === "tetris"
                                ?
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
                                                    <Img src={data.profile_img}
                                                    width="20px"/>
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
                                (
                                rank2048.map( (data,idx) =>{
                                    return(
                                        <RankDiv width="100%" height="37px" justify_content="space-between" rank={idx+1}>
                                            <Div width= "33%" justify_content="flex_start">
                                                <RankP>{idx+1}</RankP>
                                                <ScoreP rank={idx+1}>{data.max_score}</ScoreP>
                                            </Div>
                                            
                                            <Div width="33%" justify_content="flex_start" >
                                                <Div width="26px" height="26px" background_color="grayscale1" border_radius="50%" margin="0 5px 0 0">
                                                    <Img src={data.profile_img}
                                                    width="20px"/>
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
                                
                            }
                        </RankScroll>
                    </Div>
                }
            </Div>
            
        </RankingTotalBox>

    )
}

export default MobileRangking