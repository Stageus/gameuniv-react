import {atom, selector} from "recoil"

// 컴포넌트

// 스테이트 역할 : 아이템 목록 변경
// default : store / dibsOn = 찜하다 / myItem
// 사용하는 컴포넌트 : Item.js / ItemContainer.js
export const whichItemComponentState = atom({
    "key" : "whichItemComponentState",
    "default": "store",
})

// 스테이트 역할 : 업적 목록 변경
// default : tetris / 2048
// 사용하는 컴포넌트 : Achievement.js / AchievementContainer.js 
export const whichAchievementComponentState = atom({
    "key" : "whichAchievementComponentState",
    "default": "tetris",
})


// 스테이트 역할 : 탭변경
// default : tab1 , tab2, tab3
// 사용하는 컴포넌트 : 
export const isTabOpenState = atom({
    "key" : "isTabOpenState",
    "default": "tab1"
})

// 스테이트 역할 : 아이템 선택 확인
// default : index
// 사용하는 컴포넌트 : ItemUnit.js
export const isClickUnitState = atom({
    "key" : "isClickUnitState",
    "default": null
})


// 스테이트 역할 : 아이템 자세히보기
// default : boolean
// 사용하는 컴포넌트 : Item.js
export const isItemDetailOpenState = atom({
    "key" : "isItemDetailOpenState",
    "default": false
})
