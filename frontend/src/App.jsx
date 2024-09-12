import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Navbar from './components/Navbar';
import React from 'react';
import { AuthProvider } from './context/authContext';
import Configure from './pages/Configure';
import SingleVehicle from './pages/SingleVehicle';
import NewVehicle from './pages/NewVehicle';

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainRoute/>
      </BrowserRouter>         
    </AuthProvider>
  )
}

function MainRoute(){
  const location = useLocation()
  return(
    <>
      {location.pathname !== '/' && <Navbar/>}
      <Routes>
        <Route path ='/' element={<Home />} />
        <Route path='/dashboard' element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
        <Route path='/users' element={<PrivateRoutes><Users /></PrivateRoutes>} />
        <Route path='/configure' element={<PrivateRoutes><Configure /></PrivateRoutes>} />
        <Route path='/configure/:vehicleType' element={<PrivateRoutes><SingleVehicle /></PrivateRoutes>} />
        <Route path='/configure/new' element={<PrivateRoutes><NewVehicle /></PrivateRoutes>} />
      </Routes>
    </>
  )
}

export default App;