import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import React from 'react'
import './DishDetail.css'
import { Button } from "react-bootstrap"

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

                const response = await fetch(`http://localhost:3000/dishes?id=eq.${dishID}`)
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

    if (loading) return <div className="loading-container">Loading...</div>
    if (error) return <div className="error-message">Error: {error}</div>

    const {name, photo, prezzo, description, allergies, type} = dish
    
    const capitalize = (str) => str?.charAt(0)?.toUpperCase() + str?.slice(1) || "" 

    return (
        <div className="dish-detail-container">
            <div className="dish-header">
                <img src={photo} className="dish-image" />
                <div className="dish-info">
                    <h1 >{capitalize(name)}</h1>
                    <p >{prezzo}€</p>
                    <p >{description || "No ingredients found"}</p>
                    <div className="dish-meta">
                        <div className="meta-item">
                            <span>Type: {allergies || "None"}</span>
                        </div>
                        <div className="meta-item">
                            <span>Course: {type || "Unknown"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Button onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </div>
    )
}   

export default DishDetail