// import style =====
import { color } from "./style"


export const basicTheme = {
    themeName: "basic",
    totalBoxColor: color("blue4"),
    mainColor: color("blue3"), 
    textColor: color("grayscale1"), 
    boardColor: color("grayscale1"), 

    borderColor: color("grayscale1"), //내 점수 테두리
    userBorderColor: color("green"), //내 점수 테두리
    otherBorderColor: color("grayscale3"),
    scoreBoxBgColor : color("grayscale1"),

}

export const pastelTheme = {
    themeName: "pastel",
    totalBoxColor: "#D8D2F8",
    textColor: color("grayscale1"), // 등수 font 색
    mainColor: "#FEC7FE",
    boardColor: "#FFEDEF",
    borderColor: color("grayscale1"),
    userBorderColor: "#DEF6A0",
    otherBorderColor: color("grayscale3"),
    scoreBoxBgColor : "#D8D2F8",

}

export const doodleTheme = {
    themeName: "doodle",
    totalBoxColor: color("grayscale1"),
    textColor: color("grayscale7"), // 등수 font 색
    mainColor: color("grayscale1"),
    boardColor: "#737373",
    borderColor: color("grayscale7"),
    userBorderColor: color("green"),
    otherBorderColor: color("grayscale3"),
    scoreBoxBgColor : color("grayscale1"),
  
}

export const jellyTheme = {
    themeName: "jelly",
    mainColor: "#FFF7CB",
    boardColor: "#FFFDF1",
    scoreBoxColor: "#FFF7CB",
    userBorderColor: '#F258FF',
    textColor: "#F258FF",
    borderColor: "#FFE973",
    otherBorderColor: color("grayscale3"),
  
}

export const retroTheme = {
    themeName: "retro",
    totalBoxColor: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/retroBg.png)`,
    mainColor: "#282828",
    boardColor: "none",
    borderColor: "none",
    textColor: color("grayscale1"),
    scoreBoxBgColor :color("grayscale1"),
    userBorderColor: color("green"), //내 점수 테두리

}

export const legoTheme = {
    themeName: "lego",
    totalBoxColor: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/legoBg.png)`,
    boardColor: "none",
    borderColor: "none",
    textColor: color("grayscale1"),
    scoreBoxBgColor :color("grayscale1"),
    userBorderColor: color("blue3"), //내 점수 테두리
}

export const theme = {
    basicTheme,
    pastelTheme,
    doodleTheme,
    jellyTheme,
    retroTheme,
    legoTheme
}

export default theme