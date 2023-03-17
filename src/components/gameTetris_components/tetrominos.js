export const TETROMINOS ={
    0: {shape: [[0]], cellImg : null},
    I: {
        shape :[
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        cellImg : "img_srcs/game_img/tetris/cell/tetrisJellyCellYellow.png"

    },
    J: {
        shape :[
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0]
        ],
        cellImg : "img_srcs/game_img/tetris/cell/tetrisJellyCellGreen.png"

    },
    L: {
        shape :[
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L']
        ],
        cellImg : "img_srcs/game_img/tetris/cell/tetrisJellyCellPurple.png"

    },
    O: {
        shape :[
            ['O', 'O'],
            ['O', 'O'],
        ],
        cellImg : "img_srcs/game_img/tetris/cell/tetrisJellyCellOrange.png"

    },
    S: {
        shape :[
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],
        cellImg : "img_srcs/game_img/tetris/cell/tetrisJellyCellRed.png"
    },
    T: {
        shape :[
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0]
        ],
        cellImg : "img_srcs/game_img/tetris/cell/tetrisJellyCellLightBlue.png"
    },
    Z: {
        shape :[
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0]
        ],
        cellImg : "img_srcs/game_img/tetris/cell/tetrisJellyCellBlue.png"
    }
    
}

export const randomTetromino =()=>{
    const tetrominos ='IJLOSTZ'
    const randTetromino =tetrominos[Math.floor(Math.random()*tetrominos.length)]

    return TETROMINOS[randTetromino]
}