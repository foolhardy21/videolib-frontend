import axios from 'axios'
import { createContext, useContext, useReducer } from 'react'
import { useAuth } from './auth.context'

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

    const isVideoLiked = _id => likesState.likedVideos.some(likedVideo => likedVideo._id === _id)

    function likesReducer(state, action) {

        switch (action.type) {

            case 'INIT_LIKES': return { ...state, likedVideos: action.payload }

            case 'ADD_TO_LIKES': return { ...state, likedVideos: state.likedVideos.concat({ ...action.payload }) }

            case 'REMOVE_FROM_LIKES': return { ...state, likedVideos: state.likedVideos.filter(video => video._id !== action.payload) }

            default: return state

        }
    }

    return (
        <LikesContext.Provider
            value={{
                likesState,
                likesDispatch,
                isVideoLiked,
                addVideoToLikes,
                removeVideoFromLikes
            }}
        >
            {children}
        </LikesContext.Provider>
    )
}

export const useLikes = () => useContext(LikesContext)