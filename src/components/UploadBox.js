// ===== import base =====
import React from "react"
import styled from "styled-components"

// ===== import style =====
import {H1} from "../styles/H1"
import {Div} from "../styles/Div"
import {Input} from "../styles/Input"
import {Button} from "../styles/Button"
import {P} from "../styles/P"
import { Img } from "../styles/Img"

// ===== import style func =====
import {color, fontWeight, fontSize} from "../styles/style"


// ===== style =====
const Label = styled.label`
    width: 142px; 
    height: 135px;
    border: 3px dashed ${color("blue3")};
    border-radius: 10px;
`

const FileInput = styled(Input)`
    text-decoration: none;
    display:none;
`
const ProfileImg = styled(Img)`
    background-color: ${color("grayscale1")};
    border-radius: 50%;
    cursor:pointer;

    &:hover{
        background-color: ${color("blue3")};
        transition: 0.5s;
    }
    &:not(:hover){
        transition: 0.5s;
    }
`

const UploadBox = () =>{

    // ===== state =====
    const [imgFile, setImgFile] = React.useState("")
    const imgRef = React.useRef()

    // ===== func =====
    const saveImgFile = () =>{
        const file = imgRef.current.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
            setImgFile(reader.result)
        }
    }
    console.log(imgFile)
    return(
        <React.Fragment>
            <Div  background_color="blue5" border_radius="3px" width="312px" height="188px">
            {/* 드래그 앤 드롭 박스 */}
            
                <label htmlFor="profileImg">
                    <FileInput type="file" accept=".jpg, .png" id="profileImg" onChange={saveImgFile} ref={imgRef}/>
                    {
                        imgFile === ""
                        ?
                        // {/* 이미지 업로드 전 */}
                        <Div width="142px" height="135px" border={`3px dashed ${color("blue3")}`} border_radius="10px">
                            <Div flex_direction="column" height="100%">
                                <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/upLoadIcon.png`} width="26px"/>
                                <P color="blue3" font_size="xxxs" font_weight="regular" padding="15px 0 0 0">Upload File (jpg,png)</P>
                                <P color="blue3" font_size="xxxs" font_weight="regular" padding="3px 0 0 0">용량 5MB이하</P>
                                <P color="blue3" font_size="xxxs" font_weight="regular" padding="3px 0 0 0">이미지 크기 5000px이하</P>
                            </Div>
                            
                        </Div>
                        :
                        // {/* 이미지 업로드 후 */}
                        <Div width="142px" height="135px">
                            <Div width="128px" height="128px" background_color="grayscale1" border_radius="50%">
                                <Img src={imgFile ? imgFile :`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`}
                                width="100px" height="100px" border_radius="50%"/>    
                            </Div>
                        </Div>
                    }
                </label>
                {/* 프로필 이미지 */}
                <Div flex_direction="column" >
                    <Div>
                        <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`} width="47px" padding= "8px" margin= "5px"/>
                        <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg1.png`} width="47px" padding= "8px" margin= "5px"/>
                    </Div>
                    <Div>
                        <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`} width="47px" padding= "8px" margin= "5px"/>
                        <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg1.png`} width="47px" padding= "8px" margin= "5px"/>
                    </Div>
                </Div>
            </Div>
        </React.Fragment>
    )
}

export default UploadBox