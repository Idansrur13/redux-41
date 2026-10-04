import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { saveTodo } from '../hooks/action.js'
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

const { useNavigate, useParams } = ReactRouterDOM

export function TodoEdit() {
  const todos = useSelector((storeState) => storeState.todos)
  const reloaded = useSelector((storeState) => storeState.reloaded)

  const [todoToEdit, setTodoToEdit] = useState({
    txt: '',
    importance: 0,
    isDone: false,
    color: '#d03939',
  })
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (!todos) return
    if (params.todoId) loadTodo()
  }, [todos])

  function loadTodo() {
    const tte = todos.find((t) => t._id === params.todoId)
    if (tte) {
      setTodoToEdit(tte)
    } else {
      console.log('no found todo:', params.todoId)
    }
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setTodoToEdit((prevTodoToEdit) => ({ ...prevTodoToEdit, [field]: value }))
  }

  function onSaveTodo(ev) {
    ev.preventDefault()
    console.log('color', todoToEdit)

    saveTodo(todoToEdit)
      // todoService
      //   .save(todoToEdit)
      .then((savedTodo) => {
        navigate('/todo')
        showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot save todo')
        console.log('err:', err)
      })
  }
  if (!reloaded) return <div>Loading...</div>

  return (
    <section className="todo-edit">
      <form onSubmit={onSaveTodo}>
        <label htmlFor="txt">Text:</label>
        <input
          onChange={handleChange}
          value={todoToEdit.txt}
          type="text"
          name="txt"
          id="txt"
        />

        <label htmlFor="importance">Importance:</label>
        <input
          onChange={handleChange}
          value={todoToEdit.importance}
          type="number"
          name="importance"
          id="importance"
        />

        <label htmlFor="isDone">isDone:</label>
        <input
          onChange={handleChange}
          checked={todoToEdit.isDone}
          type="checkbox"
          name="isDone"
          id="isDone"
        />
        <input
          onChange={handleChange}
          value={todoToEdit.color}
          type="color"
          name="color"
          id="color"
        />

        <button>Save</button>
      </form>
    </section>
  )
}
