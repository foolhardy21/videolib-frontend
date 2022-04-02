const { useEffect } = require("react");

export function useTitle(title) {

    useEffect(() => {
        document.title = `${title} | SneakerViews`
    }, [])

}