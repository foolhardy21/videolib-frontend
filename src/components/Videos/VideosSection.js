import { Section } from "components/Reusable"
import { useVideos } from "contexts"
import { VideoCard } from "./"
import styles from './videos.module.css'

const VideosSection = () => {
    const { videosState: {
        videos
    } } = useVideos()

    return (
        <Section id={styles.gridVideos} classes='grid grid-maxcols-4 mg-top-lg'>
            {
                videos?.map(video => <VideoCard key={video._id} video={video} />)
            }
        </Section>
    )

}

export default VideosSection
