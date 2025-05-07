import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [guestSetupCompleted, setGuestSetupCompleted] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken')
      
      if (token) {
        try {
          const userId = token.split('-')[2]
          
          if (userId) {
            const storedUserData = localStorage.getItem('userData')
            if (storedUserData) {
              const userData = JSON.parse(storedUserData)
              setCurrentUser(userData)
              setIsAuthenticated(true)
              
              if (userData.role === 'user') {
                const setupCompleted = localStorage.getItem('guestSetupCompleted')
                setGuestSetupCompleted(setupCompleted === 'true')
              }
            } else {
              try {
                const response = await axios.get(`http://localhost:3000/users?id=eq.${userId}`)
                if (response.data) {
                  const userData = {
                    id: response.data.id,
                    username: response.data.username,
                    role: response.data.role
                  }
                  
                  setCurrentUser(userData)
                  setIsAuthenticated(true)
                  localStorage.setItem('userData', JSON.stringify(userData))

                  if (userData.role === 'user') {
                    const setupCompleted = localStorage.getItem('guestSetupCompleted')
                    setGuestSetupCompleted(setupCompleted === 'true')
                  }
                } else {
                  localStorage.removeItem('authToken')
                  localStorage.removeItem('userData')
                }
              } catch (error) {
                console.error("Error occurred:", error)
                localStorage.removeItem('authToken')
                localStorage.removeItem('userData')
              }
            }
          }
        } catch (error) {
          console.error("Error during authentication:", error)
          localStorage.removeItem('authToken')
          localStorage.removeItem('userData')
        }
      }
      
      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = async (username, password) => {
    try {
      const response = await axios.get(`http://localhost:3000/users`)
      
      const user = response.data.find(u => 
        u.username.toLowerCase() === username.toLowerCase()
      )
      
      if (user && user.password === password) {
        const userWithoutPassword = {
          id: user.id,
          username: user.username,
          role: user.role || 'user' 
        }
        
        const fakeToken = `fake-token-${user.id}-${Date.now()}`
        localStorage.setItem('authToken', fakeToken)
        localStorage.setItem('userData', JSON.stringify(userWithoutPassword))
        
        setCurrentUser(userWithoutPassword)
        setIsAuthenticated(true)

        if (userWithoutPassword.role === 'user') {
          const setupCompleted = localStorage.getItem('guestSetupCompleted')
          setGuestSetupCompleted(setupCompleted === 'true')
        }

        return { success: true, user: userWithoutPassword }
      } else {
        return { success: false, error: "Credential Error" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Error during the login, retry." }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    localStorage.removeItem('guestSetupCompleted')
    setCurrentUser(null)
    setIsAuthenticated(false)
    setGuestSetupCompleted(false)
  }

  const completeGuestSetup = () => {
    setGuestSetupCompleted(true)
    localStorage.setItem('guestSetupCompleted', 'true')
  }

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout,
    guestSetupCompleted,
    completeGuestSetup
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext