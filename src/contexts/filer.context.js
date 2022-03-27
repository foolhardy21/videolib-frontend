import { createContext, useContext, useReducer } from "react";

const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
    const [filterState, filterDispatch] = useReducer(filterReducer, [])

    function filterReducer(state, action) {

        switch (action.type) {

            case 'ADD_CATEGORY': return state.concat(action.payload)

            case 'REMOVE_CATEGORY': return state.filter(category => category !== action.payload)

            default: return state
        }
    }

    return (
        <FilterContext.Provider
            value={{
                filterState,
                filterDispatch
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => useContext(FilterContext)