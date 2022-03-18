const Section = ({ id, classes, children }) => {

    return (
        <section id={id} className={classes}>
            {children}
        </section>
    )
}

export default Section