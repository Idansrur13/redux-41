const { createStore } = Redux

export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_TODOS = 'SET_TODOS'
export const SET_FILTERBY = 'SET_FILTERBY'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

const initStore = {
  todos: [],
  r: 1,
  reloaded: false,
  filterby: { txt: '', importance: null },
  user: null,
}
export function appReducer(state = initStore, cmd = {}) {
  switch (cmd.type) {
    case SET_TODOS:
      return { ...state, reloaded: true, todos: cmd.todos }
    case ADD_TODO:
      return { ...state, todos: [...state.todos, cmd.todo] }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((t) => t._id !== cmd.todoId),
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((t) => (t._id === cmd.todo._id ? cmd.todo : t)),
      }
    case SET_FILTERBY:
      return { ...state, filterby: cmd.filter }

    case LOGIN_USER:
      return { ...state, user: cmd.user }

    case LOGOUT_USER:
      return { ...state, user: null }

    default:
      return state
  }
}

// const user = {
//   _id,
//   fullname,
//   password,
//   username,
//   balance,
//   activities,
// }

export const store = createStore(appReducer)
