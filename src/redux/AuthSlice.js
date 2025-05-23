import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: true,
  guestSetupCompleted: false,
  error: null
}

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken')
    const storedUserData = localStorage.getItem('userData')

    if (!token) return rejectWithValue('No token found')

    try {
      const userId = token.split('-')[2]
      let userData = storedUserData ? JSON.parse(storedUserData) : null

      if (!userData && userId) {
        const res = await fetch(`${API_URL}/users?id=eq.${userId}`)
        if (!res.ok) throw new Error('Network response was not ok')
        
        const data = await res.json()

        if (data && data.length > 0) {
          userData = {
            id: data[0].id,
            username: data[0].username,
            role: data[0].role
          }
          localStorage.setItem('userData', JSON.stringify(userData))
        }
      }

      if (userData) {
        return {
          currentUser: userData,
          guestSetupCompleted: localStorage.getItem('guestSetupCompleted') === 'true'
        }
      }
      throw new Error('No user data found')
    } catch (error) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      return rejectWithValue(error.message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/users`)
      if (!res.ok) throw new Error('Network response was not ok')
      
      const data = await res.json()
      const user = data.find(u => u.username.toLowerCase() === username.toLowerCase())

      if (user && user.password === password) {
        const userData = {
          id: user.id,
          username: user.username,
          role: user.role || 'user'
        }

        const fakeToken = `fake-token-${user.id}-${Date.now()}`
        localStorage.setItem('authToken', fakeToken)
        localStorage.setItem('userData', JSON.stringify(userData))

        return {
          currentUser: userData,
          guestSetupCompleted: localStorage.getItem('guestSetupCompleted') === 'true'
        }
      }
      return rejectWithValue('Invalid credentials')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('guestSetupCompleted')
      state.currentUser = null
      state.isAuthenticated = false
      state.loading = false
      state.guestSetupCompleted = false
      state.error = null
    },
    completeGuestSetup(state) {
      localStorage.setItem('guestSetupCompleted', 'true')
      state.guestSetupCompleted = true
    },
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Check Auth Status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload.currentUser
        state.isAuthenticated = true
        state.guestSetupCompleted = action.payload.guestSetupCompleted
        state.error = null
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.currentUser = null
        state.error = action.payload
      })
      
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.currentUser = action.payload.currentUser
        state.guestSetupCompleted = action.payload.guestSetupCompleted
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.currentUser = null
        state.error = action.payload
      })
  }
})

export const { logout, completeGuestSetup, clearError } = authSlice.actions
export default authSlice.reducer