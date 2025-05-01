import { useLocation, Link } from "react-router"
import React from 'react'


const NotFound = () => {
    const location = useLocation()
    return(
        <>
      <p>No match found for <code>{location.pathname}</code></p>
      <Link to="/" replace={true}>Go back to the home page</Link>
        </>
    )
}
export default NotFound