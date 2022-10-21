import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import AuthService from './service/auth'
import TodoService from './service/todo'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AuthErrorEventBus } from './context/AuthContext'
import HttpClient from './network/http'
import TokenStorage from './db/token'
import Socket from './network/socket'

const baseURL = process.env.REACT_APP_BASE_URL
const tokenStorage = new TokenStorage()
const httpClient = new HttpClient(baseURL)
const authErrorEventBus = new AuthErrorEventBus()
const authService = new AuthService(httpClient, tokenStorage)
const socketClient = new Socket(baseURL, () => tokenStorage.getToken())
const todoService = new TodoService(httpClient, tokenStorage, socketClient)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App todoService={todoService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
