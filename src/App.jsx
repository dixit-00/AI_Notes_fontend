import { useState } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import { useEffect } from 'react';
import { getCurrentUser } from './services/api.js';
import { useDispatch, useSelector } from 'react-redux';

export const serverUrl = "http://localhost:3000";



function App() { 
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch)
  }, [dispatch]);

  const {currentUser}= useSelector((state) => state.user);

  return (
    <>
     <Routes>
      <Route path='/' element={currentUser ? <Home/> : <Navigate to='/auth' replace />} />
      <Route path='/auth' element={currentUser ? <Navigate to='/' replace /> : <Auth/>} />
     </Routes>
    </>
  )
}

export default App
