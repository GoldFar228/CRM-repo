import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  locale: {
    antd: true,
    default: "ru-ru"
  },
  proxy: {
    '/api': {
      target: 'https://localhost:7079', // Адрес целевого сервера
      changeOrigin: true, // Меняет заголовок Origin на target (обязательно для бэкендов с проверкой CORS)
      pathRewrite: { '^/api': '' },
    }

  },
  initialState: {},
  // request: {'dataField': },
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    }
  ],
  npmClient: 'npm',
});

