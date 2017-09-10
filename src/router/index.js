import Vue from 'vue'
import Router from 'vue-router'
import Catalog from '@/components/catalog/index'
import Site from '@/components/edit/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/site/:id',
      name: 'site',
      component: Site
    }
  ]
})
