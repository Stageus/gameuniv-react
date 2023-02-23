// ===== import base =====
import React from "react"

// ===== import component =====
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./pages/loginPage/Login"


const App = () => {
  return (
    <React.Fragment>
        <Header/>
        <Main/>
    </React.Fragment>
  );
}

export default App;
