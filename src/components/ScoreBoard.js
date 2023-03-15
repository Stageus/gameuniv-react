// ===== import base =====
import React from "react"
import styled from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"

// ===== import recoil =====
import { whichPageState } from "../recoil/PageState"
import { isModalOpenState, whichModalState } from "../recoil/ModalState"
import { useSetModalState } from "../hooks/useSetModalState"

// ===== import style =====
import {H1} from "../styles/H1"
import {Img} from "../styles/Img"
import {Div} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P} from "../styles/P"

// ===== import hooks =====
import {PC, Mobile} from "../hooks/useMediaComponent"

// ===== import style func ====
import { color } from "../styles/style"
import { domainAddressState } from "../recoil/DomainState"

// ===== style =====
const MyScore = styled(Div)`
    width: 95%;
    height: 40px;
    background-color: ${color("grayscale1")};
    border-radius: 10px;
    justify-content: space-around;
    border: 3px solid ${color("green")};
`
const OtherScore = styled(Div)`
    width: 70%;
    height: 31px;
    background-color: ${color("grayscale1")};
    border-radius: 10px;
    justify-content: space-around;
    border: 2px solid ${color("grayscale3")};
`

const MyScoreMobile = styled(Div)`
    width: 95%;
    height: 35px;
    background-color: ${color("grayscale1")};
    border-radius: 10px;
    justify-content: space-around;
    border: 3px solid ${color("green")};
`

const OtherScoreMobile = styled(Div)`
    width: 70%;
    height: 24px;
    background-color: ${color("grayscale1")};
    border-radius: 10px;
    justify-content: space-around;
    border: 2px solid ${color("grayscale3")};
`

//  ===== component =====
const ScoreBoard = (props) =>{
    
    const score = props.score
    
    return(
        <React.Fragment>
            <Div flex_direction="column" width="100%" height="100%" justify_content="space-evenly">
                <PC>
                    <OtherScore>
                        <Div border_radius="50%" width="20px" height="20px" background_color="blue3">
                            <P color="grayscale1" font_weight="bold" font_size="xxs">34</P>
                        </Div>
                        <Div flex_direction="column">
                            <P font_weight="bold" font_size="xxs">sfsd</P>
                            <Div> 
                                <Img src={`${process.env.PUBLIC_URL}/img_srcs/univ_logos/ajouUniversityLogoImg.png`} width="13px"/>
                                <P font_weight="regular" font_size="xxxs">인하대학교</P>
                            </Div>
                        </Div>
                        <P font_weight="bold" font_size="xs">
                            29000
                        </P>
                    </OtherScore>
                    <MyScore>
                        <Div border_radius="50%" width="34px" height="34px" background_color="blue3">
                            <P color="grayscale1" font_weight="bold" font_size="s">34</P>
                        </Div>
                        <Div flex_direction="column">
                            <P font_weight="bold">tmdgns97</P>
                            <Div> 
                                <Img src={`${process.env.PUBLIC_URL}/img_srcs/univ_logos/ajouUniversityLogoImg.png`} width="13px"/>
                                <P font_weight="regular" font_size="xxxs">아주대학교</P>
                            </Div>
                        </Div>
                        <P font_weight="bold" font_size="m">
                            {score}
                        </P>
                    </MyScore>
                    <OtherScore>
                        <Div border_radius="50%" width="20px" height="20px" background_color="blue3">
                            <P color="grayscale1" font_weight="bold" font_size="xxs">34</P>
                        </Div>
                        <Div flex_direction="column">
                            <P font_weight="bold" font_size="xxs">tmdgns97</P>
                            <Div> 
                                <Img src={`${process.env.PUBLIC_URL}/img_srcs/univ_logos/ajouUniversityLogoImg.png`} width="13px"/>
                                <P font_weight="regular" font_size="xxxs">아주대학교</P>
                            </Div>
                        </Div>
                        <P font_weight="bold" font_size="xs">
                            29000
                        </P>
                    </OtherScore>
                </PC>

                <Mobile>
                    <OtherScoreMobile>
                        <Div border_radius="50%" width="15px" height="15px" background_color="blue3">
                            <P color="grayscale1" font_weight="regular" font_size="xxxs">34</P>
                        </Div>
                        <Div flex_direction="column">
                            <P font_weight="regular" font_size="xxxs">tmdgns97</P>
                            <Div> 
                                <P font_weight="light" font_size="xxxs">아주대학교</P>
                            </Div>
                        </Div>
                        <P font_weight="regular" font_size="xxxs">
                            29000
                        </P>
                    </OtherScoreMobile>
                    <MyScoreMobile>
                        <Div border_radius="50%" width="15px" height="15px" background_color="blue3">
                            <P color="grayscale1" font_weight="regular" font_size="xxxs">34</P>
                        </Div>
                        <Div flex_direction="column">
                            <P font_weight="regular" font_size="xxs">tmdgns97</P>
                            <Div> 
                                <P font_weight="light" font_size="xxxs">아주대학교</P>
                            </Div>
                        </Div>
                        <P font_weight="bold" font_size="xxs">
                            {score}
                        </P>
                    </MyScoreMobile>
                    <OtherScoreMobile>
                        <Div border_radius="50%" width="15px" height="15px" background_color="blue3">
                            <P color="grayscale1" font_weight="regular" font_size="xxxs">34</P>
                        </Div>
                        <Div flex_direction="column">
                            <P font_weight="regular" font_size="xxxs">tmdgns97</P>
                            <Div> 
                                <P font_weight="light" font_size="xxxs">아주대학교</P>
                            </Div>
                        </Div>
                        <P font_weight="regular" font_size="xxxs">
                            29000
                        </P>
                    </OtherScoreMobile>
                </Mobile>
            </Div>
        </React.Fragment>
    )
}
export default ScoreBoard