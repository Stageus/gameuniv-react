// ===== import base =====
import React from "react"
import styled, {css} from "styled-components"
import {useRecoilValue, useSetRecoilState} from "recoil"
import { useMobile } from "../../hooks/useMediaComponent"
import imageCompression from "browser-image-compression"

// ===== import component =====
import UploadBox from "../modal_components/EditProfileModal"

// ===== import recoil =====
import { whichPageState } from "../../recoil/PageState"

// ===== import style =====
import { Img, ImgBtn } from "../../styles/Img"
import { Div } from "../../styles/Div"
import { H1 } from "../../styles/H1"
import { Button } from "../../styles/Button"
import { Input } from "../../styles/Input"
import { P } from "../../styles/P" 

// ===== import style func =====
import { color } from "../../styles/style"


// ===== style =====
const Label = styled.label`
    width: 142px; 
    height: 135px;
    border: 3px dashed ${color("blue3")};
    border-radius: 10px;
`

const UploadTotalDiv = styled(Div)`
    ${props => props.isMobile && css`
        position:relative;
        right: 30px;
    `}
    
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


//  ===== component =====

const EditProfileModal = () =>{
    

    // ===== state =====
    const [imgFile, setImgFile] = React.useState("")
    const imgRef = React.useRef()
    const [defaultImg, setDefaultImg] = React.useState("")
    const [defaultSrc, setDefaultSrc] = React.useState("")
    const [profileImg, setProfileImg] = React.useState([])
    const isUpload = (defaultImg !== "" || profileImg.length === 1)

    // const setPostData = props.setPostData
    const isMobile = useMobile()

    // ===== event =====
    // 이미지 압축
    const imgCompress = async(file) =>{
        const options = {maxSizeMB: 1, maxWidhOrHeight : 128}
        const reader = new FileReader()
        try{
            const compressedFile = await imageCompression(file, options)
            reader.readAsDataURL(compressedFile)
            reader.onloadend = () =>{
                setImgFile(reader.result)
            }

            setProfileImg([compressedFile])
            setDefaultSrc("")
            setDefaultImg("")
            return compressedFile
            
        } catch(error){
            console.log(error)
        }
    }

    const fileCheck = async(file) =>{
        // const reader = new FileReader()
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
            imgCompress(file)
        }
    }

    // 이미지 미리보기 클릭 시 이미지 업로드 fileInput용
    const saveImgFile = (e) =>{
        const file = imgRef.current.files[0]
        fileCheck(file)
    }

    // 이미지 드래그앤 드롭
    const imgDrop = (e) =>{
        e. preventDefault()
        const file = [...e.dataTransfer?.files][0]
        fileCheck(file)
        
    }

    const imgDragover = (e) =>{
        e.preventDefault()
    }

    const defaultProfileClickEvent = (e)=>{
        const target = e.target.id
        switch(target){
            case "defaultProfileImg0":
            case "defaultProfileImg1":
            case "defaultProfileImg2":
            case "defaultProfileImg3":
                // setImgFile(e.target.src)
                setDefaultImg(`${e.target.id}.png`)
                setDefaultSrc(e.target.src)
                setProfileImg([])
                console.log(imgFile, defaultImg)
                break
        }
    }
    return(
        <Div width="357px" height="347px">
            <Div width="90%" height="100%"
            justify_content="space-evenly" align_items="flex-start" flex_direction="column">
                <H1 font_size="m" color="grayscale7">프로필 수정</H1>
                    <React.Fragment>
                        <UploadTotalDiv isMobile={isMobile} background_color="blue5" border_radius="3px" width="312px" height="188px">
                        {/* 드래그 앤 드롭 박스 */}                        
                            <label htmlFor="profileImg" onDrop={imgDrop} onDragOver={imgDragover}>
                                <FileInput type="file" accept=".jpg, .png" id="profileImg" 
                                onChange={saveImgFile} ref={imgRef}/>
                                {
                                    isUpload
                                    ?
                                    // {/* 이미지 업로드 후 */}
                                    <Div width="142px" height="135px">
                                        <Div width="128px" height="128px" background_color="grayscale1" border_radius="50%">
                                            <PreviewImg src={defaultSrc ? defaultSrc : imgFile}
                                            width="100px" border_radius="50%" id="preview"/>    
                                        </Div>
                                    </Div>
                                    
                                    :
                                    // {/* 이미지 업로드 전 */}
                                    <Div width="142px" height="135px" border={`3px dashed ${color("blue3")}`} border_radius="10px">
                                        <Div flex_direction="column" height="100%">
                                            <Img src={`${process.env.PUBLIC_URL}/img_srcs/icons/upLoadIcon.png`} width="26px"/>
                                            <P color="blue3" font_size="xxxs" font_weight="regular" padding="15px 0 0 0">Upload File (jpg,png)</P>
                                            <P color="blue3" font_size="xxxs" font_weight="regular" padding="3px 0 0 0">용량 5MB이하</P>
                                            <P color="blue3" font_size="xxxs" font_weight="regular" padding="3px 0 0 0">이미지 크기 5000px이하</P>
                                        </Div>
                                        
                                    </Div>
                                }
                            </label>
                            {/* 프로필 이미지 */}
                            <Div flex_direction="column" onClick={defaultProfileClickEvent}>
                                <Div>
                                    <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg0.png`} width="47px" padding= "8px" margin= "5px"
                                    id="defaultProfileImg0"/>
                                    <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg1.png`} width="47px" padding= "8px" margin= "5px"
                                    id="defaultProfileImg1"/>
                                </Div>
                                <Div>
                                    <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg2.png`} width="47px" padding= "8px" margin= "5px"
                                    id="defaultProfileImg2"/>
                                    <ProfileImg src={`${process.env.PUBLIC_URL}/img_srcs/profiles/defaultProfileImg3.png`} width="47px" padding= "8px" margin= "5px"
                                    id="defaultProfileImg3"/>
                                </Div>
                            </Div>
                        </UploadTotalDiv>
                    </React.Fragment>
                <Div justify_content="center" width="100%">
                    <Button width="177px" height="38px" font_size="s">확인</Button>
                </Div>
            </Div>
        </Div>
    )
}

export default EditProfileModal