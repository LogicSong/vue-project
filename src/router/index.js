import { createRouter, createWebHistory } from 'vue-router';
import { createRouterGuards } from './router-guards';
import 'nprogress/nprogress.css';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/login/index.vue')
  }
];

const whiteNameList = [];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

export async function setupRouter(app) {
  // 创建路由守卫
  createRouterGuards(router, whiteNameList);

  app.use(router);
  // 路由准备就绪后挂载APP实例
  await router.isReady();
}

export default router;
