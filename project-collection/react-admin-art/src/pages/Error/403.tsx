import { useRouter } from '@/hooks/use-router'
import { Button, Result } from 'antd'

export default function Forbidden() {
  const { push } = useRouter()
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有权限访问此页面。"
      extra={
        <Button type="primary" onClick={() => push('/')}>
          返回首页
        </Button>
      }
    />
  )
}
