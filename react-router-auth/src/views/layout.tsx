import { Link, Outlet } from 'react-router-dom'
import AuthStatus from './authStatus'

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to='/'>公共页面</Link>
        </li>
        <li>
          <Link to='/protected'>受保护页面</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  )
}

export default Layout
