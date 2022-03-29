import axios from 'axios'
import { createContext, useContext, useReducer } from 'react'
import { useAuth } from './auth.context'
import { likesReducer } from '../reducers'

const LikesContext = createContext()

export const LikesProvider = ({ children }) => {
    const [likesState, likesDispatch] = useReducer(likesReducer, {
        likedVideos: [],
        alert: {
            message: '',
            type: ''
        },
        loading: false
    })
    const { getUserToken } = useAuth()

    function showLikesAlert(message, type) {
        likesDispatch({
            type: 'SET_ALERT', payload: {
                message,
                type
            }
        })
        setTimeout(() => likesDispatch({ type: 'REMOVE_ALERT' }), 1500)
    }

    async function addVideoToLikes(video) {
        try {
            const response = await axios.post('/api/user/likes', {
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
            const response = await axios.delete(`/api/user/likes/${_id}`, {
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
        likesDispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get('/api/user/likes', {
                headers: {
                    authorization: getUserToken()
                }
            })
            return response.data.likes
        } catch (e) {
            return e.response.status
        } finally {
            likesDispatch({ type: 'REMOVE_LOADING' })
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
                showLikesAlert,
            }}
        >
            {children}
        </LikesContext.Provider>
    )
}

export const useLikes = () => useContext(LikesContext)
