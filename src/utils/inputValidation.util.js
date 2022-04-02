const emailReg = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
const passReg = new RegExp('^[a-zA-Z0-9]+$')
const nameReg = new RegExp(/\d/ig)

export const isEmailInvalid = (inputStr) => (!emailReg.test(inputStr))
export const isNameInvalid = (inputStr) => (inputStr === '' || nameReg.test(inputStr))
export const isPasswordInvalid = (inputStr) => (inputStr === '' || passReg.test(inputStr))
export const arePasswordAndConfirmedPasswordDiff = (passStr, confPassStr) => (passStr !== confPassStr) 
