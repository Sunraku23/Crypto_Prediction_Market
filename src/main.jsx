import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Login from './components/login.jsx'
import Register from './components/register.jsx'
import TrendCrypto from './components/trendCrypto.jsx'
import PredictAI from './components/predictAI.jsx'
import ForgetPass from './components/forgetPass.jsx'
import VerifyCode from './components/verifyCode.jsx'
import SetPass from './components/setPass.jsx'
import AfterSetPass from './components/afterSetPass.jsx'
import AuthSuccess from './components/AuthSuccess.jsx' // ← Tambahkan ini

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trendCrypto" element={<TrendCrypto/>} />
        <Route path="/predictAI" element={<PredictAI/>} />
        <Route path="/forgetPass" element={<ForgetPass/>} />
        <Route path="/verifyCode" element={<VerifyCode/>} />
        <Route path="/setPass" element={<SetPass/>} />
        <Route path="/afterSetPass" element={<AfterSetPass/>} />
        <Route path="/auth-success" element={<AuthSuccess />} /> {/* ← Tambahkan route baru */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)