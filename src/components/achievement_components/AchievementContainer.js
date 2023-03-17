// ===== import base =====
import React from "react"
import {useEffect}  from "react"
import {useRecoilValue, useRecoilState} from "recoil"

// ===== import component =====
import AchievementUnit from "./AchievementUnit"

//  ===== import recoil =====
import { whichAchievementComponentState } from "../../recoil/ComponentState"
import { achievementTetrisDataState, achievement2048DataState } from "../../recoil/DataState"
import { domainAddressState} from "../../recoil/DomainState"

//  ===== component =====
const AchievementContainer = () =>{
    // ===== recoil state =====
    const address= useRecoilValue(domainAddressState)
    const whichAcheivementComponent= useRecoilValue(whichAchievementComponentState)
    const [achievementTetrisData,setAchievementTetrisData]=useRecoilState(achievementTetrisDataState)
    const [achievement2048Data,setAchievement2048Data]=useRecoilState(achievement2048DataState)

    const getAchievementDataEvent = async() =>{

        const response_tetris = await fetch(`${address}/achieve/all?game=tetris`,
        {
            credentials: "include"
        })
        const result_tetris = await response_tetris.json()

        const response_2048 = await fetch(`${address}/achieve/all?game=2048`,
        {
            credentials: "include"
        })
        const result_2048 = await response_2048.json()

        setAchievementTetrisData(result_tetris.data)
        setAchievement2048Data(result_2048.data)


        if(result_tetris.message){
            alert(result_tetris.message)
        }if(result_2048.message){
            alert(result_2048.message)
        }
    }

    // ===== hook =====
    useEffect(() => {
        getAchievementDataEvent()
    },[])

    return(
        <React.Fragment>
            {
            whichAcheivementComponent === "tetris" && 
            achievementTetrisData && achievementTetrisData.map((data, idx)=>{
                    return <AchievementUnit key={data} idx={idx}/>
                })
            }       

            {whichAcheivementComponent ==="2048" && 
            achievement2048Data && achievement2048Data.map((data, idx)=>{
                    return <AchievementUnit key={data} idx={idx}/>
                })
            }
        </React.Fragment>
    )
}

export default AchievementContainer