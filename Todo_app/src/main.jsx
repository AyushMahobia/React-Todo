import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../src/styles/app.scss"

export const server = "https://nodejs-todoapp-td3e.onrender.com/api/v1";

export const Context = createContext({isAuthenticated: false});
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  return(
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, setLoading, loading, user, setUser}}>
      <App/>
    </Context.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
