import React from 'react';
import Login from "./login/login.jsx";
import Register from "./register/register.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home.jsx';
import { VerifyUser } from './utils/VerifyUser.jsx';
import { SocketContextProvider } from './context/SocketContext';

function App() {
  return (
    <SocketContextProvider>
      <div className="p-2 w-screen h-screen flex items-center justify-center">
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route element={<VerifyUser/>} ><Route path='/' element={<Home />}/></Route>
        </Routes>
        <ToastContainer/>
      </div>
    </SocketContextProvider>
  );
}

export default App;
