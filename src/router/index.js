import Vue from 'vue'
import Router from 'vue-router'
import Catalog from '@/components/catalog/index'
import Site from '@/components/edit/index'
import Detail from '@/components/detail-site/index'

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
    },
    {
      path: '/site',
      name: 'new_site',
      component: Site
    },
    {
      path: '/site/:id/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
