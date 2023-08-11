import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  // console.log(isAuthenticated)
  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/user/logout`,
        {
          withCredentials: true,
        });
      setIsAuthenticated(false);
      // toast.success(data.message)
      toast.success("Logged Out Successfully")
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(true);
      toast.error(error.response.data.message)
      setLoading(false);
    }
  };
  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {
          isAuthenticated ? <button className='btn' disabled={loading} onClick={logoutHandler}>Logout</button>
            : <Link to={"/login"}>Login</Link>
        }
      </article>
    </nav>
  )
}

export default Header
