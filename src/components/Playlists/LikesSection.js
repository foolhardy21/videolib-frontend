import { PlaylistVideoCard } from './'
import { Section, Text } from 'components/Reusable'
import { getTextColor } from 'utils'
import { useLikes, useTheme } from 'contexts'
import styles from './playlists.module.css'

const LikesSection = () => {
    const { theme } = useTheme()
    const { likesState: { likedVideos } } = useLikes()

    return (
        <Section classes='flx flx-column mg-left-md mg-btm-md'>

            <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-btm-md`}>{`liked videos (${likedVideos.length})`}</Text>

            <Section id={styles.sliderPlaylist} classes='flx pd-btm-xs'>
                {
                    likedVideos?.map(video => <PlaylistVideoCard key={video._id} video={video} />)
                }
            </Section>

        </Section>
    )
}

export default LikesSection
