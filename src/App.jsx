import { BrowserRouter, Routes,Route  } from 'react-router-dom'
import './App.css'
import Landing from './pages/landing'
import Login from './pages/login'
import GetAttend from './pages/teacher/getattend'
import GenCode from './pages/teacher/gencode'
import MarkAttend from './pages/student/markattend'
import Studhome from './pages/student/Shome'
import Teachhome from './pages/teacher/Thome'

function App() {

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='' element={<Landing/>}/>
    //     <Route path='/login' element={<Login/>}/>
    //     <Route path='/studhome' element={<Studhome/>}/>
    //     <Route path='/teachhome' element={<Teachhome/>}/>
    //   </Routes>
    // </BrowserRouter>
    <Studhome/>
  )
}

export default App
