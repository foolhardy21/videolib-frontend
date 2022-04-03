import { Card, Text } from 'components/Reusable'
import styles from './home.module.css'

const CategoryCard = ({ category: { name, img: { srcSet, alt, sizes } } }) => {

    return (
        <Card classes={`pos-relative ${styles.outerCard}`}>
            <div className={`${styles.overlay} bg-secondary`}>
                <Text classes={`txt-secondary txt-lg txt-600 txt-lcase ${styles.overlayText}`}>{name}</Text>
            </div>
            <img srcSet={srcSet} sizes={sizes} alt={alt} />
        </Card>
    )
}

export default CategoryCard