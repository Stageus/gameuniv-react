// ===== import base =====
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {RecoilRoot} from "recoil"
import{ CookiesProvider } from "react-cookie"

// ===== import react router =====
import { BrowserRouter, HashRouter } from "react-router-dom"

// ===== import style =====
import GlobalStyle from './styles/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <RecoilRoot>
          <GlobalStyle/>
          <App/>
        </RecoilRoot>
      </BrowserRouter>
      </CookiesProvider>
  </React.StrictMode>
);

