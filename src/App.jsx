import { BrowserRouter, Routes,Route  } from 'react-router-dom'
import './App.css'
import Landing from './pages/landing'
import Login from './pages/login'
import GetAttend from './pages/teacher/getattend'
import GenCode from './pages/teacher/gencode'
import MarkAttend from './pages/student/markattend'
import Studhome from './pages/student/Shome'
import Teachhome from './pages/teacher/Thome'
import { Provider } from 'react-redux'
import store from './Utilities/store'
import Checkattend from './pages/student/checkattend'

function App() {

  return (
    // <Provider store={store}>
    //  <BrowserRouter>
     
    //    <Routes>
    //      <Route path='' element={<Landing/>}/>
    //      <Route path='/login' element={<Login/>}/>
    //      <Route path='/studhome' element={<Studhome/>}/>
    //      <Route path='/teachhome' element={<Teachhome/>}/>
    //      <Route path='/getattend' element={<GetAttend/>}/>
    //      <Route path='/gencode' element={<GenCode/>}/>
    //      <Route path='/markattend' element={<MarkAttend/>}/>
    //      <Route path='/checkattend' element={<Checkattend/>}/>
    //    </Routes>
    //  </BrowserRouter>
    // </Provider>
    <BrowserRouter>
      <Routes>
      <Route path='' element={<Checkattend/>}/>
      <Route path='/getattend' element={<GetAttend/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App