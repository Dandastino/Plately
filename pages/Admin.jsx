import React from 'react'
import NewDishForm from "../components/NewDishForm"
import {useState} from "react"

const Admin = () =>{
    const [isNewDish, setIsNewDish] = useState(true)

    return(
        <NewDishForm />
    )
}
export default Admin