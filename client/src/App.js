import { Routes, Navigate, Route } from 'react-router-dom'
import AuthMiddleware from './middlewares/AuthMiddleware';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import User from './pages/auth/User'
import Success from './pages/Success'
import HelloWorld from './pages/apps/HelloWorld'
import HelloUniverse from './pages/apps/HelloUniverse'
import Cancel from './pages/Cancel'
import PersistLogin from './components/PersistLogin';
import Navbar from "./components/Navbar"


function App() {
  return <>
    <Navbar />
    <Routes>
      <Route path='/' element={<PersistLogin />}>
        <Route index exact element={<Home />}></Route>
        <Route path='/auth'>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='user' element={<AuthMiddleware />}>
            <Route index element={<User />}></Route>
          </Route>
        </Route>
        <Route path='hello_world' element={<HelloWorld />}></Route>
        <Route path='hello_universe' element={<HelloUniverse />}></Route>
        <Route path='success' element={<Success />}></Route>
        <Route path='cancel' element={<Cancel />}></Route> 
      </Route>
      <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
  </>
}

export default App;
