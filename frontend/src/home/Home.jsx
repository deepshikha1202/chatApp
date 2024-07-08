import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const Home = () => {
    const {authUser}=useAuth();
  return (
    <div>
    hiii {authUser.username}
    </div>
  )
}

export default Home
