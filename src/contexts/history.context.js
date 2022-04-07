import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { historyReducer } from "reducers";
import { ACTION_REMOVE_ALERT, ACTION_REMOVE_LOADING, ACTION_SET_ALERT, ACTION_SET_LOADING, ALERT_DISPLAY_TIME, API_HISTORY } from "utils/constants.util";
import { useAuth } from "./";

const HistoryContext = createContext({})

export const HistoryProvider = ({ children }) => {
    const [historyState, historyDispatch] = useReducer(historyReducer, {
        history: [],
        alert: {
            message: '',
            type: ''
        },
        loading: false
    })
    const { getUserToken } = useAuth()

    /**
        * this function is used to show the alert on history page
        * @param {string} message - message to be displayed
        * @param {string} type - type of alert (success/error)    
    */
    function showHistoryAlert(message, type) {
        historyDispatch({
            type: ACTION_SET_ALERT, payload: {
                message,
                type
            }
        })
        setTimeout(() => historyDispatch({ type: ACTION_REMOVE_ALERT }), ALERT_DISPLAY_TIME)
    }

    /**
        * this function is used to fetch history of the logged in user
        * @return {Array.prototype} response.data.history - array of history video objects
        * @return {Number} e.response.status - error status code    
    */
    async function getHistory() {
        historyDispatch({ type: ACTION_SET_LOADING })
        try {
            const response = await axios.get(API_HISTORY, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.history
        } catch (e) {
            return e.response.status
        } finally {
            historyDispatch({ type: ACTION_REMOVE_LOADING })
        }
    }

    /**
        * this function is used to remove the entire history of the user
        * @return {Number} e.response.status - error status code    
    */
    async function removeHistory() {
        try {
            const response = await axios.delete(`${API_HISTORY}/all`, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.history
        } catch (e) {
            return e.response.status
        }
    }

    /**
        * this function is used to add video to the history the user
        * @return {Number} e.response.status - error status code    
    */
    async function addVideoToHistory(video) {
        try {
            await axios.post(API_HISTORY, {
                video
            }, {
                headers: {
                    authorization: getUserToken()
                }
            })
        } catch (e) {
            return e.response.status
        }
    }

    /**
        * this function is used to remove video from the history the user
        * @return {Array.prototype} response.data.history - array of history video objects
        * @return {Number} e.response.status - error status code    
    */
    async function removeVideoFromHistory(_id) {
        try {
            const response = await axios.delete(`${API_HISTORY}/${_id}`, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.history
        } catch (e) {
            return response.status
        }
    }

    return (
        <HistoryContext.Provider
            value={{
                historyState,
                historyDispatch,
                getHistory,
                removeHistory,
                showHistoryAlert,
                addVideoToHistory,
                removeVideoFromHistory,
            }}
        >
            {children}
        </HistoryContext.Provider>
    )
}

export const useHistory = () => useContext(HistoryContext)
