import { useTitle } from 'hooks/useTitle'
import { useTheme } from "contexts"
import { getBgColor } from 'utils'
import { CategorySection, HomeHeader } from 'components/Home'

const Home = () => {
    useTitle('Home')
    const { theme } = useTheme()

    return (
        <div style={{
            minHeight: '100vh'
        }}
            className={getBgColor(theme)}
        >
            <HomeHeader />

            <CategorySection />

        </div>
    )
}

export default Home