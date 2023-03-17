// ===== import base =====
import React from "react"

const BackSound = () => {
    
    return (
        <audio src={`${process.env.PUBLIC_URL}/sound/background_sound.mp3`} autoplay loop id="audio"
        ></audio>
    );
}

export default BackSound;
