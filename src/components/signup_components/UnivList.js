// ===== import base =====
import React from "react"
import styled from "styled-components"

// ===== import style =====
import { Input } from "../../styles/Input"



// ===== component =====
const UnivList = (props) =>{
    // ===== state =====
    const [univData, setUniv] = React.useState([])
    const [timer, setTimer] = React.useState(0)
    const univIdx = props.univIdx
    const setUnivIdx = props.setUnivIdx
    const setPostData = props.setPostData
    // 대학정보 불러오기 get
    React.useEffect( ()=>{

        const getUnivList = async() =>{
            const response = await fetch("http://gameuniv.site/university/all")
    
            const result = await response.json()
            const univ_data = result.data
            setUniv([...univ_data])
            return univ_data
        }
        getUnivList()
    },[])
    
    // console.log(univData)

    const changeEvent = () =>{
        if(timer){
            clearTimeout(timer)
        }
        const newTimer = setTimeout( async() => {
            const univ_name = (document.getElementById("univ").value)
            // console.log(document.getElementById("univ").label)
            const idx = univData.filter( data => {
                return data.university_name === univ_name
            })[0].university_idx
            setPostData( prevState => ({...prevState, universityIdx: idx}))
            // console.log(idx, univIdx)
        }, 300)
        setTimer(newTimer)
    }


    return(
        <React.Fragment>
            <Input width="100%" max_width="289px" height="28px" placeholder="대학교" font_size="xxs" padding="0 10px" margin="0 10px 0 0"
            list="univ_list" id="univ" onChange={changeEvent}/>
            <datalist id="univ_list">
                {
                    univData.map( data =>{
                        return <option  value={data.university_name}></option>
                    })
                }
            </datalist>
        </React.Fragment>
    )
}

export default UnivList
