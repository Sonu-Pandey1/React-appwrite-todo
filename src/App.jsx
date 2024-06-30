
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Dashboard from "./Pages/Dashboard"
import Storage from "./Pages/Storage"
import Verify from "./Pages/verify"
import Navbar from './component/Navbar'
// import { account } from './appwrite/config'
// import conf from "./Conf/conf"

function App() {
  // console.log(conf.appwriteUrl)
  // console.log(account)
  

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/storage' element={<Storage/>}/>
      <Route path='/verify' element={<Verify/>}/>
    </Routes>


      

    </>
  )
}

export default App
