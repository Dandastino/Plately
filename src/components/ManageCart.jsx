import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Button, Card, Modal, ListGroup, Badge } from 'react-bootstrap'

const ManageCart = () => {
    const [cartItems, setCartItems] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {ManageCart
        fetchCartItems()
    }, [])

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/cart?id=eq.${user.id}`)
            setCartItems(response.data)
            calculateTotal(response.data)
        } catch (error) {
            console.error('Error fetching cart items:', error)
        }
    }

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + (item.prezzo * item.quantity), 0)
        setTotalPrice(total)
    }

    const updateQuantity = async (dishId, newQuantity) => {
        if (newQuantity < 1) return
        
        try {
            await axios.put(`http://localhost:3000/cart?id=eq.${user.id}/dish?id=eq.${dishes.id}`, {
                quantity: newQuantity
            })
            fetchCartItems()
        } catch (error) {
            console.error('Error updating quantity:', error)
        }
    }

    const removeItem = async (dishId) => {
        try {
            await axios.delete(`http://localhost:3000/cart?id=eq.${user.id}/dish?id=eq.${dishId}`)
            fetchCartItems()
        } catch (error) {
            console.error('Error removing item:', error)
        }
    }


    // DA MODIFICARE
    const placeOrder = async () => {
        try {
            await axios.post(`http://localhost:3000/orders`, {
                userId: user.id,
                items: cartItems
            })
            setShowModal(true)
            await axios.delete(`http://localhost:3000/cart/${user.id}`)
            setCartItems([])
            setTotalPrice(0)
        } catch (error) {
            console.error('Error placing order:', error)
        }
    }

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ListGroup>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{item.name}</h5>
                                    <p className="mb-0">€{item.prezzo.toFixed(2)}</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>

                                    <Badge bg="secondary" className="mx-2">{item.quantity}</Badge>

                                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>

                                    <Button variant="danger" size="sm" className="ms-3" onClick={() => removeItem(item.id)}> Remove</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Card className="mt-3">
                        <Card.Body>
                            <h4>Total: €{totalPrice.toFixed(2)}</h4>
                            <Button variant="success" onClick={placeOrder}>
                                Place Order
                            </Button>
                        </Card.Body>
                    </Card>
                </>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Confirmed!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your order has been placed successfully. Please wait for a waiter to assist you.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        setShowModal(false)
                        navigate('/menu')
                    }}>
                        Back to Menu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ManageCart