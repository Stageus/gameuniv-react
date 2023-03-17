// 볼륨 local storage에 저장
import React from "react"

const useVolumeControl = (key, initialState) =>{
    const [state, setState] = React.useState(
        () => JSON.parse(window.localStorage.getItem(key) || initialState)
    )

    React.useEffect( ()=>{
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
}

export default useVolumeControl