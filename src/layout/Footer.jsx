import { useNavigate } from 'react-router'
import './Footer.css'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Footer = ({ onTableClose }) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const { logout, currentUser } = useAuth()

  const tableNumber = localStorage.getItem("tableNumber")
  const guests = localStorage.getItem("guestNumber")

  const clearCart = async () => {
    try {
      const cartResponse = await axios.get(`http://localhost:3000/cart?user_id=eq.${currentUser.id}`)
      if (cartResponse.data.length > 0) {
        const cartId = cartResponse.data[0].id
        await axios.delete(`http://localhost:3000/cart_dish?cart_id=eq.${cartId}`)
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }
  
  const handleCloseTable = () => {
    setShowModal(true)
  }

  const confirmCloseTable = async (e) => {
    e.preventDefault()
    
    try {
      // Prima svuotiamo il carrello
      await clearCart()
      
      // Poi facciamo logout
      await logout()
      
      if (onTableClose) {
        onTableClose()
      }

      localStorage.clear()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setShowModal(false)
    }
  }

  return (
    <>
      <footer className="footer d-flex justify-content-around align-items-center py-2 px-3 border-top">
        <div className="footer-item" title="Go to the Home Page" onClick={() => navigate("/home")}>
          🏠 Home
        </div>

        <div className="footer-item" title="Table's number">
          🪑 Table {tableNumber ?? "?"}
        </div>

        <div className="footer-item" title="Guests">
          👥 {guests ? `${guests} Guest${guests !== 1 ? 's' : ''}` : "?"}
        </div>

        <div className="footer-item" title="Admin Panel" onClick={() => navigate("/admin")}>
          ⚙️ Admin
        </div>

        <div className="footer-item" title="Show cart" onClick={() => navigate("/cart")}>
          🛒 Cart
        </div>

        <div  className="footer-item close-table"  title="Close Table" onClick={handleCloseTable}>
          💵 Ask for the Bill
        </div>
      </footer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Table Closure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to close table {tableNumber}?<br />
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmCloseTable}>
            Confirm Closure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Footer