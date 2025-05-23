import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Modal, ListGroup, Badge, Container, Row, Col } from 'react-bootstrap'
import { fetchCartItems, clearCart } from '../redux/CartSlice'

const ManageCart = () => {
    const [showModal, setShowModal] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { currentUser, isAuthenticated } = useSelector(state => state.auth)
    const { items: cartItems, loading } = useSelector(state => state.cart)

    useEffect(() => {
        if (isAuthenticated && currentUser) {
            dispatch(fetchCartItems(currentUser.id))
        }
    }, [isAuthenticated, currentUser, dispatch])

    useEffect(() => {
        calculateTotal(cartItems)
    }, [cartItems])

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + (item.prezzo * item.quantity), 0)
        setTotalPrice(total)
    }

    const updateQuantity = async (dishId, newQuantity) => {
        if (newQuantity < 1) return
        
        try {
            const cartResponse = await fetch(`http://localhost:3000/cart?user_id=eq.${currentUser.id}`)
            const cartData = await cartResponse.json()
            
            if (cartData.length === 0) return
            
            const cartId = cartData[0].id
            
            await fetch(`http://localhost:3000/cart_dish?cart_id=eq.${cartId}&dish_id=eq.${dishId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: newQuantity
                })
            })
            
            dispatch(fetchCartItems(currentUser.id))
        } catch (error) {
            console.error('Error updating quantity:', error)
        }
    }

    const removeItem = async (dishId) => {
        try {
            const cartResponse = await fetch(`http://localhost:3000/cart?user_id=eq.${currentUser.id}`)
            const cartData = await cartResponse.json()
            
            if (cartData.length === 0) return
            
            const cartId = cartData[0].id
            
            await fetch(`http://localhost:3000/cart_dish?cart_id=eq.${cartId}&dish_id=eq.${dishId}`, {
                method: 'DELETE'
            })
            
            dispatch(fetchCartItems(currentUser.id))
        } catch (error) {
            console.error('Error removing item:', error)
        }
    }

    const placeOrder = async () => {
        try {
            const cartResponse = await fetch(`http://localhost:3000/cart?user_id=eq.${currentUser.id}`)
            const cartData = await cartResponse.json()
            
            if (cartData.length === 0) return
            
            const cartId = cartData[0].id
            
            // Elimina tutti gli elementi dal carrello
            await fetch(`http://localhost:3000/cart_dish?cart_id=eq.${cartId}`, {
                method: 'DELETE'
            })
            
            dispatch(clearCart())
            setShowModal(true)
            setTotalPrice(0)
        } catch (error) {
            console.error('Error placing order:', error)
        }
    }

    if (!isAuthenticated) {
        return (
            <Container className="mt-5 text-center">
                <h2>Please login to view your cart</h2>
                <Button variant="primary" onClick={() => navigate('/login')}>
                    Go to Login
                </Button>
            </Container>
        )
    }

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <h2>Loading cart...</h2>
            </Container>
        )
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p>Your cart is empty</p>
                    <Button variant="primary" onClick={() => navigate('/Home')}>
                        Browse Menu
                    </Button>
                </div>
            ) : (
                <>
                    <Row>
                        <Col md={8}>
                            <ListGroup>
                                {cartItems.map((item) => (
                                    <ListGroup.Item key={item.id} className="mb-3">
                                        <Row className="align-items-center">
                                            <Col md={2}>
                                                <img src={item.photo || "/placeholder.jpg"}  alt={item.name}  className="img-fluid rounded" style={{ maxHeight: '100px' }} />
                                            </Col>
                                            <Col md={4}>
                                                <h5>{item.name}</h5>
                                                <p className="text-muted mb-0">{item.description}</p>
                                            </Col>
                                            <Col md={2}>
                                                <p className="mb-0">€{item.prezzo.toFixed(2)}</p>
                                            </Col>
                                            <Col md={2}>
                                                <div className="d-flex align-items-center">
                                                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.dish_id, item.quantity - 1)}>
                                                        -
                                                    </Button>
                                                    <Badge bg="secondary" className="mx-2">
                                                        {item.quantity}
                                                    </Badge>
                                                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.dish_id, item.quantity + 1)}>
                                                        +
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <Button variant="danger" size="sm" onClick={() => removeItem(item.dish_id)}>
                                                    Remove
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <h4>Order Summary</h4>
                                    <hr />
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Subtotal:</span>
                                        <span>€{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <Button variant="success" className="w-100"onClick={placeOrder}>
                                        Place Order
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
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
                    <Button variant="primary" onClick={() => {setShowModal(false), navigate('/Home') }}>
                        Back to Menu
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ManageCart