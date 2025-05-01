import { useState } from "react"
import { useNavigate } from "react-router"
import React from 'react'


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("") 
    const navigate = useNavigate()
    
    const handleSubmit = e => { 
        e.preventDefault()

        if (username === "admin" && password  === "admin"){
            navigate("/guest")
        }else{
            setError("Please enter a valid username and password")
        }
    }

    return ( 
        <div>
            <h2>Insert Username and Password to start</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                
                <button type="submit">Login</button>

                {error && <p style={{color: "red"}}>{error}</p>} 
            </form>
        </div>
    )
}
export default Login