// ===== import base =====
import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { ScreenSizeBreakpoint, TilesScreenTransformFactor} from "../../constants/constants"

// ===== import component =====
import Tile from "./Tile"

// ===== style =====
const TileContainerStyle = styled.div`
    position: absolute;
    z-index: 2;
`


const TileList = (props) =>{
    return(
        <div>
            {
                props.tiles.map( (x)=>(
                    <Tile
                    key={x.id}
                    value = {x.value}
                    type = {x.type}
                    x = {x.positionY* props.factor}
                    y = {x.positionX * props.factor}
                    />
                ))
            }
        </div>
    )
}

const TileContainer = (props) => {
    const [factor, setFactor] = useState( calcFactor())

    useEffect( () =>{
        const handleResize = () =>{
            setFactor( calcFactor())
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const sortedTiles = props.tiles.sort( (t1,t2) => t1.id - t2.id)
    return(
        <TileContainerStyle>
            <TileList tiles={sortedTiles} factor={factor} />
        </TileContainerStyle>
    )
}

const calcFactor = () =>{
    if(window.innerWidth <= ScreenSizeBreakpoint.XS){
        return TilesScreenTransformFactor.XS
    }
    else{
        return TilesScreenTransformFactor.M
    }
    
}

export default TileContainer