import { Button, Card, Text } from "components/Reusable"
import { getDateForVideoCard, getSolidBtnBgColor, getSolidBtnTextColor, getTextColor } from 'utils'
import { useLikes, usePlaylists, useTheme, useVideos, useWatchlater } from "contexts"
import { ACTION_ADD_TO_LIKES, ACTION_REMOVE_FROM_LIKES, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "utils/constants.util"
import styles from './videos.module.css'
import { useState } from "react"
import { Link } from "react-router-dom"

const VideoCard = ({ video, video: {
    _id,
    url,
    title,
    description,
    views,
    uploadedOn,
    category
} }) => {
    const [isVideoAddedToWatchLater, setIsVideoAddedToWatchLater] = useState(false)
    const { theme } = useTheme()
    const { isVideoLiked, addVideoToLikes, removeVideoFromLikes, likesDispatch } = useLikes()
    const { showVideosAlert, updateSelectedVideo } = useVideos()
    const { showPlaylistModal } = usePlaylists()
    const { addToWatchlater, watchlaterDispatch } = useWatchlater()

    async function handleVideoLike() {
        const addToLikesResponse = await addVideoToLikes(video)
        if (addToLikesResponse === 409 || addToLikesResponse === 404 || addToLikesResponse === 500) {
            showVideosAlert('could not like the video', ALERT_TYPE_ERROR)
        } else {
            showVideosAlert('video added to likes', ALERT_TYPE_SUCCESS)
            likesDispatch({ type: ACTION_ADD_TO_LIKES, payload: video })
        }

    }

    async function handleVideoDislike() {
        const removeFromLikes = await removeVideoFromLikes(_id)
        if (removeFromLikes === 404 || removeFromLikes === 500) {
            showVideosAlert('could not dislike the video', ALERT_TYPE_ERROR)
        } else {
            showVideosAlert('video removed from likes', ALERT_TYPE_SUCCESS)
            likesDispatch({ type: ACTION_REMOVE_FROM_LIKES, payload: _id })
        }
    }

    function handleAddToPlaylist() {
        updateSelectedVideo(video)
        showPlaylistModal()
    }

    async function handleWatchlater() {
        const addToWatchlaterResponse = await addToWatchlater(video)
        if (addToWatchlaterResponse === 409) {
            showVideosAlert('video is already in watch later', 'success')
        } else if (addToWatchlaterResponse === 404 || addToWatchlaterResponse === 500) {
            showVideosAlert('could not add to watch later', 'error')
        } else {
            setIsVideoAddedToWatchLater(true)
            showVideosAlert('video added to watch later', 'success')
            watchlaterDispatch({ type: 'ADD_TO_WATCHLATER', payload: video })
        }
    }

    return (
        <Card id={styles.containerVideo} classes='flx flx-column flx-maj-stretch pd-xs pos-relative'>

            <Button onClick={handleWatchlater} classes={`btn-solid pos-absolute tr-1 z-1 ${getSolidBtnBgColor(theme)} ${getSolidBtnTextColor(theme)} pd-xs txt-md txt-lcase`}>
                {
                    isVideoAddedToWatchLater
                        ? 'added to watch later'
                        : 'watch later'
                }
            </Button>

            <Link to={`/videos/${_id}`}>
                <video id={styles.cardVideo}>
                    <source src={url}></source>
                </video>
            </Link>

            <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} card-txtw-s mg-btm-xs`}>{title}</Text>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{description.slice(0, 40)}....</Text>

            <div className="flx flx-maj-start mg-top-s mg-btm-s">

                <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-right-xs`}>{`${views} views`}</Text>

                <Text classes={`txt-md txt-cap ${getTextColor(theme)}`}>{getDateForVideoCard(uploadedOn)}</Text>

            </div>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{`category - ${category}`}</Text>


            <div className='flx flx-maj-end mg-top-xs'>

                {
                    isVideoLiked(_id) ?
                        <Button onClick={handleVideoDislike} classes={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>liked</Button> :
                        <Button onClick={handleVideoLike} classes={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>like</Button>
                }

                <Button onClick={handleAddToPlaylist} classes={`btn-txt txt-md ${getTextColor(theme)}`}>add to playlist</Button>

            </div>

        </Card>
    )
}

export default VideoCard
