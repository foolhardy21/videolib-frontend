import { Link } from "react-router-dom"
import { useTitle } from '../hooks/useTitle'

const Home = () => {
    useTitle('Home')

    return <>
        <Link to='/signup'>signup page</Link>
    </>
}

export default Home