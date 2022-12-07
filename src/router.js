import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import MainLayout from '@/layouts/MainLayout';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', component: MainLayout},
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/login',
          component: Login,
        },
        {
          path: '/:pathMathc(.*)*',
          name: 'NotFound',
          component: () => import('@/views/NotFound.vue'),
        },
      ],
    },
  ],
});
