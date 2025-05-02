import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router'
import NotFound from '../pages/NotFound'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Admin from '../pages/Admin';
import DishDetail from '../pages/DishDetail';
import Guest from '../pages/Guest';
import Cart from '../pages/Cart'
import { AuthProvider } from '../contexts/AuthContext'

import ProtectedRoute from '../components/ProtectedRoute'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route index element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Layout />}>
            <Route path='/guest' element={<Guest />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/dishes/:dishID' element={<DishDetail />} />
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path='/admin' element={<Admin />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App