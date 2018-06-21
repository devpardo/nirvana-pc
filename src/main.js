import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import App from './App'
import router from '@/router'
import store from '@/store'
import api from '@/store/api.js'
import '@/libs/prototype/Array'
import '@/components/common.js'
import {Tabs, Tab} from 'vue-tabs-component';

Vue.config.productionTip = false

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);

sync(store, router)
// 触发 install
Vue.use(api, { store })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

export { router, store }
