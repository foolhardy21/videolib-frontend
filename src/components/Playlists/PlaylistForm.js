import { useState } from "react"
import { usePlaylists, useTheme } from "contexts"
import { getBgColor, getBorderColor, getTextColor } from "utils"
import { ACTION_ADD_NEW_PLAYLIST, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "utils/constants.util"
import { Button, Input, Label } from "components/Reusable"

const PlaylistForm = () => {
    const [newPlaylistInfo, setNewPlaylistInfo] = useState({
        name: '',
        description: ''
    })
    const { theme } = useTheme()
    const { playlistsDispatch, addNewPlaylist, showPlaylistsAlert } = usePlaylists()

    function handleNameChange(e) {
        setNewPlaylistInfo(i => ({ ...i, name: e.target.value }))
    }

    function handleDescriptionChange(e) {
        setNewPlaylistInfo(i => ({ ...i, description: e.target.value }))
    }

    async function handleNewPlaylistSubmit(e) {
        e.preventDefault()

        if (newPlaylistInfo.name.length > 0 && newPlaylistInfo.description.length > 0) {
            const newPlaylistResponse = await addNewPlaylist(newPlaylistInfo.name, newPlaylistInfo.description)
            if (newPlaylistResponse === 404 || newPlaylistResponse === 500) {
                showPlaylistsAlert('could not create the playlist', ALERT_TYPE_ERROR)
            } else {
                showPlaylistsAlert('playlist created', ALERT_TYPE_SUCCESS)
                playlistsDispatch({ type: ACTION_ADD_NEW_PLAYLIST, payload: newPlaylistResponse[newPlaylistResponse.length - 1] })
            }
            setNewPlaylistInfo({
                name: '',
                description: ''
            })
        }
    }

    return (
        <form className='flx flx-column mg-left-md mg-btm-xlg' onSubmit={handleNewPlaylistSubmit}>

            <Label htmlFor='playlist-name' classes='mg-btm-s'>

                <Input type='text' id='playlist-name' value={newPlaylistInfo.name} onChange={(e) => handleNameChange(e)} placeholder='name' classes='input-md txt-md' />

            </Label>

            <Label htmlFor='playlist-desc' classes='mg-btm-s'>

                <Input type='text' id='playlist-desc' value={newPlaylistInfo.description} onChange={(e) => handleDescriptionChange(e)} placeholder='description' classes='input-md txt-md' />

            </Label>

            <div className="flx flx-maj-start">

                <Button classes={`btn-outlined ${getBorderColor(theme)} ${getTextColor(theme)} ${getBgColor(theme)} txt-md txt-cap pd-xs`} >create new playlist</Button>

            </div>
        </form>
    )
}

export default PlaylistForm