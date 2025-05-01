import { Outlet } from "react-router"
import React from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = () => {
    return(
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout