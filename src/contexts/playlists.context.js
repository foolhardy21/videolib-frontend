import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { playlistsReducer } from '../reducers'
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

    function hidePlaylistModal() {
        setIsPlaylistModalVisible(false)
    }

    function showPlaylistModal() {
        setIsPlaylistModalVisible(true)
    }

    function showPlaylistsAlert(message, type) {
        playlistsDispatch({
            type: 'SET_ALERT', payload: {
                message,
                type
            }
        })
        setTimeout(() => playlistsDispatch({ type: 'REMOVE_ALERT' }), 1500)
    }

    async function getPlaylists() {
        playlistsDispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get('/api/user/playlists', {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.playlists
        } catch (e) {
            return e.response.status
        } finally {
            playlistsDispatch({ type: 'REMOVE_LOADING' })
        }
    }

    async function removePlaylist(_id) {
        try {
            const response = await axios.delete(`/api/user/playlists/${_id}`, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.playlists
        } catch (e) {
            return e.response.status
        }
    }

    async function addNewPlaylist(name, description) {
        try {
            const response = await axios.post('/api/user/playlists', {
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

    async function addVideoToPlaylist(video, playlistId) {
        try {
            await axios.post(`/api/user/playlists/${playlistId}`, {
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

    return (
        <PlaylistsContext.Provider
            value={{
                playlistsState,
                playlistsDispatch,
                getPlaylists,
                removePlaylist,
                addNewPlaylist,
                addVideoToPlaylist,
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
