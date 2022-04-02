import axios from 'axios'
import { createContext, useContext, useReducer } from 'react'
import { useAuth } from './auth.context'
import { likesReducer } from '../reducers'
import { ACTION_REMOVE_LOADING, ACTION_SET_LOADING, API_LIKES } from '../utils/constants.util'

const LikesContext = createContext()

export const LikesProvider = ({ children }) => {
    const [likesState, likesDispatch] = useReducer(likesReducer, {
        likedVideos: [],
        loading: false
    })
    const { getUserToken } = useAuth()

    async function addVideoToLikes(video) {
        try {
            const response = await axios.post(API_LIKES, {
                video
            }, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.likes
        } catch (e) {
            return e.response.status
        }
    }

    async function removeVideoFromLikes(_id) {
        try {
            const response = await axios.delete(`${API_LIKES}/${_id}`, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.likes
        } catch (e) {
            return e.response.status
        }
    }

    async function getLikedVideos() {
        likesDispatch({ type: ACTION_SET_LOADING })
        try {
            const response = await axios.get(API_LIKES, {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.likes
        } catch (e) {
            return e.response.status
        } finally {
            likesDispatch({ type: ACTION_REMOVE_LOADING })
        }
    }

    const isVideoLiked = _id => likesState.likedVideos.some(likedVideo => likedVideo._id === _id)

    return (
        <LikesContext.Provider
            value={{
                likesState,
                likesDispatch,
                isVideoLiked,
                addVideoToLikes,
                removeVideoFromLikes,
                getLikedVideos,
            }}
        >
            {children}
        </LikesContext.Provider>
    )
}

export const useLikes = () => useContext(LikesContext)
