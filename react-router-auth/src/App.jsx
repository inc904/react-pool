import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './views/layout'
import LoginPage from './views/login'
import AuthProvider from './views/authProvider'
import { RequireAuth } from './views/hook.tsx'
function App() {
  return (
    <div style={{ width: '500px' }}>
      <AuthProvider>
        <h1>鉴权样例</h1>
        <p>本例展示了一个简单的登录流程，包含了一个公共页面，一个需要登陆才能看的受保护的页面，以及一个登录页面。</p>
        <p>
          首先，访问公共页面，然后访问受保护页面。当访问受保护页面的时候，由于你还未登录，所以你会被重定向到登录页面。登录之后你就会被重定向至受保护页面。
        </p>
        <p>
          请注意每次URL的变化.
          在你点击登录之后，如果这时候你点击浏览器的回退按钮，你觉得你会回到登录页面吗？不！你已经登录了。如果不相信你可以试一试，你会发现你回到的是访问登录页面之前的那个页面，也就是公共页面。
        </p>

        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<PublicPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/protected'
              element={
                <RequireAuth>
                  <ProtectedPage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App

function PublicPage() {
  return <h3>这是公共页面</h3>
}

function ProtectedPage() {
  return <h3>这是受保护页面</h3>
}
