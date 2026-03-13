import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { reqlogin, reqTodos } from '@/api'

function App() {
  const [count, setCount] = useState(0)

  const getLogin = async (body) => {
    const res = await reqlogin(body)
    console.log(res)
  }
  const getTodos = async () => {
    const res = await reqTodos()
    console.log(res)
  }
  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card flex'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <button onClick={() => getLogin({ username: 'admin', password: '1234567' })}>登录</button>
        <button onClick={() => getTodos()}>获取待办事项</button>
      </div>
    </>
  )
}

export default App
