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
      target: 'http://localhost:5218', // Адрес целевого сервера
      changeOrigin: true, // Меняет заголовок Origin на target (обязательно для бэкендов с проверкой CORS)
      pathRewrite: { '^/api': '' },
    }
  },
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'kawasagi',
      path: '/home',
      component: './Home',
    },
    {
      
      name: 'kawa1sagi',
      path: '/auth',
      component: './Authorization',
    }
  ],
  npmClient: 'npm',
});

