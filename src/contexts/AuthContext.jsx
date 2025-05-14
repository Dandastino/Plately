import { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [guestSetupCompleted, setGuestSetupCompleted] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken')
      const storedUserData = localStorage.getItem('userData')

      if (!token) {
        setLoading(false)
        return
      }

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
          setCurrentUser(userData)
          setIsAuthenticated(true)

          if (userData.role === 'user') {
            const setupCompleted = localStorage.getItem('guestSetupCompleted') === 'true'
            setGuestSetupCompleted(setupCompleted)
          }
        } else {
          handleLogout()
        }
      } catch (error) {
        console.error("Error during auth check:", error)
        handleLogout()
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    localStorage.removeItem('guestSetupCompleted')
    setCurrentUser(null)
    setIsAuthenticated(false)
    setGuestSetupCompleted(false)
  }

  const login = async (username, password) => {
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

        setCurrentUser(userData)
        setIsAuthenticated(true)

        if (userData.role === 'user') {
          const setupCompleted = localStorage.getItem('guestSetupCompleted') === 'true'
          setGuestSetupCompleted(setupCompleted)
        }

        return { success: true, user: userData }
      }

      return { success: false, error: "Credential Error" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Login failed. Please try again." }
    }
  }

  const completeGuestSetup = () => {
    localStorage.setItem('guestSetupCompleted', 'true')
    setGuestSetupCompleted(true)
  }

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout: handleLogout,
    guestSetupCompleted,
    completeGuestSetup
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
