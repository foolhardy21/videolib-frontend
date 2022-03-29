import { createContext, useContext, useReducer } from "react";

const PlaylistsContext = createContext()

export const PlaylistsProvider = ({ children }) => {
    const [playlistsState, playlistsDispatch] = useReducer(playlistsReducer, [])

    function playlistsReducer(state, action) {

        switch (action.type) {

            case 'INIT_PLAYLISTS': return [...action.payload]

            case 'ADD_NEW_PLAYLIST': return state.concat({ ...action.payload }).reverse()

            case 'REMOVE_PLAYLIST': return state.filter(playlist => playlist._id !== action.payload)

            default: return state

        }
    }

    return (
        <PlaylistsContext.Provider
            value={{
                playlistsState,
                playlistsDispatch
            }}
        >
            {children}
        </PlaylistsContext.Provider>
    )
}

export const usePlaylists = () => useContext(PlaylistsContext)
