import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { login } from "../redux/AuthSlice"
import { FadeLoader } from "react-spinners"
import { Container, Form, Button, Alert, Card } from "react-bootstrap"
import "./Login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { currentUser, isAuthenticated, loading } = useSelector(state => state.auth)

  const [localError, setLocalError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError("")

    const resultAction = await dispatch(login({ username, password }))

    if (login.fulfilled.match(resultAction)) {
      if (resultAction.payload.currentUser.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/guest")
      }
    } else {
      setLocalError(resultAction.payload || "Errore durante il login")
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Order With Plately</h2>

            {localError && (
              <Alert variant="danger" dismissible onClose={() => setLocalError("")}>
                {localError}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" disabled={loading} className="py-2">
                  {loading ? <FadeLoader height={10} width={3} margin={2} /> : "Log In"}
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