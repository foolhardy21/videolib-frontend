import { useEffect, useRef, createRef, useState } from 'react'
import { Icon, Text } from 'components/Reusable'
import { useTitle } from 'hooks/useTitle'
import { useTheme, useVideos } from "contexts"
import { CategorySection, HomeHeader } from 'components/Home'
import { ACTION_INIT_VIDEOS, ALERT_TYPE_ERROR } from 'utils/constants.util'
import { getBgColor, getIconColor, getSolidBtnBgColor, getSolidBtnTextColor } from 'utils'
import styles from 'components/Home/home.module.css'

const Home = () => {
    useTitle('Home')
    const [currentVideoIndexInCarousel, setCurrentVideoIndexInCarousel] = useState(0)
    const { theme } = useTheme()
    const { videosState: {
        videos }, getVideos, showVideosAlert, videosDispatch } = useVideos()

    useEffect(() => {
        (async () => {
            const videos = await getVideos()
            if (videos === 404 || videos === 500) {
                showVideosAlert('could not fetch the videos', ALERT_TYPE_ERROR)
            } else {
                videosDispatch({ type: ACTION_INIT_VIDEOS, payload: videos })
            }
        })()
    }, [])


    function handleCarouselRight() {
        if (currentVideoIndexInCarousel === videos.length - 1) {
            document.getElementById(`videoCarousel-${0}`).scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" })
            setCurrentVideoIndexInCarousel(0)
        } else {
            document.getElementById(`videoCarousel-${currentVideoIndexInCarousel + 1}`).scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" })
            setCurrentVideoIndexInCarousel(index => index + 1)
        }
    }

    function handleCarouselLeft() {
        if (currentVideoIndexInCarousel === 0) {
            document.getElementById(`videoCarousel-${videos.length - 1}`).scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" })
            setCurrentVideoIndexInCarousel(videos.length - 1)
        } else {
            document.getElementById(`videoCarousel-${currentVideoIndexInCarousel - 1}`).scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" })
            setCurrentVideoIndexInCarousel(index => index - 1)
        }
    }

    return (
        <div style={{
            minHeight: '100vh'
        }}
            className={getBgColor(theme)}
        >
            <HomeHeader />

            <div className='flx flx-center mg-top-xs'>
                <section className={`flx ${styles.containerCaraousel}`}>
                    {
                        videos?.map((video, index) => <article key={video._id} id={`videoCarousel-${index}`} className='pos-relative'>
                            <video className={styles.cardCarousel}>
                                <source src={video.url}></source>
                            </video>
                            <div className={`flx flx-column mg-s pos-absolute ${styles.txtInfo}`}>
                                <Text classes={`txt-secondary bg-secondary txt-cap mg-btm-xs`}>{video.title}</Text>
                                <Text classes={`txt-secondary bg-secondary txt-cap`}>{video.category}</Text>
                            </div>
                        </article>)
                    }
                </section>
            </div>

            <div className={`flx flx-maj-end pd-xs`}>

                <button onClick={handleCarouselLeft} className={`btn-solid ${getSolidBtnBgColor(theme)} ${getSolidBtnTextColor(theme)} flx flx-center mg-right-s`}>
                    <Icon>
                        chevron_left
                    </Icon>
                </button>

                <button onClick={handleCarouselRight} className={`btn-solid ${getSolidBtnBgColor(theme)} ${getSolidBtnTextColor(theme)} flx flx-center`}>
                    <Icon>
                        chevron_right
                    </Icon>
                </button>

            </div>

            <CategorySection />

        </div >
    )
}

export default Home