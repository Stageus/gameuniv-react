import {atom, selector} from "recoil"
import { recoilPersist } from "recoil-persist"

const {persistAtom } = recoilPersist()
// 스테이트 역할 : 회원가입 유저 정보 저장
// default : email, id, name, pw, pwCheck, universityIdx, defaultImg, profileImg
// 사용하는 컴포넌트 : signUp.js
export const signUpUserDataState = atom({
    "key" : "signUpUserDataState",
    "default": {
        email : "",
        id : "",
        name: "",
        pw: "",
        pwCheck: "",
        universityIdx: "",
        defaultImg: "",
        profileImg: []
    }
})


// 스테이트 역할 : 로그인 유저 정보
// default : email, id, name, pw, pwCheck, universityIdx, defaultImg, profileImg
// 사용하는 컴포넌트 : ItemContainer.js /Store.js
export const userDataState = atom({
    "key": "userDataState",
    "default":{
        id: "",
        email: "",
        profileImg: "",
        universityName: ""
    },
    effects_UNSTABLE: [persistAtom]
})

export const coinState = atom({
    "key" : "coinState",
    "default": 0,
    effects_UNSTABLE: [persistAtom]
})