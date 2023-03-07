// ===== import base =====
import { useEffect } from "react";

// ===== import recoil =====
import { useSetRecoilState } from "recoil";

// ===== import recoil state =====
import { whichModalState, isModalOpenState } from "../../../recoil/ModalState";


// ===== import utils =====
import { makeTile, moveTile, checkGameOver } from "../utils/tile";
import { Effect } from "../utils/effect";

const useMoveTile = ({ tileList, setTileList, setScore }) => {
    useEffect(() => {
        
        const moveAndAdd = ({ x, y }) => { // 움직이고 추가까지
            
            const {isGameOver, isFull} = {...checkGameOver({tileList})}
            if( !isGameOver ){
                if(!isFull){
                    const newTileList = moveTile({ tileList, x, y, isFull }) // 타일을 움직여서 새로운 타일을 주는 .
                    // 움직인 다음에 추가
                    const score = newTileList.reduce(
                        (acc, item) => (item.isMerged ? acc + item.value : acc),
                        0,
                    );
                    setScore(v => v + score);
                
                    const newTile = makeTile(newTileList);
                    newTile.isNew = true;
                    newTileList.push(newTile);
                    setTileList(newTileList);
                }
                
            }
            else{
                
            }
            
        }
        const moveUp = () =>{
            moveAndAdd({ x: 0, y: -1 });
            
        }
        const moveDown = () =>{
            moveAndAdd({ x: 0, y: 1 });
        }
        const moveLeft = () => {
            moveAndAdd({ x: -1, y: 0 });
        }
        const moveRight = () => {
            moveAndAdd({ x: 1, y: 0 });
        }

        const keyDownEvent = (e)=>{
            // const effect = document.getElementById("effect2048")
            const effect = Effect
            switch (e.key){
                case "Down":
                case "ArrowDown":
                    moveDown()
                    effect.play()

                    break
                case "Up":
                case "ArrowUp":
                    moveUp()
                    effect.play()
                    break
                case "Left":
                case "ArrowLeft":
                    moveLeft()
                    effect.play()
                    break
                case "Right":
                case "ArrowRight":
                    moveRight()
                    effect.play()
                    break
            }
        }
        document.body.addEventListener("keydown", keyDownEvent)
        
        return () => {
            document.body.removeEventListener("keydown", keyDownEvent)
        };
    }, [tileList, setTileList, setScore]);
}

export default useMoveTile