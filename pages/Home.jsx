import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners"
import MenuLayout from "../components/MenuLayout";

const Home = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [type, setType] = useState("")
    const [allergies, setAllergies] = useState("")

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
            console.error("Failed to fetch menu:", error)
            setError(true)
        } finally {
            setLoading(false)
        }
    };
    
    useEffect(() => {
        fetchMenu();
    }, [type, allergies]);

    return (
        <>
            <MenuLayout setType = {setType} setAllergies = {setAllergies} fetchMenu = {fetchMenu}/>
            <h1>Welcome to Plately 😺</h1>
            {!error && loading && <FadeLoader />}
            {error && <div>Failed to load dishes. Please try again.</div>}
            {!error && !loading && dishes.length > 0 && (
            dishes.map((dish) => (<Menu key={dish.id}{...dish}/>
            ))
            )}
            {!error && !loading && dishes.length === 0 && (
            <div>Nothing for this selection 😿</div>
            )}

        </>
    );
};

export default Home;
