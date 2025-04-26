const MenuLayout = ({setType, setAllergies, fetchMenu}) => {

  return (
    <div>
        <label htmlFor="type-select">Select a course</label>
        <select id="type-select" onChange={event =>{setType(event.target.value)}}>
            <option value="">-- All types --</option>
            <option value="appetizer">Appetizer</option>
            <option value="primo">First Course</option>
            <option value="secondo">Second Course</option>
            <option value="pizza">Pizza</option>
            <option value="side">Side</option>
            <option value="drink">Drink</option>
        </select>
        <label htmlFor="allergies-select">Select Allerglies</label>
        <select id="type-allergies" onChange={event =>{setAllergies(event.target.value)}}>
            <option value="">-- All types --</option>
            <option value="land">Land</option>
            <option value="fish">Sea</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten free">Gluten Free</option>
        </select>
    </div>
  )
}

export default MenuLayout
