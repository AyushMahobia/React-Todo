import React, { useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom';

const Home = () => {
  const {isAuthenticated} = useContext(Context);
  if(!isAuthenticated){return <Navigate to={"/login"}/>}
  return (
    <div>
      Home page
    </div>
  )
}

export default Home
