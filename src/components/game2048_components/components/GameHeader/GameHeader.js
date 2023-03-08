import React from "react";

import { useGameContext } from "../Game/Game";
import ScoresContainer from "../ScoresContainer/ScoresContainer"

const GameTitle = () => <span>2048</span>

const GameHeader = () =>{
    const { dispatch } = useGameContext()

    return(
        <div>
            <div>
                <GameTitle/>
            </div>
            <div>
                <ScoresContainer/>
                <button onClick={()=> dispatch({type:"restart"})}>New Game</button>
            </div>
        </div>

    )

}
export default GameHeader