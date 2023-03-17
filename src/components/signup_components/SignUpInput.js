// ===== import base =====
import React from "react"

// ===== import component =====

// ===== import recoil =====

// ===== import hooks =====

// ===== import react router =====

// ===== import style =====
import { Input } from "../../styles/Input"

// ===== import style func =====


// ===== style =====


//  ===== component =====
const SignUpInput = (props) =>{

    const obj_id = props.id
    // ===== state =====
    const [data, setData] = React.useState(props.postDataState[obj_id])
    // ===== props =====
    const postDataState = props.postDataState
    const setPostData = props.setPostData

    const type_check = (props.id==="pw" || props.id ==="pwCheck")
    // ===== event =====

    const inputChangeEvent = (e) =>{
        const target = e.target.id
        const value = e.target.value
        setData(value)
        // setPostData( (prevState) => ({
        //     ...prevState, [target]: value,
        // }))
        // console.log(postDataState)
    }

    return(
        <React.Fragment>
                <Input width="100%" max_width="289px" height="28px" placeholder={props.placeholder} font_size="xxs" padding="0 10px" margin="0 10px 0 0"
                id={props.id} maxLength={props.max_length} value={data} onChange={inputChangeEvent}
                type = {type_check ? "password": "text"}/>
        </React.Fragment>
    )
}
export default SignUpInput