// ===== import base =====
import React from 'react';
import styled, {css, keyframes} from 'styled-components';

// ===== import style =====
const TileInner = styled.div`
  width: 107px;
  height: 107px;
  line-height: 107px;
  border-radius: 3px;
  background: #eee4da;
  text-align: center;
  font-weight: bold;
  z-index: 10;
  font-size: 55px;

  ${props => {
    const v = props.value
    switch(v){
      case 2:
        return css`
        color: #776e65;
        background: #eee4da;`
      case 4:
        return css`
        color: #776e65;
        background: #ede0c8;`
      case 8:
        return css`
        color: #f9f6f2;
        background: #f2b179;`  
      case 16:
        return css`
        color: #f9f6f2;
        background: #f59563;`  
      case 32:
        return css`
        color: #f9f6f2;
        background: #f67c5f;`  
      case 64:
        return css`
        color: #f9f6f2;
        background: #f65e3b;`
      case 128:
        return css`
        color: #f9f6f2;
        background: #edcf72;`
      case 256:
        return css`
        color: #f9f6f2;
        background: #edcc61;`
      case 512:
        return css`
        color: #f9f6f2;
        background: #edc850;`
      case 1024:
        return css`
        color: #f9f6f2;
        background: #edc53f;`    
      default:
        return css`
        color: #f9f6f2;
        background: #edc22e;`  
    }
  }}
`

const TileOuter = styled.div`
  width: 107px;
  height: 107px;
  line-height: 107px;
  border-radius: 3px;
  background: #eee4da;
  text-align: center;
  font-weight: bold;
  z-index: 10;
  font-size: 55px;

  position:absolute;
  transition: 100ms ease-in-out;
  transition-property: transform;
  margin-bottom: 15px;
  ${props=> {
    const x = props.x
    const y = props.y
    

    const location = (value) =>{
      if(value === 1) return "0px"
      else if(value === 2) return "121px"
      else if(value === 3) return "242px"
      else if(value === 4) return "363px"
    }
    return css`
      transform: translate(${location(x)}, ${location(y)});
    `
        
  }}

  ${props =>{

    const x = props.x
    const y = props.y
    const location = (value) =>{
      if(value === 1) return "0px"
      else if(value === 2) return "121px"
      else if(value === 3) return "242px"
      else if(value === 4) return "363px"
    }

    const isMerged = props.isMerged
    const isNew = props.isNew
    if(isMerged) return css`
      z-index:20;
      animation: ${pop(location(x), location(y))} 200ms ease 200ms;
      animation-fill-mode: backwards;
    `
    if(isNew) return css`
      z-index:20;
      animation: ${appear(location(x), location(y))} 200ms ease 200ms;;
      animation-fill-mode: backwards;
    `
  }}
`

const appear = (x,y) => keyframes`
  
  0% {
    opacity: 0;
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    transform: translate(${x}, ${y});
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    transform: translate(${x}, ${y});
  }
`
const pop = (x,y) => keyframes`
  0% {
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    transform: translate(${x}, ${y});
  }

  50% {
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
    transform: translate(${x}, ${y});
  }

  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    transform: translate(${x}, ${y});
  }
`

const Tile = ({ x, y, value, isMerged, isNew }) =>{
  return (
    <TileOuter x = {x} y = {y} isMerged={isMerged} isNew={isNew}>
        <TileInner value={value}>{value}</TileInner>
    </TileOuter>
    // // <div
    // //   className={cn(`tile tile-${value} tile-position-${x}-${y}`, {
    // //     'tile-merged': isMerged,
    // //     'tile-new': isNew,
    // //   })}
    // // >
      
    //   {/* <div className="tile-inner">{value}</div> */}
      
    // {/* </div> */}
  );
}

export default Tile