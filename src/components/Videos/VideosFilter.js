import axios from 'axios'
import { useEffect } from 'react'
import { Label } from "../Reusable"
import { useTheme, useFilter, useVideos } from '../../contexts'
import { getTextColor } from '../../utils'

const VideosFilter = () => {
    const { theme } = useTheme()
    const { videosDispatch } = useVideos()
    const { filterState, filterDispatch } = useFilter()

    useEffect(() => {
        async function getVideos() {
            try {
                const response = await axios.get('/api/videos')
                return response.data.videos
            } catch (e) {
                console.log(e)
            }
        }
        (async () => {
            const videos = await getVideos()
            videosDispatch({
                type: 'FILTER_VIDEOS', payload: {
                    videos,
                    filterState
                }
            })
        })()
    }, [filterState])


    function handleInputChange(e) {
        if (e.target.checked) {
            filterDispatch({ type: 'ADD_CATEGORY', payload: e.target.value })
        } else {
            filterDispatch({ type: 'REMOVE_CATEGORY', payload: e.target.value })
        }
    }

    function isCategoryIncludedInFilter(value) {
        return !filterState.find(category => category === value) ? false : true
    }

    return (
        <div className='flx flx-maj-even mg-top-md'>

            <Label classes={`txt-md ${getTextColor(theme)} txt-cap flx flx-min-center mg-right-s`} htmlFor='category-nike'>
                <input onChange={(e) => handleInputChange(e)} checked={isCategoryIncludedInFilter('nike')} value='nike' type='checkbox' id='category-nike' />
                nike
            </Label>

            <Label classes={`txt-md ${getTextColor(theme)} txt-cap flx flx-min-center mg-right-s`} htmlFor='category-adidas'>
                <input onChange={(e) => handleInputChange(e)} checked={isCategoryIncludedInFilter('adidas')} type='checkbox' value='adidas' id='category-adidas' />
                adidas
            </Label>

            <Label classes={`txt-md ${getTextColor(theme)} txt-cap flx flx-min-center`} htmlFor='category-reebok'>
                <input onChange={(e) => handleInputChange(e)} checked={isCategoryIncludedInFilter('reebok')} type='checkbox' value='reebok' id='category-reebok' />
                reebok
            </Label>

        </div>
    )
}

export default VideosFilter