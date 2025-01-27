import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/admin/adminPage'
import HomePage from './pages/home/homePage'




function App() {
  

  return (

    <div>
      <BrowserRouter>
        <Routes path="/*">
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/*' element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
