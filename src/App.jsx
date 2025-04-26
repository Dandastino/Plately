import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router'
import NotFound from '../pages/NotFound'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Admin from '../pages/Admin';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}
export default App
