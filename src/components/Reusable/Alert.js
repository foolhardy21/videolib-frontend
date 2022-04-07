import { ALERT_TYPE_ERROR } from 'utils/constants.util'
import { Icon, Text } from './'

const Alert = ({ classes, children, type }) => {

    return (
        <div className={`flx flx-maj-start flx-min-center ${classes} ${type === ALERT_TYPE_ERROR ? 'bg-err' : 'bg-success'} alert-size-s pd-xs mg-top-s`}>

            <Icon classes='icon-secondary mg-right-s'>
                {type === ALERT_TYPE_ERROR ? 'error' : 'check_circle'}
            </Icon>

            <Text classes='txt-md txt-600 txt-cap txt-secondary'>{children}</Text>

        </div>
    )
}

export default Alert