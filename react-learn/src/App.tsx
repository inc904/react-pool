import { Outlet } from 'react-router'
import './App.css'

function App() {
  return (
    <>
      <div className='container'>
        <div className='menu'>
          <p>
            <a href='/home'>首页</a>
          </p>
          <p>
            <a href='/card'>Card</a>
          </p>
          <p>
            <a href='/msg'>msg</a>
          </p>
          <p>
            <a href='/p2c'>父子传值</a>
          </p>
          <p>
            <a href='/bro'>兄弟传值</a>
          </p>
          <p>
            <a href='/useState'>useState</a>
          </p>
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
