import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { playlistsReducer } from '../reducers'
import { useAuth } from "./auth.context";

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
        try {
            const response = await axios.get('/api/user/playlists', {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.playlists
        } catch (e) {
            return e.response.status
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

    return (
        <PlaylistsContext.Provider
            value={{
                playlistsState,
                playlistsDispatch,
                getPlaylists,
                removePlaylist,
                addNewPlaylist,
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
