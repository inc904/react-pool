import { Navigate } from 'react-router'
import useAuthStore from '@/store/authStore'

interface ProtectRouteProps {
  children: React.ReactNode
}

export default function ProtectRoute({ children }: ProtectRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}
