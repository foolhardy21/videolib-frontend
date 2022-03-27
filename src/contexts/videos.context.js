import { createContext, useContext, useReducer } from "react";

const VideosContext = createContext()

export const VideosProvider = ({ children }) => {
    const [videosState, videosDispatch] = useReducer(videosReducer, [])

    function videosReducer(state, action) {

        switch (action.type) {

            case 'INIT_VIDEOS': return [...action.payload]

            case 'FILTER_VIDEOS': return action.payload.videos.filter(video => video.category !== action.payload.category)

            default: return state

        }
    }

    return (
        <VideosContext.Provider
            value={{
                videosState,
                videosDispatch
            }}
        >
            {children}
        </VideosContext.Provider>
    )
}

export const useVideos = () => useContext(VideosContext)