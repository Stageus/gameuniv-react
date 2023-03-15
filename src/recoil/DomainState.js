import {atom, selector} from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()
// 스테이트 역할 : 도메인 주소 저장
// default : 도메인 주소
// 사용하는 컴포넌트 : 많은 곳
export const domainAddressState = atom({
    "key" : "domainAddressState",
    "default": "https://gameuniv.site"
})

// 스테이트 역할 : 이메인 도메인 주소 저장
export const imgDomainState = atom({
    "key" : "imgDomainState",
    "default": "https://jochong.s3.ap-northeast-2.amazonaws.com"
})

// 스테이트 역할 : 프로필 경로 저장
export const profilePathState = atom({
    "key" : "profilePathState",
    "default" : "gameuniv_user_profile"
})

// 로그인 상태 저장
// 용도 비정상적인 접근 막기
export const isLoginState = atom({
    "key" : "isLoginState",
    "default" : false,
    // effects_UNSTABLE: [persistAtom]
})