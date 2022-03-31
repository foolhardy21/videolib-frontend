import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useAuth } from "./";
import { watchlaterReducer } from '../reducers'

const WatchlaterContext = createContext()

export const WatchlaterProvider = ({ children }) => {
    const [watchlaterState, watchlaterDispatch] = useReducer(watchlaterReducer, {
        watchlaterVideos: [],
        loading: false,
    })
    const { getUserToken } = useAuth()

    async function getWatchlater() {
        watchlaterDispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get('/api/user/watchlater', {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.watchlater
        } catch (e) {
            return e.response.status
        } finally {
            watchlaterDispatch({ type: 'REMOVE_LOADING' })
        }
    }

    async function addToWatchlater(video) {
        try {
            const response = await axios.post('/api/user/watchlater', {
                video
            }, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.watchlater
        } catch (e) {
            return e.response.status
        }

    }

    return (
        <WatchlaterContext.Provider
            value={{
                watchlaterState,
                watchlaterDispatch,
                getWatchlater,
                addToWatchlater,
            }}
        >
            {children}
        </WatchlaterContext.Provider>
    )
}

export const useWatchlater = () => useContext(WatchlaterContext)