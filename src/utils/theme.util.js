/*
    * this is a function to get the background color based on the theme
    * @params {string} theme - current theme
    * @return {string} CSS class name 
*/
export const getBgColor = theme => theme === 'light' ? 'bg-primary' : 'bg-secondary'

/*
    * this is a function to get the text color based on the theme
    * @params {string} theme - current theme
    * @return {string} CSS class name 
*/
export const getTextColor = theme => theme === 'light' ? 'txt-primary' : 'txt-secondary'

/*
    * this is a function to get the background color of solid button based on the theme
    * @params {string} theme - current theme
    * @return {string} CSS class name 
*/
export const getSolidBtnBgColor = theme => theme === 'dark' ? 'bg-primary' : 'bg-secondary'

/*
    * this is a function to get the text color of solid button based on the theme
    * @params {string} theme - current theme
    * @return {string} CSS class name 
*/
export const getSolidBtnTextColor = theme => theme === 'dark' ? 'txt-primary' : 'txt-secondary'

/*
    * this is a function to get the border color based on the theme
    * @params {string} theme - current theme
    * @return {string} CSS class name 
*/
export const getBorderColor = theme => theme === 'light' ? 'b-primary' : 'b-secondary'

/*
    * this is a function to get the icon color based on the theme
    * @params {string} theme - current theme
    * @return {string} CSS class name 
*/
export const getIconColor = theme => theme === 'light' ? 'icon-primary' : 'icon-secondary'

/*
    * this is a function to get the badge background color based on the theme
    * @params {string} theme - current theme
    * @return {string} CSS class name 
*/
export const getBadgeBgColor = (theme) => theme === 'light' ? 'bg-secondary' : 'bg-primary'

/*
    * this is a function to get the badge text color based on the theme
    * @params {string} theme - current theme
    * @return {string} CSS class name 
*/
export const getBadgeTextColor = (theme) => theme === 'light' ? 'txt-secondary' : 'txt-primary'
