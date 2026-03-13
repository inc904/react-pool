import request from "@/utils/http/http-function";

import type { LoginCredentials, AuthResponse } from "@/types/auth.types";

export const authService = {
  // 登录
  login(data: LoginCredentials): Promise<AuthResponse> {
    return request({
      url: "/auth/login",
      method: "post",
      data,
    });
  },
  // 退出登录
  logout() {
    return request({
      url: "/auth/logout",
      method: "post",
    });
  },
  // 获取用户信息
  getUserInfo() {
    return request({
      url: "/auth/userinfo",
      method: "get",
    });
  },
  // 刷新token
  refreshToken(data: { token: string }) {
    return request({
      url: "/auth/refresh",
      method: "post",
      data,
    });
  },
  // 获取验证码
  getcaptcha() {
    return request({
      url: "/auth/captcha",
      method: "get",
    });
  },
  /**
   * 验证令牌有效性
   * @param token - 访问令牌
   * @returns boolean - 令牌是否有效
   *
   */
  validateToken(token: string): boolean {
    if (!token || token.trim() === "") {
      return false;
    }

    try {
      // 解析JWT令牌（简化版本，实际应该使用jwt-decode库）
      const parts = token.split(".");
      if (parts.length !== 3) {
        return false;
      }

      // 解码payload
      const payload = JSON.parse(atob(parts[1]));

      // 检查过期时间
      if (payload.exp) {
        const expirationTime = payload.exp * 1000; // 转换为毫秒
        const currentTime = Date.now();
        return currentTime < expirationTime;
      }

      // 如果没有过期时间，认为令牌有效
      return true;
    } catch {
      // 解析失败，令牌无效
      return false;
    }
  },
};
