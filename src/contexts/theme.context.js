import { THEME_DARK, THEME_LIGHT } from "../utils/constants.util";

const { createContext, useContext, useState } = require("react");

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(THEME_LIGHT)

    /*
        * this function toggles the theme state    
    */
    function toggleTheme() {
        theme === THEME_LIGHT ? setTheme(THEME_DARK) : setTheme(THEME_LIGHT)
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
