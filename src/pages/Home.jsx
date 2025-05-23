import { useEffect, useState } from "react"
import MenuLayout from "../layout/MenuLayout"
import { FadeLoader } from "react-spinners"
import Menu from "../components/Menu"
import { useSearchParams } from "react-router"
import './Home.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const Home = () => {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    
    const type = searchParams.get("type") || ""
    const allergies = searchParams.get("allergies") || ""

    const fetchMenu = async () => {
        try {
            setLoading(true)
            let url = `${API_URL}/dishes`
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
            setError(error.message || "Failed to fetch the menu.")
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchMenu()
    }, [type, allergies])

    const handleSelect = (selected) => {
        setSelectedProduct(selected)
    }

    return (
        <div className="home-container">
            <MenuLayout setSearchParams={setSearchParams} fetchMenu={fetchMenu}/>
            <main className="main-content">
                <h1 className="welcome-title">Welcome to Plately 😺</h1>
                
                {!error && loading && (
                    <div className="loading-container">
                        <FadeLoader />
                    </div>
                )}
                
                {error && <div className="error-message">Failed to load dishes. Please try again.</div>}
                
                {!error && !loading && dishes.length === 0 && (
                    <div className="no-dishes-message">No dishes found. Try changing your filters.</div>
                )}
                
                {!error && !loading && dishes.length > 0 && (
                    <div className="dishes-grid">
                        {dishes.map((dish) => (
                            <Menu key={dish.id} {...dish} selectedDish={selectedProduct} handleSelect={handleSelect}/>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

export default Home