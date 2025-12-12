// TODO: 调查这样引入的方式！
import './index.tsx'

export default function MessagePage() {
  return (
    <>
      <button onClick={() => window.onShow()}>确认</button>
    </>
  )
}
