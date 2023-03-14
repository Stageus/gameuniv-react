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
// purchaseItemModal, quitGameModal, rankingModal, retryGameModal, selectGameModal, settingModal ,gameSelectModal, gameOverModal, itemPurchaseModal
// 사용하는 컴포넌트 : Modal.js
export const whichModalState = atom({
    "key" : "whichModalState",
    "default": "",
})

// 스테이트 역할 : 랭킹 내용 출력
// default : tetris, 2048
// 사용하는 컴포넌트 : Ranking.js / RankingModal.js
export const whichRankingState = atom({
    "key" : "whichRankingState",
    "default": "tetris",
})