import { createContext, useContext, useReducer } from "react";

const HistoryContext = createContext()

export const HistoryProvider = ({ children }) => {
    const [historyState, historyDispatch] = useReducer(historyReducer, [])

    function historyReducer(state, action) {

        switch (action.type) {

            case 'INIT_HISTORY': return [...action.payload]

            case 'REMOVE_FROM_HISTORY': return state.filter(video => video._id !== action.payload)

            case 'REMOVE_HISTORY': return []

            default: return state

        }
    }

    return (
        <HistoryContext.Provider
            value={{
                historyState,
                historyDispatch
            }}
        >
            {children}
        </HistoryContext.Provider>
    )
}

export const useHistory = () => useContext(HistoryContext)