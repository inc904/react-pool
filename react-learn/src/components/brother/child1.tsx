export default function Child1() {
  const event = new Event('ob-child1')
  const clickTap = () => {
    console.log(event)
    event.params = { name: "来自 child1's message" }
    window.dispatchEvent(event)
  }
  return (
    <div>
      child1 定义事件模型
      <button onClick={clickTap}>派发事件</button>
    </div>
  )
}
declare global {
  interface Event {
    params: {
      name: string
    }
  }
}
