// ===== import base =====
import React from "react"

// ===== import component =====
import Header from "./components/Header";
import Main from "./components/Main";
import BackSound from "./components/BackSound";

const App = () => {

  return (
    <React.Fragment>
        {/* <BackSound/> */}
        <audio src={`${process.env.PUBLIC_URL}/sound/background_sound.mp3`} autoplay loop id="audio"
        ></audio>
        <Header/>
        <Main/>
    </React.Fragment>
    
  );
}

export default App;
