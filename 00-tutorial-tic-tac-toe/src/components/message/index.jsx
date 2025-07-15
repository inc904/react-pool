import ReactDOM from 'react-dom/client'
import './index.css'

const Message = ({ message }) => {
    console.log('son', message)
    return (
        <div> {message}1111</div>
    )
}

const queue = []

const showMessage = (message, type = 'info') => {
    console.log('message', message)
    const messageContainer = document.createElement('div')
    const root = ReactDOM.createRoot(messageContainer)
    messageContainer.className = `message ${type}`
    messageContainer.style.top = `${queue.length * 40 + 10}px`
    document.body.appendChild(messageContainer)

    root.render(<Message message={message} type={type} />)
    document.body.appendChild(messageContainer)
    queue.push({
        messageContainer,
        root,
    })
    setTimeout(() => {
        // queue.shift()
        const item = queue.find(item => item.messageContainer === messageContainer)
        item.root.unmount()
        document.body.removeChild(item.messageContainer)
        queue.splice(queue.indexOf(item), 1)
    }, 3000)
}

window.onShow = showMessage

export default Message
