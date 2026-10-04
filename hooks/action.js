import { store } from './store.js'
import {
  TOGGLE_TODO,
  DELETE_TODO,
  SET_TODOS,
  ADD_TODO,
  SET_FILTERBY,
} from './store.js'

import { todoService } from '../services/todo.service.js'

export function loadTodos(filterBy) {
  return todoService
    .query(filterBy)
    .then((todos) => store.dispatch({ type: SET_TODOS, todos }))
}

export function saveTodo(todoToEdit) {
  const type = todoToEdit._id ? TOGGLE_TODO : ADD_TODO
  return todoService.save(todoToEdit).then((savedTodo) => {
    store.dispatch({ type, todo: savedTodo })
    console.log('savedTodo', savedTodo)
    return savedTodo
  })
}

export function removeTodo(todoId) {
  const res = confirm(`do you whant to delete: ${todoId}`)
  if (!res) return Promise.reject
  return todoService
    .remove(todoId)
    .then(() => store.dispatch({ type: DELETE_TODO, todoId }))
}

export function toggleTodo(todo) {
  return todoService.save(todo).then((savedTodo) => {
    store.dispatch({ type: TOGGLE_TODO, todo: savedTodo })
    return savedTodo
  })
}

export function setFilterBy(f) {
  store.dispatch({ type: SET_FILTERBY, filter: f })
  return Promise.resolve(f)
}
