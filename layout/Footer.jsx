import './Footer.css';
import React from 'react'


const Footer = ({ tableNumber = 5, guests = 2 }) => {
  return (
    <footer className="footer d-flex justify-content-around align-items-center py-2 px-3 border-top">
      <div className="footer-item" title="Vai alla home">🏠 Home</div>

      <div className="footer-item" title="Tavolo attuale">🪑 Table {tableNumber}</div>

      <div className="footer-item" title="Numero di persone sedute">👥 Guest{guests}</div>

      <div className="footer-item" title="Visualizza carrello">🛒 Cart</div>
    </footer>
  )
}

export default Footer