// ===== import base =====
import React, { useState } from 'react';
import times from 'lodash/times';
import styled from 'styled-components';

// ===== import recoil =====
import { useSetRecoilState } from 'recoil';
import { whichModalState } from '../../recoil/ModalState';
import { isModalOpenState } from '../../recoil/ModalState';

// ===== import hooks =====
import useMoveTile from './hooks/useMoveTile';
import { getInitialTileList } from './utils/tile';
import { MAX_POS } from './utils/constant';
import { useMobile } from '../../hooks/useMediaComponent';
// ===== import component =====
import Tile from './Tile';

// ===== import style func =====
import { color } from '../../styles/style';

// ===== import utils =====
import { checkGameOver } from './utils/tile';

const GameContainer = styled.div`
  margin-top: 40px;
  position: relative;
  padding: 15px;
  cursor: default;
  touch-action: none;
  background: ${color("blue2")};
  border-radius: 6px;
  width: ${props => props.isMobile ? "300px": "500px"};
  height: ${props => props.isMobile ? "300px": "500px"};
  box-sizing: border-box;
`
const GridContainer = styled.div`
  position: absolute;
  z-index: 1;
`

const GridRow = styled.div`
  margin-bottom:${props => props.isMobile ? "10px": "15px"};

  &:after{
    content:"";
    display: block;
    clear: both;
  }
`
const GridCell = styled.div`
  width: ${props => props.isMobile ? "57.5px": "106.25px"};
  height: ${props => props.isMobile ? "57.5px": "106.25px"};
  margin-right: ${props => props.isMobile ? "10px": "15px"};
  float: left;
  border-radius: 3px;
  background: ${color("blue5")};
`

const TileContainer = styled.div`
  position: absolute;
  z-index: 2;
`

const Game = ({ setScore }) =>{
  const [tileList, setTileList] = useState(getInitialTileList)
  
  const setModalState = useSetRecoilState(whichModalState)
  const setModalOpen = useSetRecoilState(isModalOpenState)
  const {isGameOver, isFull} = {...checkGameOver({tileList})}

  const isMobile = useMobile()

  if(isGameOver || isFull){
    setModalOpen(true)
    setModalState("gameOverModal")
  }
  // up, down, left, right 타일 움직이기
  // hook을 이용해 로직을 분리
  useMoveTile({tileList, setTileList,setScore }) // 훅을 만들어 관리
  return (
    <GameContainer isMobile={isMobile}>
      <GridContainer>
        {times(MAX_POS, y => (
          <GridRow key={y} isMobile={isMobile}>
            {times(MAX_POS, x => (
              <GridCell key={y * MAX_POS + x} isMobile={isMobile}></GridCell>
            ))}
          </GridRow>
        ))}
      </GridContainer>

      <TileContainer>
        {tileList.map(item => (
          <Tile key={item.id} {...item} />
        ))}
      </TileContainer>
    </GameContainer>
  );
}

export default Game