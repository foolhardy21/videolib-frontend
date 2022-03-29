import { useEffect } from 'react'
import { Section, Text, Button, Icon } from "../Reusable"
import { getTextColor, getBgColor, getIconColor } from '../../utils'
import { useTheme, usePlaylists } from "../../contexts"

const PlaylistsSection = () => {
    const { playlistsState: { playlists }, playlistsDispatch, getPlaylists, removePlaylist, showPlaylistsAlert } = usePlaylists()
    const { theme } = useTheme()


    async function handleDeletePlaylist(_id) {
        const removePlaylistResponse = await removePlaylist(_id)
        if (removePlaylistResponse === 404 || removePlaylistResponse === 500) {
            showPlaylistsAlert('could not remove the playlist', 'error')
        } else {
            playlistsDispatch({ type: 'REMOVE_PLAYLIST', payload: _id })
        }
    }

    useEffect(() => {
        (async () => {
            const getPlaylistsResponse = await getPlaylists()
            if (getPlaylistsResponse === 404 || getPlaylistsResponse === 500) {
                showPlaylistsAlert('could not get playlists', 'error')
            } else {
                playlistsDispatch({ type: 'INIT_PLAYLISTS', payload: getPlaylistsResponse })
            }
        })()
    }, [])

    return (
        <Section classes='flx flx-column mg-left-md'>

            {
                playlists?.map(playlist =>

                    <Section key={playlist._id} id='grid-playlist' classes='grid grid-maxcols-4 pd-btm-s mg-btm-s'>

                        <div className="flx flx-column mg-btm-s">

                            <div className="flx flx-min-center">

                                <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-btm-xs mg-right-xs`} >{playlist.name}</Text>

                                <Button onClick={() => handleDeletePlaylist(playlist._id)} classes={`btn-txt ${getTextColor(theme)} ${getBgColor(theme)}`}>
                                    <Icon classes={getIconColor(theme)}>
                                        delete
                                    </Icon>
                                </Button>

                            </div>

                            <Text classes={`txt-md txt-cap ${getTextColor(theme)}`} >{playlist.description}</Text>

                        </div>

                        {
                            playlist.videos?.map(video => <PlaylistVideoCard key={video._id} video={video} />)
                        }

                    </Section>
                )
            }

        </Section>
    )

}

export default PlaylistsSection
