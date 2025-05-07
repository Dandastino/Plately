import { useState, useEffect } from "react"
import React from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { Container, Card, Button, Form } from "react-bootstrap"

const Guest = () => {
    const [table, setTable] = useState("")
    const [guest, setGuest] = useState("")
    const [error, setError] = useState("") 
    const navigate = useNavigate()
    const { currentUser, completeGuestSetup } = useAuth()

    useEffect(() => {
        if (currentUser?.role === 'guest' && !localStorage.getItem('guestSetupCompleted')) {
            window.history.pushState(null, '', '/guest')
        }
    }, [currentUser])

    const handleSubmit = e => {
        e.preventDefault()
        
        const numGuests = parseInt(guest)
        const numTable = parseInt(table)

        if (isNaN(numGuests) || numGuests <= 0) {
            setError("Please enter a positive number of guests")
        } else if (isNaN(numTable) || numTable <= 0) {
            setError("Please enter a valid table number")
        } else {
            localStorage.setItem('tableNumber', numTable.toString())
            localStorage.setItem('guestNumber', numGuests.toString())
            
            completeGuestSetup()
            
            navigate("/home")
        }
    }

    return (
        <Container className="mt-5">
            <Card className="mx-auto" style={{ maxWidth: '500px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Welcome to Plately</h2>
                    <p className="text-center mb-4">
                        Please provide your table number and number of guests to continue.
                    </p>

                    <Form.Group className="mb-3">
                        <Form.Label>Table Number</Form.Label>
                        <Form.Control type="number" value={table} onChange={e => setTable(e.target.value)} placeholder="Enter your table number" min="1" required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Number of Guests</Form.Label>
                        <Form.Control type="number" value={guest} onChange={e => setGuest(e.target.value)} placeholder="Enter number of guests" min="1" required />
                    </Form.Group>

                    {error && (<div className="text-danger mb-3"> {error} </div>)}

                    <Button variant="primary" onClick={handleSubmit}className="w-100">Continue</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Guest