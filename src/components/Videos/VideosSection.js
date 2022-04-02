import { useVideos } from "../../contexts"
import VideoCard from "./VideoCard"
import styles from './videos.module.css'

const VideosSection = () => {
    const { videosState: {
        videos
    } } = useVideos()

    return (
        <section id={styles.gridVideos} className='grid grid-maxcols-4 mg-top-lg'>

            {
                videos?.map(video => <VideoCard key={video._id} video={video} />)
            }

        </section>
    )

}

export default VideosSection
