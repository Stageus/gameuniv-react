import {atom, selector} from "recoil"


// 스테이트 역할 : 아이템 목록 변경
// default : store / dibsOn = 찜하다 / myItem
// 사용하는 컴포넌트 : Login.js / SignUp.js
export const whichItemComponentState = atom({
    "key" : "whichItemComponentState",
    "default": "store",
})

// 스테이트 역할 : 업적 목록 변경
// default : tetris / 2048
// 사용하는 컴포넌트 : Login.js / SignUp.js
export const whichAchivementComponentState = atom({
    "key" : "whichAchivementComponentState",
    "default": "tetris",
})