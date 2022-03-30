import { PlaylistVideoCard } from './'
import { Section, Text, Button, Icon } from "../Reusable"
import { getTextColor, getBgColor, getIconColor } from '../../utils'
import { useTheme, usePlaylists } from "../../contexts"

const PlaylistsSection = () => {
    const { playlistsState: { playlists }, playlistsDispatch, removePlaylist, showPlaylistsAlert } = usePlaylists()
    const { theme } = useTheme()

    async function handleDeletePlaylist(_id) {
        const removePlaylistResponse = await removePlaylist(_id)
        if (removePlaylistResponse === 404 || removePlaylistResponse === 500) {
            showPlaylistsAlert('could not remove the playlist', 'error')
        } else {
            playlistsDispatch({ type: 'REMOVE_PLAYLIST', payload: _id })
        }
    }

    return (
        <Section classes='flx flx-column mg-left-md'>

            {
                playlists?.map(playlist =>

                    <Section key={playlist._id} id='grid-playlist' classes='grid grid-maxcols-4 pd-btm-s mg-btm-s'>

                        <div className="flx flx-column">

                            <div className="flx mg-btm-xs">

                                <div className='flx flx-column mg-right-s'>

                                    <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-btm-xs mg-right-xs`} >{playlist.name}</Text>

                                    <Text classes={`txt-md txt-cap ${getTextColor(theme)}`} >{playlist.description}</Text>

                                </div>

                                <Button onClick={() => handleDeletePlaylist(playlist._id)} classes={`btn-txt ${getTextColor(theme)} ${getBgColor(theme)}`}>
                                    <Icon classes={getIconColor(theme)}>
                                        delete
                                    </Icon>
                                </Button>

                            </div>

                            <div className='flx'>

                                {
                                    playlist.videos?.map(video => <PlaylistVideoCard key={video._id} video={video} />)
                                }

                            </div>

                        </div>

                    </Section>
                )
            }

        </Section>
    )

}

export default PlaylistsSection
