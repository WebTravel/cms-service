// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'

// фильтр для даты с поддержкой русского языка
moment.locale('ru')

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD MMMM YYYY, hh:mm')
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
