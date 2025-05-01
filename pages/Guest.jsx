import { useState } from "react"
import React from "react"
import { Form, useNavigate } from "react-router"


const Guest = () =>{

    const [table, setTable] = useState("")
    const [guest, setGuest] = useState("")
    const [error, setError] = useState("") 
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        
        const numGuests = parseInt(guest)
        const tableNum = parseInt(table)


        if (isNaN(numGuests) || numGuests <= 0) {
            setError("Please enter a positive number of guests")
        } else if (isNaN(numGuests)) {
            setError("Please enter a valid number of guests")
        } else if (isNaN(tableNum)) {
            setError("Please enter a valid table number")
        } else {
            navigate("/home")
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">How many guests are there?</label>
                <input type="number" value={guest} onChange={e => setGuest(e.target.value)}/>

                <label htmlFor="">In which table are they going to stay?</label>
                <input type="number" value={table} onChange={e => setTable(e.target.value)}/>

                <button type="submit">Confirm</button>

                {error && <p style={{color: "red"}}>{error}</p>} 
            </div>
        </form>
    )
}

export default Guest