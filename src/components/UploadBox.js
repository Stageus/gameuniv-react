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

const PreviewImg = styled(Img)`
    width:100px;
    border-radius:50%;
    max-height:100px;
`

const UploadBox = () =>{

    // ===== state =====
    const [imgFile, setImgFile] = React.useState("")
    const imgRef = React.useRef()

    // ===== func =====
    const fileCheck = (file) =>{
        const reader = new FileReader()
        const max_size = 5*1024*1024
        const file_size = file.size
        const file_regex = /(\.png|\.jpg|\.jpeg)$/i
        const file_check = file_regex.test(file.name)
        
        if( file_size > max_size){
            alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다")
        }
        else if( !file_check){
            alert("올바른 확장자가 아닙니다. jpg 또는 png파일만 올려주십시오")
        }
        else{
            reader.readAsDataURL(file)
            reader.onloadend = () =>{
                setImgFile(reader.result)
            }
        }
    }

    const saveImgFile = () =>{
        const file = imgRef.current.files[0]
        fileCheck(file)
    }

    const imgDrop = (e) =>{
        e. preventDefault()
        const file = [...e.dataTransfer?.files][0]
        fileCheck(file)
        
    }

    const imgDragover = (e) =>{
        e.preventDefault()
    }

    const defaultProfileClickEvent = (e)=>{
        const preview = document.getElementById("preview")
        const target = e.target.id
        switch(target){
            case "default1":
            case "default2":
            case "default3":
            case "default4":
                setImgFile(e.target.src)
                console.log(imgFile)
                break
        }
        // console.log( document.getElementById("profileImg").value )
    }

    return(
        <React.Fragment>
            <Div  background_color="blue5" border_radius="3px" width="312px" height="188px">
            {/* 드래그 앤 드롭 박스 */}
            
                <label htmlFor="profileImg" onDrop={imgDrop} onDragOver={imgDragover}>
                    <FileInput type="file" accept=".jpg, .png" id="profileImg" 
                    onChange={saveImgFile} ref={imgRef}/>
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
                                <PreviewImg src={imgFile ? imgFile :`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`}
                                width="100px" border_radius="50%" id="preview"/>    
                            </Div>
                        </Div>
                    }
                </label>
                {/* 프로필 이미지 */}
                <Div flex_direction="column" onClick={defaultProfileClickEvent}>
                    <Div>
                        <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`} width="47px" padding= "8px" margin= "5px"
                        id="default1"/>
                        <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg1.png`} width="47px" padding= "8px" margin= "5px"
                        id="default2"/>
                    </Div>
                    <Div>
                        <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg2.png`} width="47px" padding= "8px" margin= "5px"
                        id="default3"/>
                        <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg3.png`} width="47px" padding= "8px" margin= "5px"
                        id="default4"/>
                    </Div>
                </Div>
            </Div>
        </React.Fragment>
    )
}

export default UploadBox