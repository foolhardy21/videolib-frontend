import axios from "axios"
import { useState } from "react"
import { usePlaylists, useTheme } from "../../contexts"
import { getBgColor, getBorderColor, getTextColor } from "../../utils"
import { Button, Input, Label } from "../Reusable"

const PlaylistForm = () => {
    const [newPlaylistInfo, setNewPlaylistInfo] = useState({
        name: '',
        description: ''
    })
    const { theme } = useTheme()
    const { playlistsDispatch } = usePlaylists()

    function handleNameChange(e) {
        setNewPlaylistInfo(i => ({ ...i, name: e.target.value }))
    }

    function handleDescriptionChange(e) {
        setNewPlaylistInfo(i => ({ ...i, description: e.target.value }))
    }

    async function handleNewPlaylistSubmit(e) {
        e.preventDefault()

        if (newPlaylistInfo.name.length > 0 && newPlaylistInfo.description.length > 0) {

            const userToken = window.localStorage.getItem('userToken')
            try {
                const response = await axios.post('/api/user/playlists', {
                    playlist: {
                        name: newPlaylistInfo.name,
                        description: newPlaylistInfo.description,
                    }
                }, {
                    headers: {
                        authorization: userToken
                    }
                })
                const playlists = response.data.playlists
                playlistsDispatch({ type: 'ADD_NEW_PLAYLIST', payload: playlists[playlists.length - 1] })
                setNewPlaylistInfo({
                    name: '',
                    description: ''
                })
            } catch (e) {
                console.log(e)
            }

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