import { useRouter } from '@/hooks/use-router'
import { Button } from 'antd'
export default function NotFound() {
  const { push } = useRouter()
  const goHome = () => {
    push('/')
  }
  return (
    <div>
      <h2>404 page not found.</h2>
      <Button onClick={goHome}>Back Home</Button>
    </div>
  )
}
