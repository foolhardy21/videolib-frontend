import axios from "axios"
import { createContext, useState, useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { API_LOGIN, API_SIGNUP } from '../utils/constants.util'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    /*
        * this function restricts access to private routes
        * @params {React.Component} children - All the components wrapper inside this function
        * @return {React.Component} - if the user is logged in then the child component is returned, otherwise app is redirected to login page 

    */
    const RequireAuth = ({ children }) => {
        const location = useLocation()
        return isUserLoggedIn ? children : <Navigate to='/login' state={{ from: location }} replace />
    }

    /*
        * this function logs in the user
        * @params {string} email - email entered in login form
        * @params {string} password - password entered in login form
        * @return {Number} response.status - the response status code is checked in component 

    */
    async function loginUser(email, password) {
        try {
            const response = await axios.post(API_LOGIN, {
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

    /*
        * this function signs up the user
        * @params {string} email - email entered in login form
        * @params {string} password - password entered in login form
        * @params {string} firstName - firstName entered in login form
        * @params {string} lastName - lastName entered in login form
        * @return {Number} response.status - the response status code is checked in component
    */
    async function signupUser(email, password, firstName, lastName) {
        try {
            const response = await axios.post(API_SIGNUP, {
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

    /*
        * this function logs out the user by removing the token from local storage.
    */
    function logoutUser() {
        window.localStorage.removeItem('userToken')
        setIsUserLoggedIn(false)
    }

    /*
        * this getter function returns the token of logged in user 
        * @return {string} - the token stored in local storage of the browser
    */
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