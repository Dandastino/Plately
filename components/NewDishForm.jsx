import {useState} from "react"
import {Alert, Button} from "react-bootstrap"
import React from 'react'
const NewDishForm = () =>{

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [photo, setPhoto] = useState("")
    const [allergies, setAllergies] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("0")
    const [response, setResponse] = useState(null)  
    const [error, setError] = useState("")

    const validateForm = () => {
        let isValide = true
        const errors = {
            price: "",
        }

        if (parseFloat(price) < 0){
            isValide = false
            error.price = "Please insert a valid price"
        }

    }

    const handleSubmit = async event =>{
        event.preventDefault()

        if (!validateForm()) return

        const dishData ={
            name,
            type, 
            photo,
            allergies,
            description,
            price,
        }

        try {
            const response = await fetch("http://localhost:3000/dishes", {
                method:"POST",
                headers:{"Content-Type": "application/json"
            }, 
            body: JSON.stringify(dishData),
        })  
        const responseData = await response.json()
        setResponse(responseData)
        setName("")
        setDescription("")
        setPhoto("")
        setType("")
        setPrice("")
        } catch (error) {
            setError(error.message)
        }
    }

    return(
        <>
         <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Dish Name" value={name}
            onChange={event => setName(event.target.value)}/>

            <label htmlFor="type">Course</label>
            <select id="type" value={type}onChange={event => setType(event.target.value)}>
                <option value="appetizer">Appetizer</option>
                <option value="primo">First Course</option>
                <option value="secondo">Second Course</option>
                <option value="pizza">Pizza</option>
                <option value="side">Side</option>
                <option value="drink">Drink</option>
            </select>


            <label htmlFor="photo">Image URL</label>
            <input id="photo" type="text" placeholder="Dish Image URL" value={photo}            
            onChange={event => setPhoto(event.target.value)}/>


            <label htmlFor="description">Description</label>
            <textarea id="description" value={description}
            onChange={event => setDescription(event.target.value)}/>


            <label htmlFor="allergies">Allergies</label>
            <select id="allergies" value={allergies}onChange={event => setAllergies(event.target.value)}>
                <option value=""></option>
                <option value="fish">Sea</option>
                <option value="land">Land</option>
                <option value="gluten free">Gluten Free</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
            </select>


            <label htmlFor="prezzo">Price</label>
            <input id="prezzo" type="number" placeholder="Dish Price" value={price}
            onChange={event => setPrice(event.target.value)}/>

            <Button type="submit">Add Product</Button>
        </form>

        {response && <Alert variant="success">Dishes added Succesfully! ID={response.id}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        </>
       
    )
}
export default NewDishForm