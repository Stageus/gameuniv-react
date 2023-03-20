import {atom, selector} from "recoil"
import { recoilPersist } from "recoil-persist"

const {persistAtom } = recoilPersist()

// 스테이트 역할 : 상점 동적 데이터 저장
// default : 상점 동적 데이터
// 사용하는 컴포넌트 : ItemContainer.js /Store.js
export const scoreState = atom({
    "key" : "scoreState",
    "default": 0,
})

export const scoreDataState = atom({
    "key" : "scoreDataState",
    "default": {},
    // effects_UNSTABLE: [persistAtom]
})

export const isRetryState = atom({
    "key" : "isRetryState",
    "default": false,
})

