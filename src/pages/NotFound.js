import React from "react"
import { Navigate } from "react-router"

const NotFound = () =>{
    alert("잘못된 접근입니다")
    return(
        <Navigate to="/" replace={true}/>
    )
}

export default NotFound