import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/auth/Login.vue'
import Signup from '../components/auth/Signup.vue'
import Contacts from '../components/contact/Contacts'
import Contact from '../components/contact/Contact'
import Create from '../components/contact/Create'
import Edit from '../components/contact/Edit'

const ifNotAuthenticated = (to, from, next) => {
  if (!sessionStorage.getItem('token')) {
    next();
    return
  }
  next('/')
};

const ifAuthenticated = (to, from, next) => {
  if (sessionStorage.getItem('token')) {
    next();
    return
  }
  next('/login')
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Contacts
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/contacts/create',
    name: 'Create',
    component: Create,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/contact/:id',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/contacts/:id/edit',
    name: 'Edit',
    component: Edit,
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
