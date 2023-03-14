import {atom, selector} from "recoil"

// 스테이트 역할 : 상점 동적 데이터 저장
// default : 상점 동적 데이터
// 사용하는 컴포넌트 : ItemContainer.js /Store.js
export const scoreState = atom({
    "key" : "scoreState",
    "default": 0
})