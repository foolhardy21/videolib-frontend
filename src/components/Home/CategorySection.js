import { useEffect, useState } from "react"
import { CategoryCard } from "./"
import { Section } from "components/Reusable"
import { useFilter } from "contexts"
import styles from './home.module.css'

const CategorySection = () => {
    const [categories, setCategories] = useState([])
    const { getCategories } = useFilter()

    useEffect(() => {
        (async () => {
            const getCategoriesResponse = await getCategories()
            if (!(getCategoriesResponse == 500 || getCategoriesResponse == 404)) {
                setCategories(getCategoriesResponse)
            }
        })()
    }, [])
    return (
        <Section classes={`grid grid-maxcols-3 ${styles.gridCategory} pd-lg`}>

            {
                categories?.map(category => <CategoryCard key={category._id} category={category} />)
            }

        </Section>
    )
}

export default CategorySection