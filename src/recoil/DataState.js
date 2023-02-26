import {atom, selector} from "recoil"

// 스테이트 역할 : 상점 동적 데이터 저장
// default : 상점 동적 데이터
// 사용하는 컴포넌트 : ItemContainer.js /Store.js
export const storeDataState = atom({
    "key" : "storeDataState",
    "default": null,
})

// 스테이트 역할 : 찜목록 동적 데이터 저장
// default : 찜목록 동적 데이터
// 사용하는 컴포넌트 : ItemContainer.js /DibsOn.js
export const dibsOnDataState = atom({
    "key" : "dibsOnDataState",
    "default": null,
})

// 스테이트 역할 : 내아이템 동적 데이터 저장
// default : 내아이템 동적 데이터
// 사용하는 컴포넌트 : ItemContainer.js /MyItem.js
export const myItemDataState = atom({
    "key" : "myItemDataState",
    "default": null,
})

// 스테이트 역할 : 테트리스 업적 동적 데이터 저장
// default : 테트리스 업적 동적 데이터
// 사용하는 컴포넌트 : AchievementContainer.js /AchievementUnit.js
export const achievementTetrisDataState = atom({
    "key" : "achievementTetrisDataState",
    "default": null,
})

// 스테이트 역할 : 2048 업적 동적 데이터 저장
// default : 2048 업적 동적 데이터
// 사용하는 컴포넌트 : AchievementContainer.js /AchievementUnit.js
export const achievement2048DataState = atom({
    "key" : "achievement2048DataState",
    "default": null,
})

