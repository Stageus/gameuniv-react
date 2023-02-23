// ===== import base =====
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {RecoilRoot} from "recoil"

// ===== import style =====
import GlobalStyle from './styles/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle/>
      <App/>
    </RecoilRoot>
    
  </React.StrictMode>
);

