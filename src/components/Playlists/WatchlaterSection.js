import { PlaylistVideoCard } from '.'
import { Section, Text } from "components/Reusable"
import { getTextColor } from 'utils'
import { useTheme, useWatchlater } from "contexts"
import styles from './playlists.module.css'

const WatchlaterSection = () => {
    const { theme } = useTheme()
    const { watchlaterState: { watchlaterVideos } } = useWatchlater()

    return (
        <Section classes='flx flx-column mg-left-md mg-btm-md'>

            <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-btm-xs`}>{`watch later (${watchlaterVideos.length})`}</Text>

            <Section id={styles.sliderPlaylist} classes='flx pd-xs'>
                {
                    watchlaterVideos?.map(video => <PlaylistVideoCard key={video._id} video={video} watchlaterVideo={true} />)
                }
            </Section>

        </Section>
    )

}

export default WatchlaterSection
