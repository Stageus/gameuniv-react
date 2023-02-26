import {atom, selector} from "recoil"


// 스테이트 역할 : 모달 오픈
// default : boolean
// 사용하는 컴포넌트 : Login.js / Main.js
export const isModalOpenState = atom({
    "key" : "isModalOpenState",
    "default": false,
})


// 스테이트 역할 : 모달 내부 내용 변경
// default : deleteAccountModal, developInfoModal, editProfileModal, gameOverModal,
// purchaseItemModal, quitGameModal, rankingModal, retryGameModal, selectGameModal, settingModal
// 사용하는 컴포넌트 : Modal.js
export const whichModalState = atom({
    "key" : "whichModalState",
    "default": "",
})
