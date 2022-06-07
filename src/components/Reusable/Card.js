import { useTheme } from 'contexts'

const Card = ({ id, classes, children, onClick }) => {
    const { theme } = useTheme()

    return (
        <article id={id} onClick={onClick} className={`card-shadow-xs ${theme === 'dark' && 'b-solid b-secondary'} ${classes}`}>
            {children}
        </article>
    )
}

export default Card
