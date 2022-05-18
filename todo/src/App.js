import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useReducer } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';

const Routing = () => {
  const history = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user>> ",user)
    if (user?.username) {
      history("/");
    } else {
      history('/login');
    }
  }, [])
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />      
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
