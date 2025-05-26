// 运行时配置
import { request as req } from "@umijs/max";
import { RequestConfig } from "@umijs/max";

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export const request: RequestConfig = {
  // сюда можно добавить общие настройки (например, errorConfig)
  requestInterceptors: [
    (url, options) => {

      if(url.includes("Login/login"))
        return { url, options };

      const token = localStorage.getItem('token');

      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      return { url, options };
    },
  ],
  responseInterceptors: [
    async (response) => {
      // например, глобальная обработка 401
      if (response.status === 401) {
        // сбросить токен, редирект на логин и т.д.
      }
      return response;
    },
  ],
};

export async function getInitialState(): Promise<{ role: string }> {
  const token = localStorage.getItem("token")
  if (!token)
    return {role: 'unauthorized'}

  const response = await req('api/User/GetRole', {
    method: "GET",
  });
  return { role: response.role};
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
