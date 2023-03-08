// ===== import base =====
import React, { memo } from "react"
import styled, { css, keyframes } from "styled-components"
// import
// interface TileProps {
//     value: Value;
//     type: TileType
//     x: number;
//     y: number;
//   }

// ===== style =====
const appear = (x,y) => keyframes`
    0% {
        opacity: 0;
        transform: scale(0);
        transform: translate( ${ props => props.x}px, ${ props => props.y}px);
    }

    100% {
        opacity: 1;
        transform: scale(1);
        transform: translate( ${ props => props.x}px, ${ props => props.y}px);
    }
`

const grow = (x,y) => keyframes`
    0% {
        transform: scale(0);
        transform: translate( ${ props => props.x}px, ${ props => props.y}px );
    }

    50% {
        transform: scale(1.2);
        transform: translate( ${ props => props.x}px, ${ props => props.y}px );
    }

    100% {
        transform: scale(1);
        transform: translate( ${ props => props.x}px, ${ props => props.y}px );
    }
`

const TileOuter = styled.div`
    position: absolute;
    width: 106px;
    height: 106px;
    line-height: 106px;
    float: left;
    border-radius: 3px;
    background: rgba(238, 228, 218, 0.35);
    box-shadow: 0 0 30px 10px rgb(243 215 116 / 0%),
        inset 0 0 0 1px rgb(255 255 255 / 0%);
    transition: 100ms ease-in-out;
    transition-property: transform;

    transform: translate( ${ props => props.x}px, ${ props => props.y}px );

    // type에 따라 애니메이션 다르게
    ${props => {
        const type = props.type
        switch(type){
            case "new":
                return css`
                    // animation: ${appear} 200ms ease 100ms;
                    // animation-fill-mode: backwards;
                `
            case "merged":
                return css`
                    // animation: ${grow} 200ms ease 100ms;
                    // animation-fill-mode: backwards;
                `
        }
    }}
`

const TileInner = styled.div`
    border-radius: 3px;
    text-align: center;
    font-weight: bold;
    z-index: 10;
    font-size: 45px;

    ${props =>{
        const value = props.value
        switch(value){
            case 2:
                return css`
                    background: #eee4da;
                `
            case 4:
                return css`
                    background: #eee1c9;
                `
            case 8:
                return css`
                    color: #f9f6f2;
                    background: #f3b27a;
                `
            case 16:
                return css`
                    color: #f9f6f2;
                    background: #f69664;
                `
            case 32:
                return css`
                    color: #f9f6f2;
                    background: #f77c5f;
                `
            case 64:
                return css`
                    color: #f9f6f2;
                    background: #f75f3b;
                `
            case 128:
                return css`
                    color: #f9f6f2;
                    background: #edd073;
                `
            case 256:
                return css`
                    color: #f9f6f2;
                    background: #edcc62;
                `
            case 512:
                return css`
                    color: #f9f6f2;
                    background: #edc950;
                `
            case 1024:
                return css`
                    color: #f9f6f2;
                    background: #edc53f;
                `
            // 2048 이후
            default:
                return css`
                    color: #f9f6f2;
                    background: #edc22e;
                `
        }
    }}
`

const Tile = memo( (props) =>{
    // ===== props =====
    const value = props.value
    const type = props.type
    const x= props.x
    const y = props.y
    return(
        <TileOuter x={x} y={y} type={type}>
            <TileInner value={value}>{value}</TileInner>
        </TileOuter>
        // <TileOuter x={x} y={y}>
        //     <TileInner>2</TileInner>
        // </TileOuter>
    )
})

export default Tile