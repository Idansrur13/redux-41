import { showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoDetails() {
  const todos = useSelector((storeState) => storeState.todos)
  const reloaded = useSelector((storeState) => storeState.reloaded)

  const [todo, setTodo] = useState({
    txt: '',
    importance: 0,
    isDone: false,
    color: '',
  })
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!reloaded || !todos) return
    loadTodo()
  }, [params.todoId])

  function loadTodo() {
    const tte = todos.find((t) => t._id === params.todoId)
    if (tte) {
      setTodo(tte)
    } else {
      console.log('no found todo:', params.todoId)
      showErrorMsg('Cannot found todo')
    }
  }

  function onBack() {
    // If nothing to do here, better use a Link
    navigate('/todo')
    // navigate(-1)
  }

  if (!todo) return <div>Loading...</div>
  return (
    <section className="todo-details">
      <h1 className={todo.isDone ? 'done' : ''}>{todo.txt}</h1>
      <h2>{todo.isDone ? 'Done!' : 'In your list'}</h2>

      <h1>Todo importance: {todo.importance}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem
        accusantium, itaque ut voluptates quo? Vitae animi maiores nisi,
        assumenda molestias odit provident quaerat accusamus, reprehenderit
        impedit, possimus est ad?
      </p>
      <button onClick={onBack}>Back to list</button>
      <div>
        <Link to={`/todo/${todo.nextTodoId}`}>Next Todo</Link> |
        <Link to={`/todo/${todo.prevTodoId}`}>Previous Todo</Link>
      </div>
    </section>
  )
}
