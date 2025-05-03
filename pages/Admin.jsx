import React, { useState } from 'react'
import { Container, Nav } from 'react-bootstrap'
import NewDishForm from "../components/NewDishForm"

const Admin = () => {
  const [activeTab, setActiveTab] = useState('newDish')
  
  return (
    <Container className="py-4">
      <h1 className="mb-4">Restaurant Admin Panel</h1>
      
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'newDish'} 
            onClick={() => setActiveTab('newDish')}
          >
            Add New Dish
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'manageDishes'} 
            onClick={() => setActiveTab('manageDishes')}
          >
            Manage Dishes
          </Nav.Link>
        </Nav.Item>
      </Nav>
      
      {activeTab === 'newDish' && <NewDishForm />}
      {activeTab === 'manageDishes' && <p>Dish management interface will appear here</p>}
    </Container>
  )
}

export default Admin