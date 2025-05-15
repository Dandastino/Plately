import React, { useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Route, Routes } from 'react-router'
import NotFound from './pages/NotFound'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import DishDetail from './pages/DishDetail'
import Guest from './pages/Guest'
import Cart from './pages/Cart'
import { Provider, useDispatch } from 'react-redux'
import { ProtectedRoute, GuestRoute } from "./components/AuthRoutes"
import store from './redux/store'
import { checkAuthStatus } from './redux/AuthSlice'

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path='/login' element={<Login />} />
        <Route index element={<Login />} />
      </Route>
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
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App