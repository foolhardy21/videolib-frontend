import axios from "axios"
import { useEffect } from "react"
import { Label, Section, Text, Card, Button } from "../Reusable"
import { usePlayListModal, usePlaylists, useTheme } from "../../contexts"
import { getBgColor, getSolidBtnBgColor, getSolidBtnTextColor, getTextColor } from "../../utils"

const PlaylistModal = () => {
    const { theme } = useTheme()
    const { playlistsState, playlistsDispatch } = usePlaylists()
    const { hidePlaylistModal } = usePlayListModal()


    useEffect(() => {
        async function getPlaylists() {
            const userToken = window.localStorage.getItem('userToken')
            try {
                const response = await axios.get('/api/user/playlists', {
                    headers: {
                        authorization: userToken
                    }
                })
                return response.data.playlists
            } catch (e) {
                console.log(e)
            }
        }
        (async () => {
            const playlists = await getPlaylists()
            playlists && playlistsDispatch({ type: 'INIT_PLAYLISTS', payload: playlists })
        })()
    }, [])

    function handlePlaylistModalCancel() {
        // uncheck all radio buttons
        // hide
        hidePlaylistModal()
    }
    function handlePlaylistModalAdd() {
        // send a request to add video to playlist
        // update playlists context with type ADD_VIDEO_TO_PLAYLIST
        // uncheck all radio buttons
        // hide
        hidePlaylistModal()
    }

    return (
        <Section classes='flx flx-center modal-container pos-fixed tl-0 z-index'>

            <Card classes={`modal-md pd-lg ${getBgColor(theme)}`}>

                <Text classes={`txt-md txt-cap ${getTextColor(theme)} mg-btm-s`}>choose from the created playlists</Text>

                <div className="flx flx-column pd-left-s">

                    {
                        playlistsState.map(playlist =>
                            <Label key={playlist._id} classes={`${getTextColor(theme)} flx flx-min-center mg-btm-xs`}>
                                <input type='radio' name='playlist-name' className="mg-right-xs" /> {playlist.name}
                            </Label>)
                    }

                </div>

                <div className="flx flx-maj-end">

                    <Button onClick={handlePlaylistModalCancel} classes={`btn-txt txt-md txt-ucase ${getTextColor(theme)} ${getBgColor(theme)} mg-right-s`} >cancel</Button>

                    <Button onClick={handlePlaylistModalAdd} classes={`btn-solid ${getSolidBtnBgColor(theme)} ${getSolidBtnTextColor(theme)} txt-md txt-ucase pd-xs`}>add</Button>

                </div>

            </Card>

        </Section>
    )
}

export default PlaylistModal