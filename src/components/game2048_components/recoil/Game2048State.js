import {atom, selector} from "recoil"
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil"
import { areEqual, createRandomTile, generateBoard,
        isGameOver, merge, MOVES_MAP } from "../utils/boardUtils"

// 스테이트 역할 : tile 상태 정의
// default : {id value type positionX positionY}
export const isGetState = atom({
    "key": "isGetState",
    "default": true,
})

export const tileState = atom({
    "key" : "tileState",
    "default": {
        id: null,
        value: 2,
        type: null,
        positionX: 0,
        positionY: 0,
    },
})

// 스테이트 역할 : 게임 상황 정의
// default : {tiles, lastMove, status => "WIN" "GAME_OVER" "IN_PROGRESS" "PLAY_AFTER_WIN"}
export const gameState = atom({
    "key" : "gameState",
    "default": {
        tiles: [],
        lastMove: null,
        status: "IN_PROGRESS",
    },
})


// 스테이트 역할 : 재시작 계속 움직임 등 정의
// default : {type => "restart" "continue" "move" payload => "up" "right" "down" "left"}
export const gameActionType = atom({
    "key" : "gameActionType",
    "default": {
        type: null,
        payload: null,
    }
})

// gameState 초기상태 설정
const initState = (tilesCount = 2) => {

    return{
        tiles: generateBoard(tilesCount),
        lastMove: null,
        status: "IN_PROGRESS"
    }
}

// 

// 재시작 계속 키보드 움직임 등 정의
export const gameReducer = selector({
    "key" : "gameReducer",
    get : ({get}) => {
        const gameState = get(gameState)
        const gameActionType = get(gameActionType)

        switch (gameActionType.type){
            case "restart":{
                return initState()
            }

            case "move":{
                const move = MOVES_MAP[gameActionType.payload]
                let tiles = move(gameState.tiles)
                if( areEqual(gameState.tiles, tiles)){
                    return gameState
                }

                tiles = merge(tiles)
                tiles = [...tiles, createRandomTile(tiles)]
                const status = isGameOver(tiles) ? "GAME_OVER" : "IN_PROGRESS"
                // getGameStatus(tiles)
                const shouldChangeStatus = 
                    gameState.status !== "PLAY_AFTER_WIN" || status === "GAME_OVER"

                return{
                    tiles,
                    lastMove: gameActionType.payload,
                    status: shouldChangeStatus ? status : gameState.status
                }
            }
            default:{
                throw new Error(`Unhandled action : ${gameActionType}`)
            }
        }
    }
})