import React, { useContext, useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { Context, server } from "../main"
import { toast } from "react-hot-toast"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/user/new`, {
        name, email, password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      setIsAuthenticated(true);
      toast.success(data.message);
      setLoading(false)
    } catch (error) {
      setIsAuthenticated(false);
      toast.error(error.response.data.message) 
      setLoading(false)
      console.log(error)
    }
  };
  if(isAuthenticated){ return <Navigate to={"/"}/>}
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
          <button type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  )
}

export default Register
