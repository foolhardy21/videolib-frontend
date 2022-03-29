const { createContext, useState, useContext } = require("react");

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState('')

    return (
        <NotificationContext.Provider
            value={{
                notification,
                setNotification
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext)