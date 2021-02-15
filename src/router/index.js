import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Team from '../objects/Team.js'

Vue.use(VueRouter)

function dynamicPropsFn () {
  const team = new Team()
  return {
    team: team
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import(/* webpackChunkName: "favourties" */'../views/Favourites.vue')
  },
  {
    path: '/teamDetails',
    name: 'teamDetails',
    component: () => import(/* webpackChunkName: "teamDetails" */'../views/TeamDetails.vue'),
    props: { dynamicPropsFn }
  }
]

const router = new VueRouter({
  routes
})

export default router
