import { LOGIN_USER, LOGOUT_USER, store } from './store.js'
import { userService } from '../services/user.service.js'
export function loginUser(credentials) {
  return userService.login(credentials).then((onSetUser) => {
    store.dispatch({ type: LOGIN_USER, user: onSetUser })
    return onSetUser
  })
}

export function signupUser(credentials) {
  return userService.signup(credentials).then((onSetUser) => {
    store.dispatch({ type: LOGIN_USER, user: onSetUser })
    return onSetUser
  })
}

export function logout() {
  return userService.logout().then(() => {
    store.dispatch({ type: LOGOUT_USER, user: null })
    return
  })
}
