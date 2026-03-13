import axios, { type AxiosResponse } from "axios";
// import { getToken } from "@utils/storage";

import { type BaseResponse } from "@/types";

const defaultConfig = {
  timeout: 5000,
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true,
};

const axiosInstance = axios.create(defaultConfig);

/** 请求拦截器 */
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = getToken("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/** 响应拦截器 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<BaseResponse>) => {
    // 成功响应处理
    console.log("axios-response", response);
    const { data } = response;

    // 检查业务状态码
    if (data.code !== 200) {
      showError(data.msg || "操作失败");
      // return Promise.reject({
      //   code: data.code,
      //   message: data.msg,
      //   data: data.data,
      // });
      return Promise.reject(new Error(data.msg || "操作失败"));
    }

    // 直接返回业务数据，这样调用方获得的就是 T 类型
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.data as any;
  },
  (error) => {
    // 处理网络错误（无响应）
    if (!error.response) {
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        const message = "请求超时，请稍后重试";
        showError(message);
        console.log("Request timeout:", error.message);
        return Promise.reject({
          code: "TIMEOUT",
          message,
          originalError: error,
        });
      }
      // 其他网络错误
      const message = "网络连接失败，请检查网络设置";
      showError(message);
      console.log("Network error:", error.message);
      return Promise.reject({
        code: "NETWORK_ERROR",
        message,
        originalError: error,
      });
    }

    const { status } = error.response;
    let errorMessage = "操作失败";

    switch (status) {
      case 401:
        errorMessage = "登录已过期，请重新登录";
        break;
      case 403:
        errorMessage = "没有权限访问该资源";
        break;
      case 404:
        errorMessage = "请求的资源不存在";
        break;
      case 500:
        errorMessage = "服务器内部错误";
        break;
      default: {
        // 尝试从响应中获取错误消息
        const responseData = error.response.data as
          | BaseResponse
          | { message?: string }
          | undefined;
        if (responseData && "msg" in responseData) {
          errorMessage = responseData.msg;
        } else if (responseData && "message" in responseData) {
          errorMessage = responseData.message || error.message;
        } else {
          errorMessage = `请求失败，错误码：${status}`;
        }
        break;
      }
    }

    showError(errorMessage);
    console.error("API error:", status, errorMessage);
    return Promise.reject({
      code: status,
      message: errorMessage,
      originalError: error,
    });
  },
);

export default axiosInstance;

function showError(msg: string) {
  console.log(msg);
}
