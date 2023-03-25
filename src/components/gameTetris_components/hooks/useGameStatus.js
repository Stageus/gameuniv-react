import {useState, useEffect, useCallback} from 'react'
import { useSetRecoilState } from "recoil"


import { tetrisScoreState} from "../../../recoil/DataState"

export const useGameStatus= rowsCleared =>{
    const [score, setScore] =useState(0)
    const [rows, setRows] =useState(0)
    const [level, setLevel] =useState(0)
    const setTetrisScore = useSetRecoilState(tetrisScoreState)
  

    // const linePoints = [100, 200]

    const calcScore = useCallback(()=>{
        if (rowsCleared > 0){
            setScore(prev => prev + 10000 *(level +1))
            setRows(prev => prev + rowsCleared)
            setTetrisScore(score)
        }

    }, [level, rowsCleared])

    useEffect(()=>{
        calcScore()
    }, [calcScore,rowsCleared,score])

    return [score, setScore, rows, setRows, level, setLevel]

}