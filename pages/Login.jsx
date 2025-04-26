import { useState } from "react"
import { useNavigate } from "react-router"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
    const handleSubmit = e => {
        e.preventDefault()

        if (username && password){
            //invio un post al server

            navigate("/")
        }else{
            alert("Uncorrect username or password")
        }
    }

    return ( 
        <div>
            <h2>Please insert Username and Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login