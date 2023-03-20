// ===== import base =====
import React from "react"

// ===== import component =====
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App = () => {
  
  return (
    <React.Fragment>
        {/* <BackSound/> */}
        <audio src={`${process.env.PUBLIC_URL}/sound/background_sound.mp3`} id="audio" loop 
        ></audio>
        <Header/>
        <Main/>
        <Footer/>
    </React.Fragment>
    
  );
}

export default App;
