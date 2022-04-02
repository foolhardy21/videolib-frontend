import { Card, Text, Button, Icon } from '../Reusable'
import { usePlaylists, useTheme } from '../../contexts'
import { getTextColor, getBgColor, getIconColor } from '../../utils'

const PlaylistVideoCard = ({ video: {
    _id,
    url,
    title,
    description,
    views,
    uploadedOn,
    category
}, playlistId
}) => {
    const { theme } = useTheme()
    const { removeVideoFromPlaylist, showPlaylistsAlert, playlistsDispatch } = usePlaylists()

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
        <Card id='container-video' classes='pd-xs pos-relative mg-right-xs'>

            <video id='card-video' controls controlsList='nodownload nofullscreen'>
                <source src={url}></source>
            </video>

            <Text classes={`txt-md txt-cap txt-500 ${getTextColor(theme)} mg-btm-xs`}>{title}</Text>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{description.slice(0, 40)}...</Text>

            <div className="flx flx-maj-start mg-top-s mg-btm-s">

                <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-right-xs`}>{`${views} views`}</Text>

                <Text classes={`txt-md txt-cap ${getTextColor(theme)}`}>{uploadedOn.slice(0, -14)}</Text>

            </div>

            <Text classes={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{`category - ${category}`}</Text>

            <div className='flx flx-maj-end'>
                <Button onClick={handleRemoveVideoFromPlaylist} classes={`btn-txt ${getTextColor(theme)} ${getBgColor(theme)}`}>
                    <Icon classes={getIconColor(theme)}>
                        delete
                    </Icon>
                </Button>
            </div>

        </Card>
    )
}

export default PlaylistVideoCard
