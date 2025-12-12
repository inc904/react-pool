import { createRoot, type Root } from 'react-dom/client'
import './index.css'
/**
 * Message 组件
 * 这是一个简单的提示组件，用于显示提示信息
 * @returns 返回一个包含提示文本的div元素
 */
const Message = () => {
  return <div>提示组件</div>
}

interface Items {
  messageContainer: HTMLDivElement
  root: Root
}

const queue: Items[] = []

/**
 * 处理消息显示的函数
 * 创建一个消息容器并渲染消息组件，2秒后自动移除
 */
function handleOnshow  () {
  // 创建消息容器元素
  const messageContainer = document.createElement('div')
  // 设置消息容器的CSS类名
  messageContainer.className = 'message'
  // 根据当前队列长度计算并设置消息容器的垂直位置
  messageContainer.style.top = `${queue.length * 50}px`
  // 将消息容器添加到文档body中
  document.body.appendChild(messageContainer)
  // 创建React根节点并绑定到消息容器
  const root = createRoot(messageContainer)
  // 渲染消息组件到根节点
  root.render(<Message />)
  // 将消息容器和根节点添加到队列中
  queue.push({ messageContainer, root })

  // 设置定时器，2秒后移除消息
  setTimeout(() => {
    // 从队列中查找当前消息项
    const item = queue.find((item) => item.messageContainer === messageContainer)
    // 如果找到消息项，则执行卸载和移除操作
    if (item) {
      // 卸载React组件
      item.root.unmount()
      // 从DOM中移除消息容器
      document.body.removeChild(messageContainer)
      // 从队列中移除消息项
      queue.splice(queue.indexOf(item), 1)
    }
  }, 2000)
}

window.onShow = handleOnshow

declare global {
  interface Window {
    onShow: () => void
  }
}

export default Message

