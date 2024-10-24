import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashBoard from '../views/DashBoard.vue';
import ControlPanel from '../views/ControlPanel.vue';

const routes = [
  // login route
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  // dashboard route
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard,
  },
  // control panel route
  {
    path: '/controlpanel',
    name: 'ControlPanel',
    component: ControlPanel
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
