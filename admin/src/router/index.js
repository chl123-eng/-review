import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/indexView',
    children: [
      {
        path: 'indexView',
        name: 'indexView',
        component: () => import('@/views/indexView/index'),
        meta: { title: '首页', icon: 'el-icon-news' },
      },
    ],
  },

  {
    path: '/components',
    component: Layout,
    redirect: '/components/avatarUpload',
    name: '组件',
    meta: { title: '组件', icon: 'el-icon-menu' },
    children: [
      {
        path: 'avatarUpload',
        name: '上传',
        component: () => import('@/views/avatarUpload/index'),
        meta: { title: '上传', icon: 'el-icon-upload' },
      },
      {
        path: 'table',
        name: '表格',
        component: () => import('@/views/table/index'),
        meta: { title: '表格', icon: 'el-icon-s-grid' },
      },
    ],
  },
];

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
