import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { playlistsReducer } from 'reducers'
import { ACTION_REMOVE_ALERT, ACTION_REMOVE_LOADING, ACTION_SET_ALERT, ACTION_SET_LOADING, ALERT_DISPLAY_TIME, API_PLAYLISTS } from "utils/constants.util";
import { useAuth } from "./";

const PlaylistsContext = createContext()

export const PlaylistsProvider = ({ children }) => {
    const [playlistsState, playlistsDispatch] = useReducer(playlistsReducer, {
        playlists: [],
        alert: {
            message: '',
            type: ''
        },
        loading: false,
    })
    const [isPlaylistModalVisible, setIsPlaylistModalVisible] = useState(false)
    const { getUserToken } = useAuth()

    /*
        * this function hides the playlist modal    
    */
    function hidePlaylistModal() {
        setIsPlaylistModalVisible(false)
    }

    /*
        * this function shows the playlist modal    
    */
    function showPlaylistModal() {
        setIsPlaylistModalVisible(true)
    }

    /*
        * this function shows the alert on playlist page
        @param {string} message - message to be displayed
        @param {string} type - type of alert(success/error)    
    */
    function showPlaylistsAlert(message, type) {
        playlistsDispatch({
            type: ACTION_SET_ALERT, payload: {
                message,
                type
            }
        })
        setTimeout(() => playlistsDispatch({ type: ACTION_REMOVE_ALERT }), ALERT_DISPLAY_TIME)
    }

    /*
        * this function fetches all the playlists
        @return {Array.prototype} response.data.playlists - array of playlist objects
        @return {Number} e.response.status - error status code    
    */
    async function getPlaylists() {
        playlistsDispatch({ type: ACTION_SET_LOADING })
        try {
            const response = await axios.get(API_PLAYLISTS, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.playlists
        } catch (e) {
            return e.response.status
        } finally {
            playlistsDispatch({ type: ACTION_REMOVE_LOADING })
        }
    }

    /*
        * this function removes the playlist
        @param {string} _id - id of playlist
        @return {Array.prototype} response.data.playlists - array of updated playlist objects
        @return {Number} e.response.status - error status code    
    */
    async function removePlaylist(_id) {
        try {
            const response = await axios.delete(`${API_PLAYLISTS}/${_id}`, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.playlists
        } catch (e) {
            return e.response.status
        }
    }

    /*
        * this function adds a new playlist
        @param {string} name - name of the playlist
        @param {string} description - description of the playlist
        @return {Array.prototype} response.data.playlists - array of updated playlist objects
        @return {Number} e.response.status - error status code    
    */
    async function addNewPlaylist(name, description) {
        try {
            const response = await axios.post(API_PLAYLISTS, {
                playlist: {
                    name,
                    description,
                }
            }, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.playlists
        } catch (e) {
            return e.response.status
        }
    }

    /*
        * this function adds a video to the playlist
        @param {Object.prototype} video - video object
        @param {string} playlistId - id of the playlist
        @return {Number} e.response.status - error status code    
    */
    async function addVideoToPlaylist(video, playlistId) {
        try {
            await axios.post(`${API_PLAYLISTS}/${playlistId}`, {
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

    /*
        * this function removes a video from the playlist
        @param {string} videoId - id of the video
        @param {string} playlistId - id of the playlist
        @return {Number} e.response.status - error status code    
    */
    async function removeVideoFromPlaylist(videoId, playlistId) {
        try {
            await axios.delete(`${API_PLAYLISTS}/${playlistId}/${videoId}`, {
                headers: {
                    authorization: getUserToken()
                }
            })
        } catch (e) {
            return e.response.status
        }
    }

    return (
        <PlaylistsContext.Provider
            value={{
                playlistsState,
                playlistsDispatch,
                getPlaylists,
                removePlaylist,
                addNewPlaylist,
                addVideoToPlaylist,
                removeVideoFromPlaylist,
                showPlaylistsAlert,
                isPlaylistModalVisible,
                hidePlaylistModal,
                showPlaylistModal,
            }}
        >
            {children}
        </PlaylistsContext.Provider>
    )
}

export const usePlaylists = () => useContext(PlaylistsContext)
