import { createRouter, createWebHistory } from 'vue-router';
import Login from './modules/login/LoginPage.vue';
import Inicio from './modules/inicio/InicioPage.vue';
import ViewFiles from './modules/inicio/sidebar/viewfiles/ViewFiles.vue';
import UploadFile from './modules/inicio/sidebar/UploadFile.vue';
import Trash from './modules/inicio/sidebar/Trash.vue';
import Options from './modules/inicio/sidebar/Options.vue';
import AdminPanel from './modules/inicio/sidebar/AdminPanel.vue';
import Usuarios from './modules/inicio/sidebar/usuarios/Usuarios.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Inicio',
    component: Inicio,
    redirect: '/home/files',
    children: [
      { path: 'files', component: ViewFiles },
      { path: 'upload', component: UploadFile },
      { path: 'trash', component: Trash },
      { path: 'options', component: Options },
      { path: 'admin', component: AdminPanel,
        children: [
          { path: 'users', component: Usuarios },
          { path: 'trash', component: Trash }
        ],
        beforeEnter: (to, from, next) => {
          if (isAdmin()) {
            next();
          } else {
            router.push(`/home`);
          }
        }
      }
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    redirect: '/login',
  },
  /* {
    path: '/*',
    name: 'NotFound',
    component: NotFound, 
  }, */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

function isAdmin() {
  const usuario = JSON.parse(localStorage.getItem('user'));
  console.log(usuario.rol);
  return usuario.rol === 'administrador';
}

export default router