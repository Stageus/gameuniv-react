import {atom, selector} from "recoil"

// 스테이트 역할 : 도메인 주소 저장
// default : 도메인 주소
// 사용하는 컴포넌트 : 많은 곳
export const domainAddressState = atom({
    "key" : "domainAddressState",
    "default": "https://gameuniv.site"
})
