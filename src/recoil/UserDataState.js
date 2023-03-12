import {atom, selector} from "recoil"

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
export const logInUserDataState = atom({
    "key" : "logInUserDataState",
    "default" : {
        id: "",
        pw: "",
        autoLogin : false
    }
})