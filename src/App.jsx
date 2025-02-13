import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/admin/adminPage'
import HomePage from './pages/home/homePage'
import { Toaster } from 'react-hot-toast'
import Testing from './components/testing'
import LoginPage from './pages/login/login'
import RegisterPage from './register/register'




function App() {
  

  return (

    <div>
      <BrowserRouter>
      <Toaster position='top-right'/>
        <Routes path="/*">
          <Route path='/testing' element={<Testing/>}/>
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/*' element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
