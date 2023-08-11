import React, { useContext, useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, setLoading, loading } = useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/user/login`, {
        email, password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      setIsAuthenticated(true);
      toast.success(data.message)
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  if (isAuthenticated) { return <Navigate to={"/"} /> }
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
          <button type="submit" disabled={loading}>Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login
