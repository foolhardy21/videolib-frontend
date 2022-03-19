import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { historyReducer } from "../reducers";
import { useAuth } from "./";

const HistoryContext = createContext()

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

    function showHistoryAlert(message, type) {
        historyDispatch({
            type: 'SET_ALERT', payload: {
                message,
                type
            }
        })
        setTimeout(() => historyDispatch({ type: 'REMOVE_ALERT' }), 1500)
    }

    async function getHistory() {
        historyDispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get('/api/user/history', {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.history
        } catch (e) {
            return e.response.status
        } finally {
            historyDispatch({ type: 'REMOVE_LOADING' })
        }
    }

    async function removeHistory() {
        try {
            const response = await axios.delete('/api/user/history/all', {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.history
        } catch (e) {
            return e.response.status
        }
    }

    async function addVideoToHistory(video) {
        try {
            await axios.post('/api/user/history', {
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

    async function removeVideoFromHistory(_id) {
        try {
            const response = await axios.delete(`/api/user/history/${_id}`, {
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
