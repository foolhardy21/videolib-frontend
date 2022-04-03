import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "reducers";
import { API_CATEGORIES } from "utils/constants.util";

const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
    const [filterState, filterDispatch] = useReducer(filterReducer, [])

    /*
        * this function is used to fetch the categories
        * @return {Array.prototype} response.data.categories - array of category objects 
        * @return {Number} e.response.status - the error status code
    */
    async function getCategories() {
        try {
            const response = await axios.get(API_CATEGORIES)
            return response.data.categories
        } catch (e) {
            return e.response.status
        }
    }

    /*
        * this function checks if the chosen category is in the filter array or not
        * @param {string} value - chosen category  
        * @return {boolean} 
    */
    const isCategoryIncludedInFilter = value => !filterState.find(category => category === value) ? false : true

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
