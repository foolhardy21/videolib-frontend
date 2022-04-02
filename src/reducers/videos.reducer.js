export function videosReducer(state, action) {

    switch (action.type) {

        case 'INIT_VIDEOS': return { ...state, videos: action.payload }

        case 'SET_ALERT': return {
            ...state, alert: {
                message: action.payload.message,
                type: action.payload.type
            }
        }

        case 'REMOVE_ALERT': return {
            ...state, alert: {
                message: '',
                type: ''
            }
        }

        case 'SET_LOADING': return { ...state, loading: true }

        case 'REMOVE_LOADING': return { ...state, loading: false }

        case 'FILTER_VIDEOS': return { ...state, videos: filterVideos(action.payload.videos, action.payload.filterState) }

        default: return state

    }
}

function filterVideos(videos, filterArr) {
    return filterArr.length > 0 ? videos.filter(video => filterArr.find(category => category === video.category)) : videos
}
