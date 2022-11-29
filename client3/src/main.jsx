import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from '../context/AuthContext'
import SocketProvider from '../context/SocketContext'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
)
