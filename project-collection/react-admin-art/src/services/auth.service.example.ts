/**
 * authService 使用 BaseResponse 的示例
 * 
 * 当前配置：
 * - axios 拦截器会自动检查 BaseResponse.code
 * - 如果 code !== 200，会自动 reject
 * - 成功时返回 BaseResponse.data（即实际的业务数据）
 */

import { authService } from "./auth.service";

// ✅ 示例 1: 基本使用
async function loginExample() {
  try {
    // login 返回的直接是 AuthResponse 类型
    // 不需要手动访问 .data.data
    const authResponse = await authService.login({
      username: "admin",
      password: "123456",
    });

    console.log(authResponse.token); // 直接访问
    console.log(authResponse.user);
    console.log(authResponse.expiresIn);
  } catch (error) {
    // 错误会包含 code 和 message
    console.error(error);
  }
}

// ✅ 示例 2: 如果需要自定义返回类型
import request from "@/utils/http/http-function";

interface CustomResponse {
  id: string;
  name: string;
}

async function customRequestExample() {
  // 直接指定返回类型即可
  const data = await request<CustomResponse>({
    url: "/api/custom",
    method: "get",
  });

  console.log(data.id);
  console.log(data.name);
}

// ✅ 示例 3: 处理列表数据
interface UserListResponse {
  list: Array<{ id: string; name: string }>;
  total: number;
}

async function getUserList() {
  const data = await request<UserListResponse>({
    url: "/api/users",
    method: "get",
  });

  console.log(data.list);
  console.log(data.total);
}

export { loginExample, customRequestExample, getUserList };
