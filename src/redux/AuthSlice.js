import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: true,
  guestSetupCompleted: false
}

export const checkAuthStatus = createAsyncThunk('auth/checkStatus', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('authToken')
  const storedUserData = localStorage.getItem('userData')

  if (!token) return rejectWithValue('No token found')

  try {
    const userId = token.split('-')[2]
    let userData = storedUserData ? JSON.parse(storedUserData) : null

    if (!userData && userId) {
      const res = await fetch(`http://localhost:3000/users?id=eq.${userId}`)
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
    } else {
      throw new Error('No user data found')
    }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Thunk per login
export const login = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:3000/users')
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

    return rejectWithValue('Credential Error')
  } catch (error) {
    return rejectWithValue('Login failed. Please try again.')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('guestSetupCompleted')
      return { ...initialState, loading: false }
    },
    completeGuestSetup(state) {
      localStorage.setItem('guestSetupCompleted', 'true')
      state.guestSetupCompleted = true
    }
  },
  extraReducers: builder => {
    builder
      .addCase(checkAuthStatus.pending, state => {
        state.loading = true
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload.currentUser
        state.isAuthenticated = true
        state.guestSetupCompleted = action.payload.guestSetupCompleted
      })
      .addCase(checkAuthStatus.rejected, state => {
        state.loading = false
        state.isAuthenticated = false
        state.currentUser = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.currentUser = action.payload.currentUser
        state.guestSetupCompleted = action.payload.guestSetupCompleted
      })
      .addCase(login.rejected, (state) => {
        state.isAuthenticated = false
        state.currentUser = null
      })
  }
})

export const { logout, completeGuestSetup } = authSlice.actions
export default authSlice.reducer
