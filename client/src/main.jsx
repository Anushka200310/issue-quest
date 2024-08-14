import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import LogIn  from './pages/LogIn.jsx'
import Logout from './components/Logout.jsx'
import { AuthProvider } from './store/auth.jsx' 
import Profile from './pages/Profile.jsx'
import CreatePost from './pages/CreatePost.jsx'
import Article from './pages/Article.jsx'
import UpdateIssue from './pages/UpdateIssue.jsx'
import Issue from './pages/Issue.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route index element={<Home />} />
        <Route path='/issue-list' element={<Article />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/update-issue/:id' element={<UpdateIssue />} />
        <Route path='/issue/:id' element={<Issue />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </React.StrictMode>
    </AuthProvider>,
)
