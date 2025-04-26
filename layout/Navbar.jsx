import { NavLink } from "react-router"

function Navbar (){

    const normalStyle = {
        color : "#444"
    }

    const activeStyle = {
        color : "#007bff"
    }

    return(
        <nav>
            <NavLink to="/" style = {({isActive}) => (isActive ? activeStyle : normalStyle)}>Home</NavLink>
            <NavLink to="/Admin" style = {({isActive}) => (isActive ? activeStyle : normalStyle)}>Add Dish</NavLink>
        </nav>
    )
}

export default Navbar