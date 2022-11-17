import React from 'react';
import {Route, Routes} from "react-router-dom"

import './App.css';
import Home from './components/Home/home';
import Register from "./components/Register/register"
import LoginForm  from './components/LoginForm/login';
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"
import NotFound from "./components/Notfound/notfound";
import { LoginState } from './Context api/State';
import { useContext } from 'react';

const App=():any=> {

  const user:any=useContext(LoginState)

  return (
  <Routes>
    <Route  path="/" element={user.user?<Home/>:<LoginForm/>} />
    <Route  path="/login" element={<LoginForm/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/forgot" element={<ForgotPassword/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes>
  )
  
}

export default App;
