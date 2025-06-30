import { useState } from 'react';
import './App.css'
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'

function App() {
  let [todos, setTodos] = useState([
    { 
      id: 1,
      title: '学习React',
      done: false
    },
    {
      id: 2,
      title: '学习Vue',
      done: false
    }
  ]);
  let handleAddTodos = (title)=>{
    setTodos([...todos, {
      id: Date.now(),
      title,
      done: false
    }])
  }
  let handleDeleteTodo = (id)=>{
    setTodos(todos.filter(todo => todo.id !== id));
  }
  let handleToggleTodo = (id)=>{
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    }))
  }
  return (
    <>
      <TodoHeader handleAddTodos={handleAddTodos} />  
      <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} handleToggleTodo={handleToggleTodo} />  
      <div>
        一共{todos.length}条数据
      </div>
    </>
  )
}

export default App
