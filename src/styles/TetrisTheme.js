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
    totalBoxColor: "#FFE973",
    mainColor: "#FFF7CB",
    boardColor: "#FFFDF1",
    cellColor: "#FFFDF1",
    scoreBoxColor: "#FFF7CB",
    rankColor: "#FAA9F0",
    rankTextColor: color("grayscale1"),
    scoreColor: "#FFF0A8",
    borderColor: "#F258FF",
    titleColor: "#F258FF",
    fontColor: color("grayscale7"),
    cell24fontColor: "#f9f6f2",
    cellfontColor: "#f9f6f2",
    hoverColor: "#FFF7CB",
    n2: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell2.png)`,
    n4: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell4.png)`,
    n8: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell8.png)`,
    n16: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell16.png)`,
    n32: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell32.png)`,
    n64: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell64.png)`,
    n128: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell128.png)`,
    n256: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell256.png)`,
    n512: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell512.png)`,
    n1024: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell1024.png)`,
    n2048: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/jelly/cell2048.png)`,
}

export const retroTheme = {
    totalBoxColor: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/retroBg.png)`,
    mainColor: "#282828",
    boardColor: "#282828",
    cellColor: "#282828",
    scoreBoxColor: "#282828",
    rankColor: color("grayscale1"),
    rankTextColor: color("grayscale7"),
    scoreColor: color("grayscale1"),
    borderColor: "#23D455",
    titleColor: "rgba(0,0,0,0)",
    fontColor: color("grayscale7"),
    cell24fontColor: color("grayscale7"),
    cellfontColor: color("grayscale7"),
    hoverColor: "#282828",
    n2: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell2.png)`,
    n4: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell4.png)`,
    n8: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell8.png)`,
    n16: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell16.png)`,
    n32: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell32.png)`,
    n64: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell64.png)`,
    n128: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell128.png)`,
    n256: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell256.png)`,
    n512: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell512.png)`,
    n1024: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell1024.png)`,
    n2048: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/retro/cell2048.png)`,
}

export const legoTheme = {
    totalBoxColor: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/legoBg.png)`,
    mainColor: "rgba(0,0,0,0)",
    boardColor: "#020051",
    cellColor: "#020051",
    scoreBoxColor: "#39DB00",
    rankColor: color("grayscale1"),
    rankTextColor: color("grayscale7"),
    scoreColor: color("grayscale1"),
    borderColor: "#3123D4",
    titleColor: "rgba(0,0,0,0)",
    fontColor: color("grayscale7"),
    cell24fontColor: color("grayscale7"),
    cellfontColor: color("grayscale7"),
    hoverColor: "#282828",
    n2: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell2.png)`,
    n4: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell4.png)`,
    n8: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell8.png)`,
    n16: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell16.png)`,
    n32: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell32.png)`,
    n64: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell64.png)`,
    n128: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell128.png)`,
    n256: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell256.png)`,
    n512: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell512.png)`,
    n1024: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell1024.png)`,
    n2048: `url(${process.env.PUBLIC_URL}/img_srcs/game_img/2048/lego/cell2048.png)`,
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