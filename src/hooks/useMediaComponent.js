import React from "react"
import { useMediaQuery } from "react-responsive"



//태그형 미디어쿼리

const Mobile = ({children}) => {
    const isMobile = useMediaQuery({
        query : "(max-width:473px)"
    });
    return <React.Fragment>{isMobile && children}</React.Fragment>
}

const PC = ({children}) => {
    const isPc = useMediaQuery({
        query : "(min-width:474px)"
    });
    return <React.Fragment>{isPc && children}</React.Fragment>
}

export  {Mobile,PC};




//상태형 미디어쿼리

export const useMobile=()=>{

    const isMobile = useMediaQuery({
        query : "(max-width:473px)"
    });

    return isMobile
}

export const usePc=()=>{

    const isPc = useMediaQuery({
        query : "(min-width:474px)"
    });

    return isPc
}

