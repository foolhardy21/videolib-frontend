const monthsInWordsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

/**
 * this function returns the date with month in words.
 * @param {Object} date - date when the video was uploaded
 * @return {string} - formatted date in strings
 */
export const getDateForVideoCard = date => `${new Date(date).getDate()}-${monthsInWordsArr[new Date(date).getMonth()]}-${new Date(date).getFullYear()}`
