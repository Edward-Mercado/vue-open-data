import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BoroughGame from '@/views/BoroughGame.vue'
import SecretView from '@/views/SecretView.vue'
import DataView from '@/views/DataView.vue'
import MapView from '@/views/MapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    'path': '/',
    'name': "home",
    "component": HomeView
  },{
    'path': '/play/:borough',
    'name': "borough-view",
    "component": BoroughGame
  },{
    'path': '/secret/supersecretpath',
    'name': "hi-mr-whalen",
    "component": SecretView
  },{
    'path': '/view/:borough',
    'name': "data-view",
    "component": DataView
  },{
    'path': '/map-view',
    'name': "map-view",
    "component": MapView
  }],
})

export default router
