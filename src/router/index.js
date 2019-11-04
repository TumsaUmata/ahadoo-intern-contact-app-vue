import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/auth/Login.vue'
import Signup from '../components/auth/Signup.vue'
import Recipes from '../components/contact/Contacts'
import Recipe from '../components/contact/Contact'
import Create from '../components/contact/Create'
import Edit from '../components/contact/Edit'

const ifNotAuthenticated = (to, from, next) => {
  if (!sessionStorage.getItem('token')) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (sessionStorage.getItem('token')) {
    next()
    return
  }
  next('/login')
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Recipes
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
    path: '/recipes',
    name: 'Recipes',
    component: Recipes,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/recipes/create',
    name: 'Create',
    component: Create,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/contact/:id',
    name: 'Recipe',
    component: Recipe
  },
  {
    path: '/recipes/:id/edit',
    name: 'Edit',
    component: Edit,
    beforeEnter: ifAuthenticated
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
