import { createContext, useContext, useReducer } from 'react'

const LikesContext = createContext()

export const LikesProvider = ({ children }) => {
    const [likesState, likesDispatch] = useReducer(likesReducer, [])

    function likesReducer(state, action) {

        switch (action.type) {

            case 'INIT_LIKES': return [...action.payload]

            case 'ADD_TO_LIKES': return state.concat({ ...action.payload })

            case 'REMOVE_FROM_LIKES': return state.filter(video => video._id !== action.payload)

            default: return state

        }
    }

    return (
        <LikesContext.Provider
            value={{
                likesState,
                likesDispatch
            }}
        >
            {children}
        </LikesContext.Provider>
    )
}

export const useLikes = () => useContext(LikesContext)