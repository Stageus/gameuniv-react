import {atom, selector} from "recoil"

// 스테이트 역할 : 모바일 랭킹 클릭 시 모바일 랭킹 출력
// default : false
// 사용하는 컴포넌트 : Footer.js / Main.js
export const isMobileRankingClickState = atom({
    "key" : "isMobileRankingClickState",
    "default": false
})
