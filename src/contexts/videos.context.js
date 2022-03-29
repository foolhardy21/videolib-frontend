import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { videosReducer } from "../reducers";

const VideosContext = createContext()

export const VideosProvider = ({ children }) => {
    const [videosState, videosDispatch] = useReducer(videosReducer, {
        videos: [],
        alert: {
            message: '',
            type: ''
        },
        loading: false
    })

    function showVideosAlert(message, type) {
        videosDispatch({
            type: 'SET_ALERT', payload: {
                message,
                type
            }
        })
        setTimeout(() => videosDispatch({ type: 'REMOVE_ALERT' }), 1500)
    }

    async function getVideos() {
        videosDispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get('/api/videos')
            return response.data.videos
        } catch (e) {
            return e.response.status
        } finally {
            videosDispatch({ type: 'REMOVE_LOADING' })
        }
    }

    function filterVideos(videos, filterArr) {
        return filterArr.length > 0 ? videos.filter(video => filterArr.find(category => category === video.category)) : videos
    }

    return (
        <VideosContext.Provider
            value={{
                videosState,
                videosDispatch,
                getVideos,
                showVideosAlert
            }}
        >
            {children}
        </VideosContext.Provider>
    )
}

export const useVideos = () => useContext(VideosContext)
