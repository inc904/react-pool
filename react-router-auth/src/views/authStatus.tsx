import { useNavigate } from 'react-router-dom'
import { useAuth } from './hook.tsx'
function AuthStatus() {
  let auth = useAuth()
  let navigate = useNavigate()

  if (!auth.user) {
    return <p>还未登录！</p>
  }

  return (
    <p>
      欢迎 {auth.user}!{' '}
      <button
        onClick={() => {
          auth.signout(() => navigate('/'))
        }}>
        登出
      </button>
    </p>
  )
}
export default AuthStatus
