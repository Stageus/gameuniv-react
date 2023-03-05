// ===== import base =====
import React from "react"
import { useSetRecoilState} from "recoil"

// ===== import recoil =====
import { isModalOpenState} from "../../recoil/ModalState"
import { isItemDetailOpenState, isClickUnitState} from "../../recoil/ComponentState"
// ===== import style =====
import { Div } from "../../styles/Div"
import { P } from "../../styles/P"
import { Button } from "../../styles/Button"

//  ===== component =====
const ItemEquipModal = () =>{
    // ===== recoil state =====
    const setModalOpen = useSetRecoilState(isModalOpenState)
    const setItemDetailOpenStateState = useSetRecoilState(isItemDetailOpenState)
    const setClickUnitState = useSetRecoilState(isClickUnitState)
    // ===== event =====
    const confirmEvent=()=>{
        setModalOpen(false)
        setItemDetailOpenStateState(false)
        setClickUnitState(null)
    }

    return(
        <Div width="420px" height="250px" flex_direction="column" justify_content="center">
                <P font_size="m" color="grayscale7" font_weight="regular" margin="25px 0 30px 0">
                    해당 아이템이 착용되었습니다
                </P>
                <Button id="purchase_btn" width="120px" height="50px" font_size="m" font_weight="regular" onClick={confirmEvent}>
                    확인
                </Button>
        </Div>
    )
}

export default ItemEquipModal