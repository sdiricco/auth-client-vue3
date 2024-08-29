import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const aboutPage = () => import('@/views/About.vue');
const registrationPage = () => import('@/views/Registration.vue');
const loginPage = () => import('@/views/Login.vue');
const todosPage = () => import('@/views/Todos.vue');
const homePage = () => import('@/views/Home.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'RootPage',
    redirect: '/registration',
  },
  {
    path: '/registration',
    name: 'RegistrationPage',
    component: registrationPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: loginPage,
  },
  {
    path: '/home',
    name: 'HomePage',
    component: homePage,
    redirect: () => ({ name: 'TodosPage' }),
    children: [
      {
        path: 'todos',
        name: 'TodosPage',
        component: todosPage,
      }
    ]
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: aboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
