import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { Toast, ToastContainer } from 'react-bootstrap'
import { ShoppingCart } from 'lucide-react' 
import { useAuth } from '../contexts/AuthContext'
import './Menu.css'

function Menu({ id, name, photo, prezzo, description, allergies, type, selectedDish, handleSelect }) {
  const isSelected = id === (selectedDish && selectedDish.id)
  const { currentUser, isAuthenticated } = useAuth()

  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastType, setToastType] = useState('success')

  const capitalize = (str) => str?.charAt(0)?.toUpperCase() + str?.slice(1) || ''

  const addToCart = async (e) => {
    e.stopPropagation()
    if (!isAuthenticated || !currentUser) {
      setToastMessage('Please login to add items to cart')
      setToastType('danger')
      setToastVisible(true)
      return
    }

    try {
      const cartResponse = await axios.get(`http://localhost:3000/cart?user_id=eq.${currentUser.id}`)

      if (cartResponse.data.length === 0) {
        setToastMessage('No active cart found')
        setToastType('danger')
        setToastVisible(true)
        return
      }

      const cartId = cartResponse.data[0].id

      const existingItemResponse = await axios.get(
        `http://localhost:3000/cart_dish?cart_id=eq.${cartId}&dish_id=eq.${id}`
      )

      if (existingItemResponse.data.length > 0) {
        const currentQuantity = existingItemResponse.data[0].quantity
        await axios.patch(
          `http://localhost:3000/cart_dish?cart_id=eq.${cartId}&dish_id=eq.${id}`,
          { quantity: currentQuantity + 1 }
        )
      } else {
        await axios.post('http://localhost:3000/cart_dish', {
          cart_id: cartId,
          dish_id: id,
          quantity: 1
        })
      }

      setToastMessage(`${capitalize(name)} added to cart!`)
      setToastType('success')
      setToastVisible(true)
    } catch (error) {
      console.error('Error adding to cart:', error)
      setToastMessage('Failed to add item to cart')
      setToastType('danger')
      setToastVisible(true)
    }
  }

  return (
    <>
      <div
        className={`menu ${isSelected ? 'selected' : ''}`}
        onClick={() => handleSelect({ id, name, photo, prezzo, description, allergies, type })}
      >
        <h2>{capitalize(name)}</h2>
        <img src={photo || '/placeholder.jpg'} alt={name || 'Menu item'} loading="lazy" />
        <p>Price: {prezzo}€</p>

        <div className="buttons">
          <button
            onClick={addToCart}
            className="btn btn-success d-flex align-items-center gap-2"
          >
            <ShoppingCart size={16} />
            <span>Add to cart</span>
          </button>

          <Link
            to={`/dishes/${id}`}
            className="btn btn-primary"
            onClick={(e) => e.stopPropagation()}
          >
            See details
          </Link>
        </div>
      </div>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={toastType}
          onClose={() => setToastVisible(false)}
          show={toastVisible}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default Menu
