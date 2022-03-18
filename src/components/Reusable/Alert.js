import { Icon, Text } from './'

const Alert = ({ classes, children }) => {

    return (
        <div className={`flx flx-maj-start flx-min-center ${classes} alert-size-s pd-xs mg-top-s`}>

            <Icon classes='icon-secondary mg-right-s'>
                check_circle
            </Icon>

            <Text classes='txt-md txt-600 txt-cap txt-secondary'>{children}</Text>

        </div>
    )
}

export default Alert