import { Link } from "react-router"
import "./Menu.css"
import React from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

function Menu({ id, name, photo, prezzo, description, allergies, type, selectedDish, handleSelect }) {
  const isSelected = id === (selectedDish && selectedDish.id)
  const { currentUser, isAuthenticated } = useAuth()

  const capitalize = (str) => str?.charAt(0)?.toUpperCase() + str?.slice(1) || ""

  const addToCart = async (e) => {
    e.stopPropagation()
    if (!isAuthenticated || !currentUser) {
      alert('Please login to add items to cart')
      return
    }

    try {
      // Prima otteniamo il cart_id esistente dell'utente
      const cartResponse = await axios.get(`http://localhost:3000/cart?user_id=eq.${currentUser.id}`)
      
      if (cartResponse.data.length === 0) {
        alert('No active cart found')
        return
      }

      const cartId = cartResponse.data[0].id

      // Verifichiamo se l'item è già nel carrello
      const existingItemResponse = await axios.get(
        `http://localhost:3000/cart_dish?cart_id=eq.${cartId}&dish_id=eq.${id}`
      )

      if (existingItemResponse.data.length > 0) {
        // Se l'item esiste, incrementiamo la quantità
        const currentQuantity = existingItemResponse.data[0].quantity
        await axios.patch(
          `http://localhost:3000/cart_dish?cart_id=eq.${cartId}&dish_id=eq.${id}`,
          { quantity: currentQuantity + 1 }
        )
      } else {
        // Se l'item non esiste, lo aggiungiamo al carrello
        await axios.post('http://localhost:3000/cart_dish', {
          cart_id: cartId,
          dish_id: id,
          quantity: 1
        })
      }

      alert('Item added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      if (error.response) {
        console.error('Error response:', error.response.data)
      }
      alert('Failed to add item to cart')
    }
  }

  return (
    <div 
      className={`menu ${isSelected ? "selected" : ""}`}
      onClick={() => handleSelect({ id, name, photo, prezzo, description, allergies, type })}
    >
      <h2>{capitalize(name)}</h2>
      <img src={photo || "/placeholder.jpg"} alt={name || "Menu item"} loading="lazy"/>
      <p>Price: {prezzo}€</p>

      <div className="buttons">
        <button onClick={addToCart}>Add to cart</button>
        <button onClick={(e) => e.stopPropagation()}>
          <Link to={`/dishes/${id}`}>See details</Link>
        </button>
      </div>
    </div>
  )
}

export default Menu
