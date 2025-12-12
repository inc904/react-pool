import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyRouter from './router'

/* 为什么要加 ! 
  不加报错： 类型“HTMLElement | null”的参数不能赋给类型“Container”的参数。
  不能将类型“null”分配给类型“Container”。
  !是非空断言，告诉编辑器这个表达式不会为空。
*/
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyRouter />
  </StrictMode>
)
