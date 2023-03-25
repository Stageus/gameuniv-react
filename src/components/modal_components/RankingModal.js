// ===== import base =====
import React, { useCallback } from "react"
import { useInView } from "react-intersection-observer"
import styled, {css} from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import component =====

// ===== import recoil =====
import { whichRankingState } from "../../recoil/ModalState"
import { domainAddressState, imgDomainState, profilePathState } from "../../recoil/DomainState"
// ===== import style =====
import { Img, ImgBtn } from "../../styles/Img"
import { Div } from "../../styles/Div"
import { H1 } from "../../styles/H1"
import { P } from "../../styles/P"
// ===== import style func =====
import { color, fontSize, fontWeight } from "../../styles/style"


// ===== style =====
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

const RankScroll = styled(Div)`
    overflow-y:auto;
    justify-content: flex-start;
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

const RankingModal = () =>{
    // ===== recoil state =====
    const whichRanking = useRecoilValue(whichRankingState)
    const address = useRecoilValue(domainAddressState)
    const rank = Array.from({length:100}, (v,i)=>i+1);
    const img_domain = useRecoilValue(imgDomainState)
    const profile_path = useRecoilValue(profilePathState)
    const img_src = `${img_domain}/${profile_path}`

    // ===== state =====
    const [rankingData, setRankingData ] = React.useState([
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

    // 무한 스크롤 관련
    const [page, setPage] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [ref, inView] = useInView()

    // 랭킹 데이터 가져오기
    const getRankingData = useCallback( async() => {
        setLoading(true)
        const response = await fetch(`${address}/${whichRanking}/record/all?offset=${page}`,{
            credentials: "include"
        })

        const result = await response.json()
        if(result.data.length < 1){
            alert(result.message)
        }
        else{
            setRankingData(prevState => [...prevState, ...result.data])
            setLoading(false)
        }
    }, [page])

    React.useEffect( ()=>{
        getRankingData()
    }, [getRankingData])

    React.useEffect( ()=>{
        if(inView && !loading){
            setPage(prevState => prevState+1)
        }
    }, [inView, loading])

    // ===== event =====
    const imgErrorEvent = (e) =>{
        e.target.src = `${img_src}/defaultProfileImg0.png`
    }
    // console.log(rankingData)
    return(
        <Div width="611px" height="508px" align_items="flex-start">
            <Div width="90%" flex_direction="column" justify_content="flex-start" align_items="flex-start">
                <H1 font_size="xl" color="blue4" margin="0 0 10px 0">{whichRanking === "tetris" ? "Tetris" : 2048}</H1>
                {
                rankingData.length < 1
                ?
                <Div flex_direction="column" width="100%" height="400px">
                    이번 달 {whichRanking} 기록이 없습니다
                </Div>
                :
                <Div flex_direction="column" width="100%">
                {/* rank list name */}
                    <Div width="100%" justify_content="space-between" margin="0 0 5px 0">
                        <RankList>순위</RankList>                
                        <RankList>닉네임</RankList>
                        <RankList>대학</RankList>
                    </Div>
                {/* rank list */}
                    <RankScroll  flex_direction="column" width="100%" height="400px">
                        {
                            rankingData.map( (data, idx) =>{
                                return(
                                    <RankDiv width="100%" height="37px" justify_content="space-between" rank={idx+1}>
                                        <Div width= "33%" justify_content="flex_start">
                                            <RankP>{data.rank}</RankP>
                                            <ScoreP rank={idx+1}>{data.max_score}</ScoreP>
                                        </Div>
                                        
                                        <Div width="33%" justify_content="flex_start" >
                                            <Div width="26px" height="26px" background_color="grayscale1" border_radius="50%" margin="0 5px 0 0">
                                                <Img src={`${img_src}/${data.profile_img}`} onError={imgErrorEvent}
                                                width="20px" height="20px" border_radius="50%"/>
                                            </Div>
                                            <P font_weight="bold">{data.user_name}</P>
                                        </Div>
                                        <Div width="33%" justify_content="flex_start">
                                            <P>{data.university_name}</P>
                                        </Div>
                                    </RankDiv>
                                )
                            })
                        }
                        <Div ref={ref}></Div>
                    </RankScroll>
                </Div>
                }
            </Div>
        </Div>

    )
}

export default RankingModal