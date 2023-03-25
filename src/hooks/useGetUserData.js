import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { domainAddressState, isLoginState } from "../recoil/DomainState"
import { userDataState } from "../recoil/UserDataState"



export const useGetUserData = (data) =>{
    const address = useRecoilValue(domainAddressState)
    // const [user, setUser] = useRecoilState(userDataState)
    const isLogin = useRecoilValue(isLoginState)
    const [userData, setUserData] = React.useState( null )
    const getData  = async() => {
        const response = await fetch(`${address}/auth/user`,
        {
            credentials: "include",
        })

        const result = await response.json()
        
        if(result.message){
            // alert(result.message)
        }
        else{
            // setUser(result.data)
            setUserData(result.data)
            // console.log(user)
        }
    }

    React.useEffect(()=>{
        getData()
    }, [data])
    
    return userData
    
}
