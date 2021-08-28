import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import(/* webpackChunkName: "about" */ '../views/Join.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import(/* webpackChunkName: "about" */ '../views/Room.vue'),
    beforeEnter : (to , from , next) => {
      if(store.state.currentRoom != ''){
        next();
      }else{
        next(false);
      }
    }
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
