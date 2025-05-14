import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import NewDishForm from '../components/NewDishForm'
import ManageDishForm from '../components/ManageDishForm'
import './Admin.css'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('newDish')
  
  return (
    <div className="admin-container">
      <h1 className="admin-title">Restaurant Admin Panel</h1>
      
      <Nav variant="tabs" className="admin-nav">
        <Nav.Item>
          <Nav.Link active={activeTab === 'newDish'} onClick={() => setActiveTab('newDish')}>
            Add New Dish
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'manageDishes'} onClick={() => setActiveTab('manageDishes')}>
            Manage Dishes
          </Nav.Link>
        </Nav.Item>
      </Nav>
      
      <div className="tab-content">
        {activeTab === 'newDish' && <NewDishForm />}
        {activeTab === 'manageDishes' && <ManageDishForm />}
      </div>
    </div>
  )
}

export default Admin