import { Section, Text } from "components/Reusable"
import { useTheme, useVideos } from "contexts"
import { getTextColor } from "utils"
import { VideoCard } from "./"
import styles from './videos.module.css'

const VideosSection = () => {
    const { videosState: {
        videos
    } } = useVideos()
    const { theme } = useTheme()

    return (
        <Section id={styles.gridVideos} classes='grid grid-maxcols-4 mg-top-lg'>
            {
                videos.length > 0 ? videos?.map(video => <VideoCard key={video._id} video={video} />) : <Text classes={`${getTextColor(theme)} txt-lg txt-cap`}>no videos available</Text>
            }
        </Section>
    )

}

export default VideosSection
