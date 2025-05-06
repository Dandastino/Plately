import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Modal } from 'react-bootstrap';
//  import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Mock data for cart items (in a real app, this would come from your state management)
  useEffect(() => {
    // Simulating cart data
    const mockCartItems = [
      {
        id: 1,
        name: 'Margherita',
        type: 'pizza',
        photo: '/Images/pizza/margherita.jpg',
        price: 6.50,
        quantity: 2
      },
      {
        id: 2,
        name: 'Coca Cola',
        type: 'drink',
        photo: '/Images/bibite/coca_cola.jpg',
        price: 3.50,
        quantity: 1
      }
    ];
    setCartItems(mockCartItems);
  }, []);

  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleOrder = () => {
    setShowModal(true);
    // In a real app, you would send the order to your backend here
  };

  const handleConfirmOrder = () => {
    setCartItems([]); // Clear the cart
    setShowModal(false);
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <Row>
            {cartItems.map((item) => (
              <Col key={item.id} xs={12} className="mb-3">
                <Card>
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={3} md={2}>
                        <img
                          src={item.photo}
                          alt={item.name}
                          style={{ width: '100%', height: 'auto', maxHeight: '100px', objectFit: 'cover' }}
                        />
                      </Col>
                      <Col xs={9} md={10}>
                        <Row className="align-items-center">
                          <Col md={4}>
                            <h5>{item.name}</h5>
                            <p className="text-muted mb-0">€{item.price.toFixed(2)}</p>
                          </Col>
                          <Col md={4} className="text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <FaMinus />
                              </Button>
                              <span className="mx-3">{item.quantity}</span>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          </Col>
                          <Col md={3} className="text-end">
                            <p className="mb-0">€{(item.price * item.quantity).toFixed(2)}</p>
                          </Col>
                          <Col md={1} className="text-end">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <FaTrash />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="mt-4">
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <h4 className="mb-0">Total: €{calculateTotal().toFixed(2)}</h4>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleOrder}
                  >
                    Place Order
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your order has been received! Please wait for a waiter to assist you.</p>
          <p>Total amount: €{calculateTotal().toFixed(2)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart; 