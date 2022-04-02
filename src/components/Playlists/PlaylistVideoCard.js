import { Card, Text, Button, Icon } from '../Reusable'
import { usePlaylists, useTheme, useWatchlater } from '../../contexts'
import { getTextColor, getBgColor, getIconColor } from '../../utils'
import styles from './playlists.module.css'

const PlaylistVideoCard = ({ video: {
    _id,
    url,
    title,
    description,
    views,
    uploadedOn,
    category
}, playlistId, watchlaterVideo
}) => {
    const { theme } = useTheme()
    const { removeVideoFromPlaylist, showPlaylistsAlert, playlistsDispatch } = usePlaylists()
    const { removeFromWatchlater, watchlaterDispatch } = useWatchlater()

    async function handleRemoveVideoFromWatchlater() {
        const removeFromWatchlaterResponse = await removeFromWatchlater(_id)
        if (!(removeFromWatchlaterResponse === 404 || removeFromWatchlaterResponse === 500)) {
            watchlaterDispatch({ type: 'REMOVE_FROM_WATCHLATER', payload: _id })
        }
    }

    async function handleRemoveVideoFromPlaylist() {
        const removeVideoResponse = await removeVideoFromPlaylist(_id, playlistId)
        if (removeVideoResponse === 404 || removeVideoResponse === 409 || removeVideoResponse === 500) {
            showPlaylistsAlert('could not remove the video', 'error')
        } else {
            showPlaylistsAlert('video removed', 'success')
            playlistsDispatch({ type: 'REMOVE_VIDEO_FROM_PLAYLIST', payload: { videoId: _id, playlistId } })
        }
    }

    return (
        <Card id={styles.containerVideo} classes='pd-xs pos-relative mg-right-xs'>

            <video id={styles.cardVideo} controls controlsList='nodownload nofullscreen'>
                <source src={url}></source>
            </video>

            <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} mg-btm-xs`}>{title}</Text>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{description.slice(0, 40)}...</Text>

            <div className="flx flx-maj-start mg-top-s mg-btm-s">

                <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-right-xs`}>{`${views} views`}</Text>

                <Text classes={`txt-md txt-cap ${getTextColor(theme)}`}>{uploadedOn.slice(0, -14)}</Text>

            </div>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{`category - ${category}`}</Text>

            {
                playlistId &&
                <div className='flx flx-maj-end'>
                    <Button onClick={handleRemoveVideoFromPlaylist} classes={`btn-txt ${getTextColor(theme)} ${getBgColor(theme)}`}>
                        <Icon classes={getIconColor(theme)}>
                            delete
                        </Icon>
                    </Button>
                </div>
            }

            {
                watchlaterVideo &&
                <div className='flx flx-maj-end'>
                    <Button onClick={handleRemoveVideoFromWatchlater} classes={`btn-txt ${getTextColor(theme)} ${getBgColor(theme)}`}>
                        <Icon classes={getIconColor(theme)}>
                            delete
                        </Icon>
                    </Button>
                </div>
            }

        </Card>
    )
}

export default PlaylistVideoCard
