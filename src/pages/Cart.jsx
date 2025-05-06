import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Modal, ListGroup, Badge, Container, Row, Col } from 'react-bootstrap';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const { currentUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && currentUser) {
            fetchCartItems();
        }
    }, [isAuthenticated, currentUser]);

    const fetchCartItems = async () => {
        try {
            // Prima otteniamo il cart_id dell'utente
            const cartResponse = await axios.get(`http://localhost:3000/cart?user_id=eq.${currentUser.id}`);
            if (cartResponse.data.length === 0) {
                setCartItems([]);
                return;
            }
            
            const cartId = cartResponse.data[0].id;
            
            // Poi otteniamo gli items del carrello
            const itemsResponse = await axios.get(`http://localhost:3000/cart_dish?cart_id=eq.${cartId}`);
            const itemsWithDetails = await Promise.all(
                itemsResponse.data.map(async (item) => {
                    const dishResponse = await axios.get(`http://localhost:3000/dishes?id=eq.${item.dish_id}`);
                    return {
                        ...item,
                        ...dishResponse.data[0]
                    };
                })
            );
            setCartItems(itemsWithDetails);
            calculateTotal(itemsWithDetails);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + (item.prezzo * item.quantity), 0);
        setTotalPrice(total);
    };

    const updateQuantity = async (dishId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            const cartResponse = await axios.get(`http://localhost:3000/cart?user_id=eq.${currentUser.id}`);
            if (cartResponse.data.length === 0) return;
            
            const cartId = cartResponse.data[0].id;
            await axios.patch(`http://localhost:3000/cart_dish?cart_id=eq.${cartId}&dish_id=eq.${dishId}`, {
                quantity: newQuantity
            });
            fetchCartItems();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (dishId) => {
        try {
            const cartResponse = await axios.get(`http://localhost:3000/cart?user_id=eq.${currentUser.id}`);
            if (cartResponse.data.length === 0) return;
            
            const cartId = cartResponse.data[0].id;
            await axios.delete(`http://localhost:3000/cart_dish?cart_id=eq.${cartId}&dish_id=eq.${dishId}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const placeOrder = async () => {
        try {
            const cartResponse = await axios.get(`http://localhost:3000/cart?user_id=eq.${currentUser.id}`);
            if (cartResponse.data.length === 0) return;
            
            const cartId = cartResponse.data[0].id;
            
            await axios.post(`http://localhost:3000/orders`, {
                user_id: currentUser.id,
                cart_id: cartId,
                items: cartItems,
                total_price: totalPrice
            });
            
            setShowModal(true);
            // Rimuoviamo solo gli items dal carrello, non il carrello stesso
            await axios.delete(`http://localhost:3000/cart_dish?cart_id=eq.${cartId}`);
            setCartItems([]);
            setTotalPrice(0);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <Container className="mt-5 text-center">
                <h2>Please login to view your cart</h2>
                <Button variant="primary" onClick={() => navigate('/login')}>
                    Go to Login
                </Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p>Your cart is empty</p>
                    <Button variant="primary" onClick={() => navigate('/menu')}>
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
                                                <img 
                                                    src={item.photo || "/placeholder.jpg"} 
                                                    alt={item.name} 
                                                    className="img-fluid rounded"
                                                    style={{ maxHeight: '100px' }}
                                                />
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
                                                    <Button
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        onClick={() => updateQuantity(item.dish_id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </Button>
                                                    <Badge bg="secondary" className="mx-2">
                                                        {item.quantity}
                                                    </Badge>
                                                    <Button
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        onClick={() => updateQuantity(item.dish_id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => removeItem(item.dish_id)}
                                                >
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
                                    <Button 
                                        variant="success" 
                                        className="w-100"
                                        onClick={placeOrder}
                                    >
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
                    <Button variant="primary" onClick={() => {
                        setShowModal(false);
                        navigate('/menu');
                    }}>
                        Back to Menu
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Cart;