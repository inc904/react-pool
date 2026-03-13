import httpInstance from '@/utils/http'

export const reqlogin = (body) => {
  return httpInstance.post('/api/login', body)
}

export const reqTodos = () => {
  return httpInstance.get('/api/todos')
}
