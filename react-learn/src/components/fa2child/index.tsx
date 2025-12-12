import { useState } from 'react'
import Child from './child'
import Child2 from './child2'
import Child3 from './child3'
export default function ParentApp() {
  const [subTitle, setSubTitle] = useState('default')
  const changeSubTitle = (str: string) => {
    setSubTitle(str)
  }
  return (
    <>
      <div>
        <Child student='云峰峰'>
          <h1>银川欢迎你！</h1>
        </Child>
        <hr />
        <Child2 student='小鱼儿'>
          <h1>西夏区欢迎你！</h1>
        </Child2>
        <hr />
        <Child3 student='小刚' subTitle={subTitle} change={changeSubTitle}>
          <h1>西夏区欢迎你！</h1>
        </Child3>
      </div>
    </>
  )
}
