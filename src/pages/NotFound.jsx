import { useLocation, Link } from "react-router"
import React from 'react'
import './NotFound.css'

const NotFound = () => {
  const location = useLocation()

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Page Don't Found</h1>
      <p className="notfound-message">
        No corrisponded page founded for:  <code>{location.pathname}</code>
      </p>
      <Link to="/home" replace={true} className="notfound-link">
        ⬅ Go to Home
      </Link>
    </div>
  )
  
}

export default NotFound
