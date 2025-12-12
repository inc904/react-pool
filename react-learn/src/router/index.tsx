// 声明式
import { BrowserRouter, Routes, Route } from 'react-router'
import App from '../App'

import Home from '@/components/home'
import CardPage from '@/components/card/page'
import MessagePage from '@/components/message/page'
import Fa2Child from '@/components/fa2child'
import Brother from '@/components/brother'
import UseStatePage from '@/components/a10useState'
export default function MyRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/card' element={<CardPage />}></Route>
          <Route path='/msg' element={<MessagePage />}></Route>
          <Route path='/p2c' element={<Fa2Child />}></Route>
          <Route path='/bro' element={<Brother />}></Route>
          <Route path='/useState' element={<UseStatePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
