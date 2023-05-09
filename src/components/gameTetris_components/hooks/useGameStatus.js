// ===== import base =====
import {useState, useEffect, useCallback} from 'react'
import { useSetRecoilState } from "recoil"

//  ===== import recoil =====
import { tetrisScoreState} from "../../../recoil/DataState"

// ===== custom hook =====
export const useGameStatus= (rowsCleared) =>{

    // ===== state =====
    const [score, setScore] =useState(0)
    const [rows, setRows] =useState(0)
    const [level, setLevel] =useState(1)
    const setTetrisScore = useSetRecoilState(tetrisScoreState)
  
    const calcScore = useCallback(()=>{
        if (rowsCleared > 0){
            setScore(prev => prev + (500 * (rowsCleared-(rowsCleared/2))))
            setRows(prev => prev + (rowsCleared-(rowsCleared/2)))
            setTetrisScore(score)
        }
    }, [level, rowsCleared])

    useEffect(()=>{
        calcScore()
    }, [calcScore,rowsCleared,score])

    return [score, setScore, rows, setRows, level, setLevel]
}