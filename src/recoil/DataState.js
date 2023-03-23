import {atom, selector} from "recoil"

// 스테이트 역할 : 상점 동적 데이터 저장
// default : 상점 동적 데이터
// 사용하는 컴포넌트 : ItemContainer.js /Store.js
export const storeDataState = atom({
    "key" : "storeDataState",
    "default": null
})

// 스테이트 역할 : 찜목록 동적 데이터 저장
// default : 찜목록 동적 데이터
// 사용하는 컴포넌트 : ItemContainer.js /DibsOn.js
export const dibsOnDataState = atom({
    "key" : "dibsOnDataState",
    "default": null
})

// 스테이트 역할 : 내아이템 동적 데이터 저장
// default : 내아이템 동적 데이터
// 사용하는 컴포넌트 : ItemContainer.js /MyItem.js
export const myItemDataState = atom({
    "key" : "myItemDataState",
    "default": null
})

// 스테이트 역할 : 아이템 백엔드 인덱스 저장
// default : 아이템 백엔드 인덱스
// 사용하는 컴포넌트 : ItemContainer.js /ItemUnit.js
export const extraItemDataArrayState = selector({
    key: 'extraItemDataArrayState',
    get: ({ get }) => {
        const storeData = get(storeDataState);
        const extraItemDataArray = storeData.map(value=>
        [value.item_name, value.unlock_state, value.item_picked_state,value.item_bought_state]
        )
        return extraItemDataArray
    }
    });

// 스테이트 역할 : 테트리스 업적 동적 데이터 저장
// default : 테트리스 업적 동적 데이터
// 사용하는 컴포넌트 : AchievementContainer.js /AchievementUnit.js
export const achievementTetrisDataState = atom({
    "key" : "achievementTetrisDataState",
    "default": null
})

// 스테이트 역할 : 2048 업적 동적 데이터 저장
// default : 2048 업적 동적 데이터
// 사용하는 컴포넌트 : AchievementContainer.js /AchievementUnit.js
export const achievement2048DataState = atom({
    "key" : "achievement2048DataState",
    "default": null
})

// 스테이트 역할 : 아이템 인덱스 저장 -> 아이템 자세히보기를 위해
// default : item index
// 사용하는 컴포넌트 : ItemUnit.js
export const itemIndexDataState = atom({
    "key" : "itemIndexDataState",
    "default": null
})

// 스테이트 역할 : 게임 횟수 저장
// default : game_count
// 사용하는 컴포넌트 : AchievementContainer.js /AchievementUnit.js
export const gameCountDataState = atom({
    "key" : "gameCountDataState",
    "default": null
})



// 테트리스-------------------------------------------//


// 스테이트 역할 : 테트리스 점수 저장
// default : 테트리스 점수
// 사용하는 컴포넌트 : AchievementContainer.js /AchievementUnit.js
export const tetrisScoreState = atom({
    "key" : "tetrisScoreState",
    "default": null
})


// 스테이트 역할 : 앞뒤 자신 테트리스 점수 저장
// default : 테트리스 점수
// 사용하는 컴포넌트 : AchievementContainer.js /AchievementUnit.js
export const tetrisScoreDataState = atom({
    "key" : "tetrisScoreDataState",
    "default": {}
})



// 스테이트 역할 : 테트리스 점수 저장
// default : 테트리스 점수
// 사용하는 컴포넌트 : AchievementContainer.js /AchievementUnit.js
export const gameTetrisResultState = atom({
    "key" : "gameTetrisResultState",
    "default": null
})

// 스테이트 역할 : 게임오버 저장
// default : 테트리스 점수
// 사용하는 컴포넌트 : AchievementContainer.js /AchievementUnit.js
export const isGameOverState = atom({
    "key" : "isGameOverState",
    "default": null
})






