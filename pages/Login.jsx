import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FadeLoader } from "react-spinners"


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    
    // Controlla se c'è un percorso di redirect salvato nello state
    const from = location.state?.from?.pathname || "/guest";
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await login(username, password);
            
            if (result.success) {
                if (from !== "/login") {
                    navigate(from);
                } else {
                    navigate("/guest");
                }
            } else {
                setError(result.error);
            }
            
        } catch (err) {
            console.error("Login error:", err);
            setError("Eorror during Login, retry.");
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="login-container">
            <h2>Inserisci username e password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username"
                    />
                </div>
                
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password"
                    />
                </div>
                
                <button type="submit" disabled={loading}>
                    {loading ? <FadeLoader /> : "LogIn"}
                </button>

                {error && <p className="error-message">{error}</p>} 
            </form>
        </div>
    );
};

export default Login;