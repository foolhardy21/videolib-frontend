import { useEffect, useState } from "react"
import { Label, Section, Text, Card, Button } from "components/Reusable"
import { usePlaylists, useTheme, useVideos } from "contexts"
import { getBgColor, getSolidBtnBgColor, getSolidBtnTextColor, getTextColor } from "utils"
import { ACTION_INIT_PLAYLISTS } from "utils/constants.util"

const PlaylistModal = () => {
    const [selectedPlaylist, setSelectedPlaylist] = useState({})
    const { theme } = useTheme()
    const { playlistsState: { playlists }, playlistsDispatch, getPlaylists, addVideoToPlaylist, hidePlaylistModal } = usePlaylists()
    const { selectedVideo, showVideosAlert } = useVideos()

    useEffect(() => {
        (async () => {
            const getPlaylistsResponse = await getPlaylists()
            if (!(getPlaylistsResponse === 404 || getPlaylistsResponse === 500)) {
                playlistsDispatch({ type: ACTION_INIT_PLAYLISTS, payload: getPlaylistsResponse })
            }
        })()
    }, [])

    function handleInputChange(playlist) {
        setSelectedPlaylist(playlist)
    }

    function handlePlaylistModalCancel() {
        setSelectedPlaylist({})
        hidePlaylistModal()
    }

    async function handlePlaylistModalAdd() {
        const addVideoResponse = await addVideoToPlaylist(selectedVideo, selectedPlaylist._id)
        if (addVideoResponse === 409) {
            showVideosAlert('video is already in the playlist', 'error')
        }
        else if (!(addVideoResponse === 404 || addVideoResponse === 500)) {
            playlistsDispatch({ type: 'ADD_VIDEO_TO_PLAYLIST', payload: { video: selectedVideo, playlistId: selectedPlaylist._id } })
            setSelectedPlaylist({})
            showVideosAlert('video added to playlist', 'success')
        }
        hidePlaylistModal()
    }

    return (
        <Section classes='flx flx-center modal-container pos-fixed tl-0 z-index'>

            <Card classes={`modal-md pd-lg ${getBgColor(theme)}`}>

                <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-btm-s`}>choose from the following</Text>

                <div className="flx flx-column pd-left-s">

                    {
                        playlists.length > 0
                            ? playlists.map(playlist =>
                                <Label key={playlist._id} htmlFor={`playlist-${playlist.name}`} classes={`${getTextColor(theme)} flx flx-min-center mg-btm-xs`}>
                                    <input id={`playlist-${playlist.name}`} value={playlist.name} onChange={() => handleInputChange(playlist)} type='radio' name='playlist-list' className="mg-right-xs" /> {playlist.name}
                                </Label>)
                            : <Text classes={`${getTextColor(theme)} txt-md txt-500 txt-cap`}>no playlists created</Text>
                    }

                </div>

                <div className="flx flx-maj-end">

                    <Button onClick={handlePlaylistModalCancel} classes={`btn-txt txt-md txt-ucase ${getTextColor(theme)} ${getBgColor(theme)} mg-right-s`} >cancel</Button>

                    {
                        playlists.length > 0 && <Button onClick={handlePlaylistModalAdd} classes={`btn-solid ${getSolidBtnBgColor(theme)} ${getSolidBtnTextColor(theme)} txt-md txt-ucase pd-xs`}>add</Button>
                    }

                </div>

            </Card>

        </Section>
    )
}

export default PlaylistModal