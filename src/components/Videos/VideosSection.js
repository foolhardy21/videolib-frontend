import { useVideos } from "../../contexts"
import VideoCard from "./VideoCard"

const VideosSection = () => {
    const { videosState } = useVideos()

    return (
        <section id='grid-videos' className='grid grid-maxcols-4 mg-top-lg'>

            {
                videosState?.map(video => <VideoCard key={video._id} video={video} />)
            }

        </section>
    )

}

export default VideosSection