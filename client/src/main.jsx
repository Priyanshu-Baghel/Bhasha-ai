import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './input.css';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './store/auth.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <React.StrictMode>
            <App />
            <ToastContainer />
      </React.StrictMode>
    </AuthProvider>
  </BrowserRouter>
)