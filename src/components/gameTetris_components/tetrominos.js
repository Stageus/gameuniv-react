export const TETROMINOS ={
    0: {shape: [[0]], cellImg : null},
    I: {
        shape :[
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        cellImg : "img_srcs/game_img/tetris/jelly/cell/tetrominoCellI.png",
        tetrominoImg: "img_srcs/game_img/tetris/jelly/tetromino/tetrominoI.png"

    },
    J: {
        shape :[
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0]
        ],
        cellImg : "img_srcs/game_img/tetris/jelly/cell/tetrominoCellJ.png",
        tetrominoImg: "img_srcs/game_img/tetris/jelly/tetromino/tetrominoJ.png"

    },
    L: {
        shape :[
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L']
        ],
        cellImg : "img_srcs/game_img/tetris/jelly/cell/tetrominoCellL.png",
        tetrominoImg: "img_srcs/game_img/tetris/jelly/tetromino/tetrominoL.png"

    },
    O: {
        shape :[
            ['O', 'O'],
            ['O', 'O'],
        ],
        cellImg : "img_srcs/game_img/tetris/jelly/cell/tetrominoCellO.png",
        tetrominoImg: "img_srcs/game_img/tetris/jelly/tetromino/tetrominoO.png"

    },
    S: {
        shape :[
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],
        cellImg : "img_srcs/game_img/tetris/jelly/cell/tetrominoCellS.png",
        tetrominoImg: "img_srcs/game_img/tetris/jelly/tetromino/tetrominoS.png"
    },
    T: {
        shape :[
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0]
        ],
        cellImg : "img_srcs/game_img/tetris/jelly/cell/tetrominoCellT.png",
        tetrominoImg: "img_srcs/game_img/tetris/jelly/tetromino/tetrominoT.png"
    },
    Z: {
        shape :[
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0]
        ],
        cellImg : "img_srcs/game_img/tetris/jelly/cell/tetrominoCellZ.png",
        tetrominoImg: "img_srcs/game_img/tetris/jelly/tetromino/tetrominoZ.png"
    }
    
}

export const randomTetromino =()=>{
    const tetrominos ='IJLOSTZ'
    const randTetromino =tetrominos[Math.floor(Math.random()*tetrominos.length)]

    return TETROMINOS[randTetromino]
}