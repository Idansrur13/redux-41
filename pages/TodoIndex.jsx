import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'
import { todoService } from '../services/todo.service.js'
import { toggleTodo, removeTodo, loadTodos } from '../hooks/action.js'
import { setFilterBy } from '../hooks/action.js'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
  // const [todos, setTodos] = useState(null)
  const todos = useSelector((storeState) => storeState.todos)
  const reloaded = useSelector((storeState) => storeState.reloaded)
  const filterby = useSelector((storeState) => storeState.filterby)

  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {}, [])

  useEffect(() => {
    loadTodos(filterby).catch((err) => {
      //   console.eror('err:', err)
      showErrorMsg('Cannot load todos')
    })
  }, [filterby])

  function onSetFilterBy(f) {
    setFilterBy(f).then((fil) => setSearchParams(fil))
  }

  function onRemoveTodo(todoId) {
    removeTodo(todoId)
      .then(() => {
        showSuccessMsg(`Todo removed`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot remove todo ' + todoId)
      })
  }

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone }
    toggleTodo(todoToSave)
      .then((savedTodo) => {
        showSuccessMsg(
          `Todo is ${savedTodo.isDone ? 'done' : 'back on your list'}`,
        )
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot toggle todo ' + todo._id)
      })
  }

  if (!reloaded) return <div>Loading...</div>
  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterby} onSetFilterBy={onSetFilterBy} />
      <div>
        <Link to="/todo/edit" className="btn">
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      <TodoList
        todos={todos}
        onRemoveTodo={onRemoveTodo}
        onToggleTodo={onToggleTodo}
      />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: '60%', margin: 'auto' }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
    </section>
  )
}
