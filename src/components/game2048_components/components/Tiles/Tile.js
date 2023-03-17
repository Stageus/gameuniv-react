// ===== import base =====
import React, { memo } from "react"
import styled, { css, keyframes } from "styled-components"

// ===== import hooks =====
import { useMobile } from "../../../../hooks/useMediaComponent"

// ===== import style =====
import { fontSize } from "../../../../styles/style"
import { doodleTheme } from "../../styles/theme"
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
    border-radius: 10px;
    transition: 100ms ease-in-out;
    transition-property: transform;

    transform: translate( ${ props => props.x}px, ${ props => props.y}px );

    // media query
    ${props => {
        if(props.isMobile){
            if(props.theme === doodleTheme){
                return css`
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                `
                
            }
            else{
                return css`
                    width: 64px;
                    height: 64px;
                    line-height: 64px;
                `
            }
        }
    }
    }

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

    ${props => props.theme === doodleTheme && css`
        border: 2px solid black;
        -webkit-text-stroke: 1px black;
    `}

`

const TileInner = styled.div`
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
    z-index: 10;
    font-size: 45px;

    ${props => props.isMobile && css`
        font-size: ${fontSize("m")};
    `}

    ${props =>{
        const value = props.value
        switch(value){
            case 2:
                return css`
                    color: ${props.theme.cell24fontColor};
                    background: ${props.theme.n2};
                `
            case 4:
                return css`
                    color: ${props.theme.cell24fontColor};
                    background: ${props.theme.n4};
                `
            case 8:
                return css`
                    color: ${props.theme.cellfontColor};
                    background: ${props.theme.n8};
                `
            case 16:
                return css`
                    color: ${props.theme.cellfontColor};
                    background: ${props.theme.n16};
                `
            case 32:
                return css`
                    color: ${props.theme.cellfontColor};
                    background: ${props.theme.n32};
                `
            case 64:
                return css`
                    color: ${props.theme.cellfontColor};
                    background: ${props.theme.n64};
                `
            case 128:
                return css`
                    color: ${props.theme.cellfontColor};
                    background: ${props.theme.n128};
                `
            case 256:
                return css`
                    color: ${props.theme.cellfontColor};
                    background: ${props.theme.n256};
                `
            case 512:
                return css`
                    color: ${props.theme.cellfontColor};
                    background: ${props.theme.n512};
                `
            case 1024:
                return css`
                    color: ${props.theme.cellfontColor};
                    background: ${props.theme.n1024};
                `
            // 2048 이후
            default:
                return css`
                    color: ${props.theme.cellfontColor};
                    background: ${props.theme.n2048};
                `
        }
    }}
`

const Tile = memo( (props) =>{
    const isMobile = useMobile()
    // ===== props =====
    const value = props.value
    const type = props.type
    const x= props.x
    const y = props.y
    return(
        <TileOuter x={x} y={y} type={type} isMobile={isMobile}>
            <TileInner value={value} isMobile={isMobile}>{value}</TileInner>
        </TileOuter>
    )
})

export default Tile