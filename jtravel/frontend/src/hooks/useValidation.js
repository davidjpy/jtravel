import { useState, useRef, useEffect } from 'react';

const useAccountReg = (email, username, password1, password2) => {
  const [emailError, setEmailError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [matchError, setMatchError] = useState('')
  const [isError, setisError] = useState(false)

  const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const USER_REGEX = /^[A-z][A-z0-9]{4,11}$/;
  const PWD_REGEX = /^(?=.*[A-Z])(?=.{8,})/;

  useEffect(() => {
    (EMAIL_REGEX.test(email) ? setEmailError('') : setEmailError('Invalid email address'));
  }, [email])

  useEffect(() => {
    (USER_REGEX.test(username) ? setUsernameError('') : setUsernameError('User ID should between 5 to 12 characters long without special characters'));
  }, [username])

  useEffect(() => {
    (PWD_REGEX.test(password1) ? setPasswordError('') : setPasswordError('Password should at least 8 characters long and contain one uppercase letter'));
    (password2 === password1 ? setMatchError('') : setMatchError('Incorrect password'));
  }, [password1, password2])

  useEffect(() => {
    emailError + usernameError + passwordError + matchError === ''  ? setisError(false) : setisError(true)
  }, [emailError, usernameError, passwordError, matchError])

  return { emailError, usernameError, passwordError, matchError, isError };
}


export default useAccountReg
