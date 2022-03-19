import axios from 'axios'
import { useEffect, useState } from 'react'
import { Label } from "../Reusable"
import { useTheme, useFilter, useVideos } from '../../contexts'
import { getTextColor } from '../../utils'

const VideosFilter = () => {
    const [categories, setCategories] = useState([])
    const { theme } = useTheme()
    const { videosDispatch, getVideos, showVideosAlert } = useVideos()
    const { filterState, filterDispatch, getCategories, isCategoryIncludedInFilter } = useFilter()

    useEffect(() => {
        (async () => {
            const categories = await getCategories()
            if (categories === 404 || categories === 500) {
                showVideosAlert('could not fetch categories', 'error')
            } else {
                setCategories(categories)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const videos = await getVideos()
            if (videos === 404 || videos === 500) {
                showVideosAlert('could not fetch the videos', 'error')
            } else {
                videosDispatch({ type: 'FILTER_VIDEOS', payload: { videos, filterState } })
            }
        })()
    }, [filterState])

    function handleFilterInputChange(e) {
        if (e.target.checked) {
            filterDispatch({ type: 'ADD_CATEGORY', payload: e.target.value })
        } else {
            filterDispatch({ type: 'REMOVE_CATEGORY', payload: e.target.value })
        }
    }


    return (
        <div className='flx flx-maj-even mg-top-md'>

            {
                categories.map(({ categoryName, id }) => <Label key={id} classes={`txt-md ${getTextColor(theme)} txt-cap flx flx-min-center mg-right-s`} htmlFor={`category-${categoryName}`}>
                    <input onChange={(e) => handleFilterInputChange(e)} checked={isCategoryIncludedInFilter(categoryName)} value={categoryName} type='checkbox' id={`category-${categoryName}`} />
                    {categoryName}
                </Label>
                )
            }

        </div>
    )
}

export default VideosFilter
