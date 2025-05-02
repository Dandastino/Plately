import { useEffect, useState } from "react"
import MenuLayout from "../components/MenuLayout"
import { FadeLoader } from "react-spinners"
import Menu from "../components/Menu"
import React from 'react'
import { useSearchParams } from "react-router"

const Home = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedProduct, setSelectedProduct] = useState(null)

    const [serarchParams, setSearchParams] = useSearchParams()
    const type = serarchParams.get("type") || ""
    const allergies = serarchParams.get("allergies") || ""

    const fetchMenu = async () => {
        try {
            setLoading(true)
            let url = "http://localhost:3000/dishes"
            const params = []
    
            if (type) params.push(`type=eq.${type}`)
            if (allergies) params.push(`allergies=eq.${allergies}`)
    
            if (params.length) {
                url += "?" + params.join("&")
            }
    
            const response = await fetch(url)
            const menu = await response.json()
            setDishes(menu)
        } catch (error) {
            setError(err.response?.data?.message || "Failed to fetch the menu.")
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchMenu();
    }, [type, allergies]);

    const handleSelect = (selected) => {
        setSelectedProduct(selected)
      }

    return (
        <>
            <MenuLayout setSearchParams={setSearchParams} fetchMenu = {fetchMenu}/>
            <h1>Welcome to Plately 😺</h1>
            {!error && loading && <FadeLoader />}
            {error && <div>Failed to load dishes. Please try again.</div>}
            {!error && !loading && dishes.length > 0 && (
            dishes.map((dish) => (<Menu key={dish.id}{...dish}/>
            ))
            )}
            {!error && !loading && dishes.length > 0 && (
            dishes.map((dish) => (
                <Menu
                key={dish.id}
                {...dish}
                selectedDish={selectedProduct}
                handleSelect={handleSelect}
                />
            ))
)}

        </>
    )
}

export default Home
