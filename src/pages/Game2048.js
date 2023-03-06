import React from "react"
import Game from "../components/game2048_components/Game"
import useLocalStorageNumber from "../components/game2048_components/hooks/useLocalStorage"

import styled from "styled-components"


// ===== import hooks =====
import {PC, Mobile} from "../hooks/useMediaComponent"
import {useSetModalState} from "../hooks/useSetModalState"

// ===== import component =====
import ScoreBoard from "../components/ScoreBoard"


// ===== import style =====
import { Div } from "../styles/Div"
import { H1 } from "../styles/H1"
import { Button } from "../styles/Button"
// ===== style =====
const Container = styled(Div)`
    width: 500px;
    margin: 0 auto;
`

//  ===== component =====
const Game2048 = () =>{
    const [score, setScore] = React.useState(0)

    return(
        // <Div flex_direction="column" width="100%" >
        //     <Div>
        //         <Div>
        //             <H1></H1>
        //             <Button>다시하기</Button>
        //         </Div>
        //         <ScoreBoard score={score}/>
        //     </Div>
            
        //     <Container>
        //         <Game setScore={setScore}></Game>
        //     </Container>
        // </Div>
        <React.Fragment>
            <PC>
                <Div background_color="blue5" justify_content="flex-start" width="520px" height="770px"
                border_radius="10px" flex_direction="column">
                    {/* 게임 헤더 부분 */}
                    <Div width="95%" justify_content="space-between" margin="20px 0px" height="140px">
                        <Div flex_direction="column" width="35%" height="100%" 
                        align_items="flex-start" justify_content="space-between">
                            <Div width="100%" background_color="blue3" border_radius="5px" height="71px" margin="0 0 10px 0">
                                <H1 color="grayscale1" font_size="xl" font_weight="regular" >2048</H1>
                            </Div>
                            <Button font_size="xs" width="70%" height="38px">다시하기</Button>
                        </Div>
                        <Div width="45%" background_color="blue3" height="100%" border_radius="5px">
                            <ScoreBoard score={score}/>
                        </Div>
                    </Div>
                    {/* 게임 플레이 구현 부분 */}
                        <Container>
                            <Game setScore={setScore}></Game>
                        </Container>
                </Div>
            </PC>

            {/* <Mobile> */}
                {/* <Div background_color="blue5" justify_content="flex-start" width="440px" height="580px"
                border_radius="10px" flex_direction="column" margin="150px 0 0 0"> */}
                    {/* 게임 헤더 부분 */}
                    {/* <Div width="95%" justify_content="space-between" margin="20px 0px" height="135px">
                        <Div flex_direction="column" width="35%" height="100%" 
                        align_items="flex-start" justify_content="space-between">
                            <Div width="100%" background_color="blue3" border_radius="5px" height="71px" margin="0 0 10px 0">
                                <H1 color="grayscale1" font_size="xl" font_weight="regular" >2048</H1>
                            </Div>
                            <Button font_size="xs" width="70%" height="38px" onClick={useSetModalState("retryGameModal")}>다시하기</Button>
                        </Div>
                        <Div width="45%" background_color="blue3" height="100%" border_radius="5px">
                            <ScoreBoard/>
                        </Div>
                    </Div> */}
                    {/* 게임 플레이 구현 부분 */}
                    {/* <Div width="95%" height="80%" margin="0 0 20px 0" background_color="blue2" border_radius="5px">
                            sdsd
                    </Div>
                </Div> */}
            {/* </Mobile> */}
        </React.Fragment>
    )
}
export default Game2048