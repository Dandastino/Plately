import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlice'
import cartReducer from './CartSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  }
})

export default store