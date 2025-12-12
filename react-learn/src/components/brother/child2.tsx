import { useState } from 'react'

export default function Child2() {
  const [message, setMessage] = useState("本地 child2's message")
  window.addEventListener('ob-child1', (event) => {
    console.log('触发了监听事件：', event.params)
    setMessage(event.params.name)
  })
  return <div>child2: {message}</div>
}
