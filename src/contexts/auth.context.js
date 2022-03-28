import axios from "axios"
import { createContext, useState, useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const RequireAuth = ({ children }) => {
        const location = useLocation()
        return isUserLoggedIn ? children : <Navigate to='/login' state={{ from: location }} replace />
    }

    async function loginUser(email, password) {
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            })
            window.localStorage.setItem('userToken', response.data.encodedToken)
            setIsUserLoggedIn(true)
            return response.status
        } catch (e) {
            return e.response.status
        }
    }

    async function signupUser(email, password, firstName, lastName) {
        try {
            const response = await axios.post('/api/auth/signup', {
                email,
                password,
                firstName,
                lastName,
            })
            return response.status
        } catch (e) {
            return e.response.status
        }
    }

    function logoutUser() {
        window.localStorage.removeItem('userToken')
        setIsUserLoggedIn(false)
    }

    const getUserToken = () => window.localStorage.getItem('userToken')

    return (
        <AuthContext.Provider
            value={{
                isUserLoggedIn,
                loginUser,
                signupUser,
                logoutUser,
                getUserToken,
                RequireAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)