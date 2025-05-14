import { useLocation, useNavigate } from "react-router"
import React from 'react'
import './NotFound.css'
import { Button } from "react-bootstrap"

const NotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="notfound-container">
      <h1>404 - Page Don't Found</h1>
      <p>
        No corrisponded page founded for:  <code>{location.pathname}</code>
      </p>
      <Button className="notfound-link" onClick={() =>
        navigate(-1)
      }>
        ⬅ Go to back
      </Button>
    </div>
  )
  
}

export default NotFound
