import React from "react"

const API_URL = process.env.REACT_APP_API_URL

export const useGet = (url) => {
    const [data, setData] = React.useState(null)
    
    const get = async() =>{
        const response = await fetch(`${API_URL}${url}`,{
            credentials: "include",
        })
        const result = await response.json()
        if(!result.success){
            throw new Error(result.message)
        }
        else{
            setData(result.data)
        }
    }

    React.useEffect( ()=>{
        get()
    }, [])
    
    return data
}

export const usePost = (url) =>{
    const get = React.useCallback( async(body) =>{
        const response = await fetch(`${API_URL}${url}`,{
            method: "POST",
            credentials:"include",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(body),
        })

        const result = await response.json()
        if( !result.success){
            throw new Error(result.message)
        }
        else{
            return result.data
        }
    }, [url])

    return get
}

