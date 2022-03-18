const { createContext, useContext, useState } = require("react");

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')

    function toggleTheme() {
        theme === 'light' ? setTheme('dark') : setTheme('light')
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
