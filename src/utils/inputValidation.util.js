const emailReg = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
const passReg = new RegExp('^[a-zA-Z0-9]+$')
const nameReg = new RegExp(/\d/ig)

/*
    * this is a function to check the validity of entered email
    * @params {string} inputStr - entered email string
    * @return {boolean} true if the email is invalid and false if email is valid 
*/
export const isEmailInvalid = inputStr => !emailReg.test(inputStr)

/*
    * this is a function to check the validity of entered name
    * @params {string} inputStr - entered name string
    * @return {boolean} true if the name is invalid and false if name is valid 
*/
export const isNameInvalid = inputStr => (inputStr === '' || nameReg.test(inputStr))

/*
    * this is a function to check the validity of entered password
    * @params {string} inputStr - entered password string
    * @return {boolean} true if the password is invalid and false if password is valid 
*/
export const isPasswordInvalid = inputStr => (inputStr === '' || passReg.test(inputStr))

/*
    * this is a function to check the equality of password and confirmed password
    * @params {string} passStr - entered password string
    * @params {string} confPassStr - entered confirmed password string
    * @return {boolean} true if the strings are different and false if the strings are same 
*/
export const arePasswordAndConfirmedPasswordDiff = (passStr, confPassStr) => (passStr !== confPassStr) 
