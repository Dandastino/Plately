import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import React from 'react'
import { useAuth } from "../contexts/AuthContext"
import { FadeLoader } from "react-spinners"
import { Container, Form, Button, Alert, Card } from "react-bootstrap"
import "./Login.css"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login, isAuthenticated, currentUser } = useAuth()
    
    useEffect(() => {
        if (isAuthenticated) {
            if (currentUser?.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/guest")
            }
        }
    }, [isAuthenticated, currentUser, navigate])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        

        setLoading(true)
        setError("")

        try {
            const result = await login(username, password)
            
            if (result.success) {
                setError("")
                
                if (result.user.role === "admin") {
                    navigate("/admin")
                } else {
                    navigate("/guest")
                }
            } else {
                setError(result.error || "Invalid username or password")
            }
            
        } catch (err) {
            console.error("Login error:", err)
            setError("Error during login. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (isAuthenticated) {
        return null
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card className="shadow">
                    <Card.Body>
                        <h2 className="text-center mb-4">Welcome to Plately</h2>
                        
                        {error && (<Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>)}
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text"value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username"placeholder="Enter your username"/>
                            </Form.Group>
                            
                            <Form.Group className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="Enter your password"/>
                            </Form.Group>
                            
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" disabled={loading} className="py-2">
                                    {loading ? <div><FadeLoader /></div> : ("Log In")}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default Login