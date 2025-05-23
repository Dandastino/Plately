import { useState } from 'react'
import { Link } from 'react-router' 
import { Toast, ToastContainer } from 'react-bootstrap'
import { ShoppingCart } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux' 
import { fetchCartItems } from '../redux/CartSlice'
import './Menu.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function Menu({ id, name, photo, prezzo, description, allergies, type, selectedDish, handleSelect }) {
  const isSelected = id === (selectedDish && selectedDish.id)
  const dispatch = useDispatch()
  const { currentUser, isAuthenticated } = useSelector(state => state.auth)

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
      const cartRes = await fetch(`${API_URL}/cart?user_id=eq.${currentUser.id}`)
      const cartData = await cartRes.json()

      if (cartData.length === 0) {
        setToastMessage('No active cart found')
        setToastType('danger')
        setToastVisible(true)
        return
      }

      const cartId = cartData[0].id

      const existingItemRes = await fetch(
        `${API_URL}/cart_dish?cart_id=eq.${cartId}&dish_id=eq.${id}`
      )
      const existingItemData = await existingItemRes.json()

      if (existingItemData.length > 0) {
        const currentQuantity = existingItemData[0].quantity

        await fetch(
          `${API_URL}/cart_dish?cart_id=eq.${cartId}&dish_id=eq.${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: currentQuantity + 1 })
          }
        )
      } else {
        await fetch(`${API_URL}/cart_dish`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart_id: cartId,
            dish_id: id,
            quantity: 1
          })
        })
      }

      // Aggiorna il carrello nello store Redux
      dispatch(fetchCartItems(currentUser.id))

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

      <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          bg={toastType}
          onClose={() => setToastVisible(false)}
          show={toastVisible}
          delay={3000}
          autohide
          style={{
            minWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: 'none'
          }}
        >
          <Toast.Body className="text-white d-flex align-items-center justify-content-center" style={{ fontSize: '1.1rem', padding: '1rem' }}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default Menu
