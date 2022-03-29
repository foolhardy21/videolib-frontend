const Label = ({ htmlFor, classes, children }) => {

    return (
        <label htmlFor={htmlFor} className={classes} >
            {children}
        </label>
    )
}

export default Label
