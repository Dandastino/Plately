import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (userId, { rejectWithValue }) => {
    try {
      const cartResponse = await fetch(`http://localhost:3000/cart?user_id=eq.${userId}`)
      const cartData = await cartResponse.json()
      
      if (cartData.length === 0) {
        return []
      }
      
      const cartId = cartData[0].id
      
      const itemsResponse = await fetch(`http://localhost:3000/cart_dish?cart_id=eq.${cartId}`)
      const itemsData = await itemsResponse.json()
      
      const itemsWithDetails = await Promise.all(
        itemsData.map(async (item) => {
          const dishResponse = await fetch(`http://localhost:3000/dishes?id=eq.${item.dish_id}`)
          const dishData = await dishResponse.json()
          return {
            ...item,
            ...dishData[0]
          }
        })
      )
      
      return itemsWithDetails
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    clearCart: (state) => {
      state.items = []
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer 