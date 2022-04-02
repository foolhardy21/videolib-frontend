import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useAuth } from "./";
import { watchlaterReducer } from '../reducers'
import { ACTION_REMOVE_LOADING, ACTION_SET_LOADING, API_WATCHLATER } from "../utils/constants.util";

const WatchlaterContext = createContext()

export const WatchlaterProvider = ({ children }) => {
    const [watchlaterState, watchlaterDispatch] = useReducer(watchlaterReducer, {
        watchlaterVideos: [],
        loading: false,
    })
    const { getUserToken } = useAuth()

    async function getWatchlater() {
        watchlaterDispatch({ type: ACTION_SET_LOADING })
        try {
            const response = await axios.get(API_WATCHLATER, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.watchlater
        } catch (e) {
            return e.response.status
        } finally {
            watchlaterDispatch({ type: ACTION_REMOVE_LOADING })
        }
    }

    async function addToWatchlater(video) {
        try {
            const response = await axios.post(API_WATCHLATER, {
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

    async function removeFromWatchlater(videoId) {
        try {
            await axios.delete(`${API_WATCHLATER}/${videoId}`, {
                headers: {
                    authorization: getUserToken()
                }
            })
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
                removeFromWatchlater,
            }}
        >
            {children}
        </WatchlaterContext.Provider>
    )
}

export const useWatchlater = () => useContext(WatchlaterContext)