// ===== import base =====
import React, { useState } from 'react';
import times from 'lodash/times';
import styled from 'styled-components';

// ===== import hooks =====
import useMoveTile from './hooks/useMoveTile';
import { getInitialTileList } from './utils/tile';
import { MAX_POS } from './utils/constant';
import Tile from './Tile';

// ===== import style func =====
import { color } from '../../styles/style';

const GameContainer = styled.div`
  margin-top: 40px;
  position: relative;
  padding: 15px;
  cursor: default;
  touch-action: none;
  background: ${color("blue2")};
  border-radius: 6px;
  width: 500px;
  height: 500px;
  box-sizing: border-box;
`
const GridContainer = styled.div`
  position: absolute;
  z-index: 1;
`

const GridRow = styled.div`
  margin-bottom:15px;

  &:after{
    content:"";
    display: block;
    clear: both;
  }
`
const GridCell = styled.div`
  width: 106.25px;
  height: 106.25px;
  margin-right: 15px;
  float: left;
  border-radius: 3px;
  background: ${color("blue5")};
`

const TileContainer = styled.div`
  position: absolute;
  z-index: 2;
`

export default function Game({ setScore }) {
  const [tileList, setTileList] = useState(getInitialTileList);
  // up, down, left, right 타일 움직이기
  // hook을 이용해 로직을 분리
  useMoveTile({tileList, setTileList,setScore }); // 훅을 만들어 관리
  return (
    <GameContainer>
      <GridContainer>
        {times(MAX_POS, y => (
          <GridRow key={y}>
            {times(MAX_POS, x => (
              <GridCell key={y * MAX_POS + x}></GridCell>
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