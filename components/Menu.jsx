import { useEffect } from "react"
import "./Menu.css";

function Menu ({
  id, name, type, photo, description,
  allergies, prezzo, selectedDish,
  handleSelect
}) {

  useEffect(() => {
    console.log(`Menu ${name} rendered`)
  }, [])

  const isSelected = id === (selectedDish && selectedDish.id)

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div
      className={`menu ${isSelected ? "selected" : ""}`}
      onClick={() => handleSelect({ id })}
    >
      <h2>{capitalize(name)}</h2>
      <img src={photo} alt={name} />
      <p>Dish price: {prezzo}€</p>
      <p>Ingredients: {description || "No ingredients found"}</p>
      <p>Type: {allergies || "None"}</p>
      <p>Course: {type || "Unknown"}</p>
      <button>Order</button>
    </div>
  )
}

export default Menu
