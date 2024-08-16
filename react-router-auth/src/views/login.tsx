// import * as React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './hook'
export default function Login() {
  let navigate = useNavigate()
  let location = useLocation()
  let auth = useAuth()
  let from = location.state?.from?.pathname || '/'
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(event.currentTarget)
    let formData = new FormData(event.currentTarget)
    let username = formData.get('username') as string
    auth.signin(username, () => {
      navigate(from, { replace: true })
    })
  }
  return (
    <div>
      <p>你必须登录去查看{from}页面</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name='username' type='text' />
        </label>{' '}
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
