import { LOGIN_USER, LOGOUT_USER, store } from './store'
import { userService } from '../services/user.service.js'
export function loginUser(credentials) {
  return userService.login(credentials).then((onSetUser) => {
    store.dispatch({ type: LOGIN_USER, user: onSetUser })
    return onSetUser
  })
}

export function signupUser(credentials) {
  userService.signup(credentials).then((onSetUser) => {
    store.dispatch({ type: LOGIN_USER, user: onSetUser })
    return onSetUser
  })
}

export function logout(credentials) {
  return userService.signup(credentials).then(() => {
    store.dispatch({ type: LOGOUT_USER, user: null })
    return
  })
}
