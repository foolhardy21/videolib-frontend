import { ACTION_INIT_VIDEOS, ACTION_SET_ALERT, ACTION_REMOVE_ALERT, ACTION_SET_LOADING, ACTION_REMOVE_LOADING, ACTION_FILTER_VIDEOS } from '../utils/constants.util'

export function videosReducer(state, { type, payload }) {

    switch (type) {

        case ACTION_INIT_VIDEOS: return { ...state, videos: payload }

        case ACTION_SET_ALERT: return {
            ...state, alert: {
                message: payload.message,
                type: payload.type
            }
        }

        case ACTION_REMOVE_ALERT: return {
            ...state, alert: {
                message: '',
                type: ''
            }
        }

        case ACTION_SET_LOADING: return { ...state, loading: true }

        case ACTION_REMOVE_LOADING: return { ...state, loading: false }

        case ACTION_FILTER_VIDEOS: return { ...state, videos: filterVideos(payload.videos, payload.filterState) }

        default: return state

    }
}

/*
    * this function filters the videos according to categories present in the filter
    * @params {Array.prototype} videos - array of all video objects
    * @params {Array.prototype} filterArr - array of category strings
    * @returns {Array.prototype} array of filtered videos objects.
    *     
*/
function filterVideos(videos, filterArr) {
    return filterArr.length > 0 ? videos.filter(video => filterArr.find(category => category === video.category)) : videos
}
