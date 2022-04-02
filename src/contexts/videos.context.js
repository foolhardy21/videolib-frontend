import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { videosReducer } from "../reducers";
import { ALERT_DISPLAY_TIME, ACTION_SET_ALERT, ACTION_REMOVE_ALERT, ACTION_SET_LOADING, API_VIDEOS, ACTION_REMOVE_LOADING } from "../utils/constants.util";

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
    const [selectedVideo, setSelectedVideo] = useState({})

    /*
        * this function sets the current selected video
        * @param {Object.prototype} video - video object    
    */
    function updateSelectedVideo(video) {
        setSelectedVideo(video)
    }

    /*
        * this function shows alert on videos page
        * @param {string} message - message to be displayed
        * @param {string} type - type of alert(success/error)    
    */
    function showVideosAlert(message, type) {
        videosDispatch({
            type: ACTION_SET_ALERT, payload: {
                message,
                type
            }
        })
        setTimeout(() => videosDispatch({ type: ACTION_REMOVE_ALERT }), ALERT_DISPLAY_TIME)
    }

    /*
        * this function fetches all the videos
        * @return {Array.prototype} response.data.videos - array of video objects
        * @param {Number} e.response.status - error status code    
    */
    async function getVideos() {
        videosDispatch({ type: ACTION_SET_LOADING })
        try {
            const response = await axios.get(API_VIDEOS)
            return response.data.videos
        } catch (e) {
            return e.response.status
        } finally {
            videosDispatch({ type: ACTION_REMOVE_LOADING })
        }
    }

    return (
        <VideosContext.Provider
            value={{
                videosState,
                videosDispatch,
                getVideos,
                showVideosAlert,
                selectedVideo,
                updateSelectedVideo,
            }}
        >
            {children}
        </VideosContext.Provider>
    )
}

export const useVideos = () => useContext(VideosContext)
