import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categorias from '../views/Categorias.vue'
import GridGame from '../views/GridGame.vue'
import Memorama from '../views/Memorama.vue'









Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
  
    {
        path: '/categorias',
        name: 'Categoria',
        component: Categorias
      },
      {
        path: '/gridgame',
        name: 'GridGame',
        component: GridGame
      },
      {
        path: '/memorama',
        name: 'Memorama',
        component: Memorama
      },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router