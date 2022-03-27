import { useEffect } from 'react'
import { VideosHeader } from '../components/Videos'
import { useTheme, useVideos } from '../contexts'
import { getBgColor, getSolidBtnBgColor, getSolidBtnTextColor, getTextColor } from '../utils'
import '../components/Videos/videos.css'
import axios from 'axios'
import { useFilter } from '../contexts/filer.context'

const Videos = () => {
    const { theme } = useTheme()
    const { videosState, videosDispatch } = useVideos()
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
            videosDispatch({ type: 'INIT_VIDEOS', payload: videos })
        })()
    }, [videosDispatch])

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
        <div
            style={{
                minHeight: '100vh'
            }}
            className={getBgColor(theme)}
        >
            <VideosHeader />

            <main className='flx flx-column flx-min-center'>

                <p className={`txt-lg txt-cap ${getTextColor(theme)} mg-top-md`}>all videos</p>

                <div className='flx flx-maj-even mg-top-md'>

                    <label className={`txt-md ${getTextColor(theme)} txt-cap flx flx-min-center mg-right-s`} htmlFor='category-nike'>
                        <input onChange={(e) => handleInputChange(e)} checked={isCategoryIncludedInFilter('nike')} value='nike' type='checkbox' id='category-nike' />
                        nike
                    </label>

                    <label className={`txt-md ${getTextColor(theme)} txt-cap flx flx-min-center mg-right-s`} htmlFor='category-adidas'>
                        <input onChange={(e) => handleInputChange(e)} checked={isCategoryIncludedInFilter('adidas')} type='checkbox' value='adidas' id='category-adidas' />
                        adidas
                    </label>

                    <label className={`txt-md ${getTextColor(theme)} txt-cap flx flx-min-center`} htmlFor='category-reebok'>
                        <input onChange={(e) => handleInputChange(e)} checked={isCategoryIncludedInFilter('reebok')} type='checkbox' value='reebok' id='category-reebok' />
                        reebok
                    </label>

                </div>

                <section id='grid-videos' className='grid grid-maxcols-4 mg-top-lg'>

                    {
                        videosState?.map(video => <article key={video._id} id='container-video' className='card-dim card-shadow-xs pd-xs pos-relative'>

                            <button className={`btn-solid ${getSolidBtnBgColor(theme)} ${getSolidBtnTextColor(theme)} txt-md txt-lcase pd-xs pos-absolute tr-1`}>watch later</button>

                            <video id='card-video' controls>
                                <source src={video.video}></source>
                            </video>

                            <p className={`txt-md txt-cap txt-500 ${getTextColor(theme)} mg-btm-xs`}>{video.videoTitle}</p>

                            <p className={`txt-md txt-cap ${getTextColor(theme)} card-txtw-s`}>{video.videoDescription}</p>

                            <div className='flx flx-maj-end mg-top-xs'>

                                <button className={`btn-txt txt-md ${getTextColor(theme)} mg-right-s`}>like</button>

                                <button className={`btn-txt txt-md ${getTextColor(theme)}`}>add to wishlist</button>

                            </div>

                        </article>)
                    }

                </section>


            </main>

        </div>
    )
}

export default Videos