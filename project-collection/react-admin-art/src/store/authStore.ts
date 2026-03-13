/**
 * 认证状态管理
 * Authentication State Management
 *
 * 使用Zustand管理全局认证状态
 * Uses Zustand for global authentication state management
 *
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, User, LoginCredentials } from "@/types/auth.types";
import { authService } from "@/services/auth.service";
import { setToken, getToken, clearToken } from "@/utils/storage";

/**
 * 认证Store接口
 */
interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  clearAuth: () => void;
  initializeAuth: () => void;
}

/**
 * 创建认证Store
 *
 * 功能:
 * - 管理用户认证状态（token, user, isAuthenticated）
 * - 提供登录、登出、设置用户等操作
 * - 与本地存储同步令牌
 * - 集成认证服务API调用
 * - 使用 persist 中间件持久化状态到 localStorage
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // 初始状态
      token: null,
      user: null,
      isAuthenticated: false,

      /**
       * 用户登录
       * @param credentials - 登录凭据（用户名和密码）
       * @throws 登录失败时抛出错误
       *
       */
      login: async (credentials: LoginCredentials) => {
        try {
          // 调用认证服务进行登录
          const responseData = await authService.login(credentials);
          // console.log("login-response", response);
          console.log("login-response", responseData);
          // const responseData = response.data;
          // 计算令牌过期时间
          const expiresAt = Date.now() + responseData.expiresIn * 1000;

          // 保存令牌到本地存储
          setToken(responseData.token);

          // 更新状态
          set({
            token: {
              accessToken: responseData.token,
              expiresAt,
              tokenType: "Bearer",
            },
            user: responseData.user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.log("login-error", error);
          // 登录失败，清除状态
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      /**
       * 用户登出
       *
       * 验证需求: 1.5 - WHEN 用户点击登出按钮, THE Auth_Module SHALL 清除访问令牌并重定向到登录页面
       */
      logout: async () => {
        try {
          // 调用认证服务进行登出
          await authService.logout();
        } catch (error) {
          // 即使API调用失败，也要清除本地状态
          console.error("Logout API call failed:", error);
        } finally {
          // 清除本地存储的令牌
          clearToken();

          // 清除状态
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          });
        }
      },

      /**
       * 设置用户信息
       * @param user - 用户对象
       *
       * 用于更新用户信息而不改变认证状态
       */
      setUser: (user: User) => {
        set({ user });
      },

      /**
       * 清除认证状态
       *
       * 验证需求: 1.5 - 清除访问令牌和认证状态
       *
       * 与logout的区别：
       * - clearAuth: 仅清除本地状态，不调用API
       * - logout: 调用API并清除本地状态
       */
      clearAuth: () => {
        // 清除本地存储的令牌
        clearToken();

        // 清除状态
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },

      /**
       * 初始化认证状态
       *
       * 从本地存储恢复令牌，验证其有效性
       * 应在应用启动时调用
       */
      initializeAuth: () => {
        const token = getToken();

        if (token && authService.validateToken(token)) {
          // 令牌有效，恢复认证状态
          // 注意：这里只恢复token和isAuthenticated
          // user信息需要通过API获取或从其他地方恢复
          set({
            token: {
              accessToken: token,
              expiresAt: 0, // 实际应该从token中解析
              tokenType: "Bearer",
            },
            isAuthenticated: true,
          });
        } else {
          // 令牌无效或不存在，清除状态
          clearToken();
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage", // localStorage 中的 key 名称
      // 可选：自定义存储方式
      // storage: createJSONStorage(() => sessionStorage), // 使用 sessionStorage
      // 可选：部分持久化，只保存特定字段
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      // 可选：版本控制和迁移
      version: 1,
    }
  )
);

export default useAuthStore;
