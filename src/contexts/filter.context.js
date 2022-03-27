import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducers";

const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
    const [filterState, filterDispatch] = useReducer(filterReducer, [])

    async function getCategories() {
        try {
            const response = await axios.get('/api/categories')
            return response.data.categories
        } catch (e) {
            return e.response.status
        }
    }

    function isCategoryIncludedInFilter(value) {
        return !filterState.find(category => category === value) ? false : true
    }


    return (
        <FilterContext.Provider
            value={{
                filterState,
                filterDispatch,
                getCategories,
                isCategoryIncludedInFilter,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => useContext(FilterContext)
