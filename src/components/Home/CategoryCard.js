import { useNavigate } from 'react-router-dom'
import { Button, Card, Text } from 'components/Reusable'
import { useFilter } from 'contexts'
import { ACTION_ADD_CATEGORY_TO_FILTER } from 'utils/constants.util'
import styles from './home.module.css'

const CategoryCard = ({ category: { name, img: { srcSet, alt, sizes } } }) => {
    const navigate = useNavigate()
    const { filterDispatch } = useFilter()

    function handleCategoryClick() {
        filterDispatch({ type: ACTION_ADD_CATEGORY_TO_FILTER, payload: name })
        navigate('/videos')
    }

    return (
        <Button onClick={handleCategoryClick} classes='btn-txt'>

            <Card classes={`pos-relative ${styles.outerCard}`}>

                <div className={`${styles.overlay} bg-secondary`}>
                    <Text classes={`txt-secondary txt-lg txt-600 txt-lcase ${styles.overlayText}`}>{name}</Text>
                </div>

                <img srcSet={srcSet} sizes={sizes} alt={alt} />

            </Card>

        </Button>
    )
}

export default CategoryCard