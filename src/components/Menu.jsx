import { Link } from "react-router"
import "./Menu.css"
import React from 'react'

function Menu({ id, name, photo, prezzo, selectedDish, handleSelect }) {
  const isSelected = id === (selectedDish && selectedDish.id)

  const capitalize = (str) => str?.charAt(0)?.toUpperCase() + str?.slice(1) || ""

  return (
    <div 
      className={`menu ${isSelected ? "selected" : ""}`}
      onClick={() => handleSelect({ id, name, photo, prezzo, description, allergies, type })}
      >
      <h2>{capitalize(name)}</h2>
      <img src={photo || "/placeholder.jpg"} alt={name || "Menu item"} loading="lazy"/>
      <p>Price: {prezzo}€</p>

      <div className="buttons">
        <button onClick={(e) => e.stopPropagation()}>Add to cart</button>
        <button onClick={(e) => e.stopPropagation()}>
          <Link to={`/dishes/${id}`}>See details</Link>
        </button>
      </div>
    </div>
  )
}

export default Menu
