import axios from 'axios'
import { useEffect } from 'react'
import { PlaylistVideoCard } from './'
import { Section, Text, Alert } from '../Reusable'
import { getTextColor } from '../../utils'
import { useLikes, useTheme } from '../../contexts'

const LikesSection = () => {
    const { theme } = useTheme()
    const { likesState: { likedVideos, alert: { message, type } } } = useLikes()

    return (
        <div className='flx flx-column mg-left-md mg-btm-md'>

            <Text classes={`txt-lg txt-cap ${getTextColor(theme)} mg-btm-md`}>liked videos</Text>

            <div className='flx flx-center'>

                {
                    type === 'error'
                        ? <Alert classes='bg-err'>{message}</Alert>
                        : type === 'success' ? <Alert classes='bg-success'>{message}</Alert>
                            : ''
                }
            </div>

            <Section id='grid-playlist' classes='grid grid-maxcols-4 pd-btm-s'>

                {
                    likedVideos?.map(video => <PlaylistVideoCard key={video._id} video={video} />)
                }

            </Section>

        </div>
    )
}

export default LikesSection
