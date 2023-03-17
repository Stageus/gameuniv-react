import React from "react"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { Navigate } from "react-router"

// ===== import hooks =====
import {PC, Mobile, useMobile} from "../hooks/useMediaComponent"
import {useSetModalState} from "../hooks/useSetModalState"

// ===== import component =====
import ScoreBoard from "../components/ScoreBoard"
import { Game } from "../components/game2048_components/components/Game/Game"

// ===== import style =====
import { Div } from "../styles/Div"
import { H1 } from "../styles/H1"
import { Button } from "../styles/Button"

// ===== import recoil =====
import { isLoginState } from "../recoil/DomainState"


// ===== style =====
const Container = styled(Div)`
    width: ${props => props.isMobile ? "300px": "500px"};
    margin: 0 auto;
`

//  ===== component =====
const Game2048 = () =>{
    const [score, setScore] = React.useState(0)
    const isMobile = useMobile()

    // 비정상 접근 막기
    const isLogin = useRecoilValue(isLoginState)

    if(!isLogin){
        return <Navigate to="/" replace={true}/>
    }
    return(
        <React.Fragment>
            <Game/>
        </React.Fragment>
        // <React.Fragment>
        //     <audio src={`${process.env.PUBLIC_URL}/sound/effect2048.wav`} id="effect_2048" controls></audio>
        //     <PC>
        //         <Div background_color="blue5" justify_content="flex-start" width="520px" height="770px"
        //         border_radius="10px" flex_direction="column">
        //             {/* 게임 헤더 부분 */}
        //             <Div width="95%" justify_content="space-between" margin="20px 0px" height="140px">
        //                 <Div flex_direction="column" width="35%" height="100%" 
        //                 align_items="flex-start" justify_content="space-between">
        //                     <Div width="100%" background_color="blue3" border_radius="5px" height="71px" margin="0 0 10px 0">
        //                         <H1 color="grayscale1" font_size="xl" font_weight="regular" >2048</H1>
        //                     </Div>
        //                     <Button font_size="xs" width="70%" height="38px" onClick={useSetModalState("retryGameModal")}>다시하기</Button>
        //                 </Div>
        //                 <Div width="45%" background_color="blue3" height="100%" border_radius="5px">
        //                     <ScoreBoard score={score}/>
        //                 </Div>
        //             </Div>
        //             {/* 게임 플레이 구현 부분 */}
        //                 <Container>
        //                     <Game setScore={setScore}></Game>
        //                 </Container>
        //         </Div>
        //     </PC>

        //     <Mobile>
        //         <Div background_color="blue5" justify_content="flex-start" width="330px" height="580px"
        //         border_radius="10px" flex_direction="column"> 
        //             {/* 게임 헤더 부분 */}
        //             <Div width="95%" justify_content="space-between" margin="20px 0px" height="120px">
        //                 <Div flex_direction="column" width="35%" height="100%" 
        //                 align_items="flex-start" justify_content="space-between">
        //                     <Div width="100%" background_color="blue3" border_radius="5px" height="71px" margin="0 0 10px 0">
        //                         <H1 color="grayscale1" font_size="xl" font_weight="regular" >2048</H1>
        //                     </Div>
        //                     <Button font_size="xs" width="70%" height="38px" onClick={useSetModalState("retryGameModal")}>다시하기</Button>
        //                 </Div>
        //                 <Div width="50%" background_color="blue3" height="100%" border_radius="5px">
        //                     <ScoreBoard score={score}/>
        //                 </Div>
        //             </Div>
        //             {/* 게임 플레이 구현 부분 */}
        //             <Container isMobile={isMobile}>
        //                 <Game setScore={setScore}></Game>
        //             </Container>
        //         </Div>
        //     </Mobile>
        // </React.Fragment>
    )
}
export default Game2048