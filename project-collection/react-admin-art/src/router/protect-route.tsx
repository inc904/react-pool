import { Navigate } from "react-router";
import useAuthStore from "@/store/authStore";

interface ProtectRouteProps {
  children: React.ReactNode;
  requirePermission?: string[];
}

export default function ProtectRoute({
  children,
  requirePermission,
}: ProtectRouteProps) {
  const authStore = useAuthStore();
  console.log("authStore", authStore);
  const isAuthenticated = authStore.isAuthenticated;
  const hasPermission = requirePermission
    ? requirePermission.some((permission) => permission)
    : true;

  // 未认证用户重定向到 登录页
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  // 如果需要权限，检查用户是否 拥有所有权限
  if (!hasPermission) {
    return <Navigate to="/403" />;
  }

  return <>{children}</>;
}
