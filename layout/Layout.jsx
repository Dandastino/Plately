import { Outlet } from "react-router"
import React, { useState, useEffect } from 'react'
import Footer from "./Footer"

const Layout = () => {
  const [tableNumber, setTableNumber] = useState(() => {
    const saved = localStorage.getItem("tableNumber")
    return saved !== null ? parseInt(saved) : null
  })

  const [guests, setGuests] = useState(() => {
    const saved = localStorage.getItem("guests")
    return saved !== null ? parseInt(saved) : null
  })

  useEffect(() => {
    if (tableNumber !== null) {
      localStorage.setItem("tableNumber", tableNumber)
    } else {
      localStorage.removeItem("tableNumber")
    }
  }, [tableNumber])

  useEffect(() => {
    if (guests !== null) {
      localStorage.setItem("guests", guests)
    } else {
      localStorage.removeItem("guests")
    }
  }, [guests])

  const handleTableClose = () => {
    setTableNumber(null)
    setGuests(null)
  }

  return (
    <>
        <Outlet context={{ tableNumber, guests, setTableNumber, setGuests }} />
        <Footer tableNumber={tableNumber} guests={guests} onTableClose={handleTableClose}/>
    </>
  )
}

export default Layout
