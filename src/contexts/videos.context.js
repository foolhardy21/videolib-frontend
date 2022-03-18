import { createContext, useContext, useReducer } from "react";

const VideosContext = createContext()

export const VideosProvider = ({ children }) => {
    const [videosState, videosDispatch] = useReducer(videosReducer, [])

    function videosReducer(state, action) {

        switch (action.type) {

            case 'INIT_VIDEOS': return [...action.payload]

            case 'FILTER_VIDEOS': return filterVideos(action.payload.videos, action.payload.filterState)

            default: return state

        }
    }

    function filterVideos(videos, filterArr) {
        return filterArr.length > 0 ? videos.filter(video => filterArr.find(category => category === video.category)) : videos
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