import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/admin/adminPage'
import HomePage from './pages/home/homePage'
import { Toaster } from 'react-hot-toast'
import Testing from './components/testing'
import LoginPage from './pages/login/login'
import RegisterPage from './register/register'
import { GoogleOAuthProvider } from '@react-oauth/google'
import VerifyEmail from './pages/verifyEmail/verifyEmail'




function App() {
  

  return (

    <GoogleOAuthProvider clientId="56584936760-7bu2logae3c5e9bsk0dp43aqtj49qiqi.apps.googleusercontent.com">
      <BrowserRouter>
      <Toaster position='top-right'/>
        <Routes path="/*">
          <Route path='/testing' element={<Testing/>}/>
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/verify-email' element={<VerifyEmail/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/*' element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
