import { useState } from 'react'

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  function handleAddTodo() {
    setTodos([...todos, inputValue])
    setInputValue('')
  }

  function handleDeleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <figure>
        <p>
          Bid me discourse, I will enchant thine ear, Or like a fairy trip upon the green, Or, like a nymph, with long dishevelled hair, Dance on the sands, and yet no footing seen: Love is a spirit
          all compact of fire, Not gross to sink, but light, and will aspire.
        </p>
        <figcaption>
          <cite>Venus and Adonis</cite>, by William Shakespeare
        </figcaption>
      </figure>
    </div>
  )
}

export default TodoApp
