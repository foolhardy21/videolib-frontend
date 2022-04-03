import { useEffect, useState } from 'react'
import { Label } from "components/Reusable"
import { useTheme, useFilter, useVideos } from 'contexts'
import { getTextColor } from 'utils'
import { ACTION_ADD_CATEGORY_TO_FILTER, ACTION_FILTER_VIDEOS, ACTION_REMOVE_CATEGORY_FROM_FILTER } from 'utils/constants.util'

const VideosFilter = () => {
    const [categories, setCategories] = useState([])
    const { theme } = useTheme()
    const { videosDispatch, getVideos, showVideosAlert } = useVideos()
    const { filterState, filterDispatch, getCategories, isCategoryIncludedInFilter } = useFilter()

    useEffect(() => {
        (async () => {
            const categories = await getCategories()
            if (categories === 404 || categories === 500) {
                showVideosAlert('could not fetch categories', ALERT_TYPE_ERROR)
            } else {
                setCategories(categories)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const videos = await getVideos()
            if (videos === 404 || videos === 500) {
                showVideosAlert('could not fetch the videos', ALERT_TYPE_ERROR)
            } else {
                videosDispatch({ type: ACTION_FILTER_VIDEOS, payload: { videos, filterState } })
            }
        })()
    }, [filterState])

    function handleFilterInputChange(e) {
        if (e.target.checked) {
            filterDispatch({ type: ACTION_ADD_CATEGORY_TO_FILTER, payload: e.target.value })
        } else {
            filterDispatch({ type: ACTION_REMOVE_CATEGORY_FROM_FILTER, payload: e.target.value })
        }
    }


    return (
        <div className='flx flx-maj-even mg-top-md'>

            {
                categories.map(({ name, _id }) => <Label key={_id} classes={`txt-md ${getTextColor(theme)} txt-cap flx flx-min-center mg-right-s`} htmlFor={`category-${name}`}>
                    <input onChange={(e) => handleFilterInputChange(e)} checked={isCategoryIncludedInFilter(name)} value={name} type='checkbox' id={`category-${name}`} />
                    {name}
                </Label>
                )
            }

        </div>
    )
}

export default VideosFilter
