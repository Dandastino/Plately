import { useNavigate } from 'react-router'
import './Footer.css'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../contexts/AuthContext'

const Footer = ({ tableNumber, guests, onTableClose }) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const {logout} = useAuth()
  
  const handleCloseTable = () => {
    setShowModal(true)
  }

  const confirmCloseTable = async (e) => {
    e.preventDefault()
    
    try {
      await logout();
      
      if (onTableClose) {
        onTableClose()
      }

      tableNumber = null;
      guests = null
      localStorage.removeItem("tableNumber")
      localStorage.removeItem("guests")
      navigate("/")
      
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

        <div 
          className="footer-item close-table" 
          title="Close Table" 
          onClick={handleCloseTable}
        >
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