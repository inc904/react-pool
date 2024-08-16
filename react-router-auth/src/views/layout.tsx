import { Link, Outlet } from 'react-router-dom'
import StatusBar from './statusBar'

function Layout() {
  return (
    <div>
      <StatusBar />
      <nav>
        <Link to='/'>公共页面</Link> | <Link to='/protected'>受保护页面</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout
