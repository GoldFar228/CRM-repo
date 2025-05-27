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
      secure: false,
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
      name: 'home',
      path: '/home',
      component: './Home',
      access: 'isUser'
    },
    {
      name: 'clients',
      path: '/clients',
      component: './Clients',
      access: 'isUser'
    },
    {
      name: 'deals',
      path: '/deals',
      component: './Deals',
      access: 'isUser'
    },
    {
      name: 'login',
      path: '/login',
      component: './Authentication',
      layout: false
    },
    {
      name: 'profile',
      path: '/profile',
      component: './Profile',
      access: 'isUser'
    },
  ],
  npmClient: 'npm',
});

