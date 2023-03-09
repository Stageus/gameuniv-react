// import style =====
import { color } from "../../../styles/style"


export const basicTheme = {
    totalBoxColor: color("blue5"),
    mainColor: color("blue3"), // 2048 다시하기 버튼 등
    boardColor: color("blue2"), // cell 감싸는
    cellColor: color("blue5"), // cell
    scoreBoxColor: color("blue3"), // 내 점수 상대 점수 감싸는 박스
    rankColor: color("blue3"), // 등수 색깔
    rankTextColor: color("grayscale1"), // 등수 font 색
    scoreColor: color("grayscale1"), //점수 색
    borderColor: color("green"), //내 점수 테두리
    titleColor: color("grayscale1"), //2048 버튼 글씨 색
    fontColor: color("grayscale7"), // id 학교 점수 글씨 색
    hoverColor: color("blue4"),
    cellfontColor: "#f9f6f2",
    n2: "#eee4da",
    n4: "#eee1c9",
    n8: "#f3b27a",
    n16: "#f69664",
    n32: "#f77c5f",
    n64: "#f75f3b",
    n128: "#edd073",
    n256: "#edcc62",
    n512: "#edc950",
    n1024: "#edc53f",
    n2048: "#edc22e",
}

export const pastelTheme = {
    totalBoxColor: "#FFCBC0",
    mainColor: "#FFABAB",
    boardColor: "#FFEDEF",
    cellColor: "#FFCBC0",
    scoreBoxColor: "#FFCACA",
    rankColor: "#D8D2F8",
    rankTextColor: color("grayscale1"),
    scoreColor: "#FFABAB",
    borderColor: "#DEF6A0",
    titleColor: color("grayscale1"),
    fontColor: color("grayscale1"),
    cellfontColor: "#f9f6f2",
    hoverColor: "#FF6666",
    n2: "#FCE9CD",
    n4: "#FCE9CD",
    n8: "#D8D2F8",
    n16: "#FEC7FE",
    n32: "#FDD5D9",
    n64: "#DEF1DC",
    n128: "#E5C1FF",
    n256: "#DEF6A0",
    n512: "#6DB5FF",
    n1024: "#B3F6DA",
    n2048: "#C0FCF6",
}

export const doodleTheme = {
    totalBoxColor: color("grayscale1"),
    mainColor: color("grayscale1"),
    boardColor: color("grayscale1"),
    cellColor: color("grayscale1"),
    scoreBoxColor: color("grayscale1"),
    rankColor: color("grayscale1"),
    rankTextColor: color("grayscale1"),
    scoreColor: color("grayscale1"),
    borderColor: color("green"),
    titleColor: color("grayscale1"),
    fontColor: color("grayscale7"),
    cell24fontColor: "#f9f6f2",
    cellfontColor: "#f9f6f2",
    hoverColor: color("grayscale1"),
    n2: color("grayscale1"),
    n4: color("grayscale1"),
    n8: color("grayscale1"),
    n16: color("grayscale1"),
    n32: color("grayscale1"),
    n64: color("grayscale1"),
    n128: color("grayscale1"),
    n256: color("grayscale1"),
    n512: color("grayscale1"),
    n1024: color("grayscale1"),
    n2048: color("grayscale1"),
}

export const theme = {
    basicTheme,
    pastelTheme,
    doodleTheme,
}

export default theme