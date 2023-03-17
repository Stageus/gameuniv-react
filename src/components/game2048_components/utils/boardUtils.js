const INDICES = [0,1,2,3]

export const areEqual = (b1, b2) =>{
    return b1.every( (x) => b2.some( (y) => areTilesEqual(x,y)))
}

export const areTilesEqual = (t1, t2) =>{
    return(
        (t1 === null && t2 === null) ||
        ( (t1 && Object.keys(t1)?.length) === (t2 && Object.keys(t2)?.length) &&
        Object.keys(t1).every( (p) => t1[p] === t2[p]) )
    )
}


export const isGameOver = (tiles) =>{

    const tilesOnSamePosition = (tiles) =>{
        const tilesMap = {}
        for(let i=0; i<tiles.length; i++){
            const key = `${tiles[i].positionX}${tiles[i].positionY}`

            if(tilesMap[key]){
                return true
            }

            tilesMap[key] = true
        }

        return false
    }

    if(tiles.length < 16 || tilesOnSamePosition(tiles) ){
        return false
    }

    const movePossible = (arr1, arr2, getCoordinate )=> {
        return arr1.some( (x) => 
        arr2.some(
            (y) => getCoordinate(x) === getCoordinate(y) && x.value === y.value
        ))
    }

    for(let i=0; i<3; i++){
        if(
            movePossible(getRow(tiles,i), getRow(tiles, i+1), (x) => x.positionY)
            ||
            movePossible(getColumn(tiles,i), getColumn(tiles, i+1), (x) => x.positionX)
        ){
            return false
        }
    }

    return true
}

export const merge = (tiles) =>{
    let id = getNextId(tiles)
    let values = {}

    tiles.forEach( (v) => {
        const key = `${v.positionX}${v.positionY}`

        if(values[key]){
            const value = (v.value * 2 )
            values[key] = {...v, id: id++, value, type: "merged"}
        }
        else{
            values[key] = v
        }
    })

    return Object.values(values)
}

export const moveRight = (tiles) =>{
    return INDICES.map( (i) =>
        shiftHorizontally(getRow(tiles, i), "right")
    ).flat()
}

export const moveLeft = (tiles) =>{
    return INDICES.map ( (i) =>
        shiftHorizontally( getRow(tiles, i), "left")
    ).flat()
}

export const moveUp = (tiles) => {
    return INDICES.map( (i) =>
        shiftVertically( getColumn(tiles, i), "left")
    ).flat()
}

export const moveDown = (tiles) => {
    return INDICES.map( (i) =>
        shiftVertically( getColumn(tiles, i), "right")
    ).flat()
}

const shiftHorizontally = (line, direction ) =>{
    return shift(
        line,
        (v) => v.positionY,
        (v, position) => (v.positionY = position),
        direction
    )
}

const shiftVertically = (line, direction) => {
    return shift(
        line,
        (v) => v.positionX,
        (v, position) => (v.positionX = position),
        direction
    )
}

const shift = (line, getColumn, setColumn, direction) =>{
    if(line.length === 0){
        return []
    }
    let result = JSON.parse(JSON.stringify(line))
    result.sort( (v1,v2) => getColumn(v1) - getColumn(v2))

    const startPosition = direction === "left" ? 0 : 4 - result.length
    for(let i=0; i< result.length; i++){
        setColumn(result[i], startPosition + i)
    }

    direction === "left" && result.reverse()
    let i= result.length -1

    while( i>=1){
        if(result[i].value === result[i-1].value && result[i].value !== 2048){
            for( let j=0; j<= i-1; j++){
                const shift = direction === "right" ? 1 : -1
                setColumn( result[j], getColumn(result[j]) + shift)
            }
            i -= 2
            continue
        }

        i--
    }

    return result
}

export const generateBoard = (tilesCount = 2) =>{
    let tiles = []
    while(tilesCount>0){
        tiles = [...tiles, createRandomTile(tiles)]
        tilesCount--
    }

    return tiles
}

export const createRandomTile = (tiles) =>{
    const getCoordinates = (position) =>{
        const x = Math.floor(position / 4)
        const y = position % 4
        return [x,y]
    }

    Math.floor(Math.random() * 16)

    let position = Math.floor(Math.random() * 16)
    let coordinates = getCoordinates(position)
    while( isExists( tiles, ...coordinates) ){
        position = position === 15 ? 0 : position + 1
        coordinates = getCoordinates(position)
    }

    const value = Math.random() <= 0.2 ? 4 : 2

    return{
        id: getNextId(tiles),
        value,
        type: "new",
        positionX: coordinates[0],
        positionY: coordinates[1],
    }
}

const isExists = (tiles, positionX, positionY) =>{
    return tiles.some( 
        (x) => x.positionX === positionX && x.positionY === positionY)
}

export const getRow = (tiles, row) =>
    tiles.filter( (x) => x.positionX === row)


export const getColumn = (tiles, column) => 
    tiles.filter( (x) => x.positionY === column)

export const getNextId = (tiles) => {
    return getMaxId(tiles) + 1
}

export const getMaxId = (tiles) =>{
    return Math.max.apply( Math, [0, ...tiles.map( (x) => x.id ) ])
}

export const MOVES_MAP = {
    "up" : moveUp,
    "down": moveDown,
    "right": moveRight,
    "left": moveLeft
}