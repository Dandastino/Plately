import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import React from 'react'

const DishDetail = () => {
    const navigate = useNavigate()
    const [dish, setDish] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { dishID } = useParams()


    useEffect(() =>{
        const fetchDish = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`http://localhost:3000/dishes?id=eq.${dishID}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                
                if (!data || data.length === 0) {
                    throw new Error('Dish not found')
                }
                
                setDish(data[0])


            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchDish()
    }, [dishID])

    if (loading) return <div>Loading</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    const {name, photo, prezzo, description, allergies, type} = dish
    
    const capitalize = (str) => str?.charAt(0)?.toUpperCase() + str?.slice(1) || ""; 

    return (
        <div>
          <h2>{capitalize(name)}</h2>
          <img src={photo} alt={name} />
          <p>Dish price: {prezzo}€</p>
          <p>Ingredients: {description || "No ingredients found"}</p>
          <p>Type: {allergies || "None"}</p>
          <p>Course: {type || "Unknown"}</p>
          <button onClick={() => navigate(-1)}> Go Back</button>
        </div>
      )
}   

export default DishDetail