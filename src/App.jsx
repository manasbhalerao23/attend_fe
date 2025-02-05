import { BrowserRouter, Routes,Route  } from 'react-router-dom'
import './App.css'
import Landing from './pages/landing'
import Login from './pages/login'
import GetAttend from './pages/teacher/getattend'
import GenCode from './pages/teacher/gencode'
import MarkAttend from './pages/student/markattend'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
