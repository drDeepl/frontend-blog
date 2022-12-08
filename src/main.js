import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import store from './store';
import Vuex from 'vuex';
import vuetify from '@/plugins/vuetify';

import '@/assets/scss/main.scss';

import MainLayout from './layouts/MainLayout.vue';
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd';
import {
  uniArrowCircleLeftThinline,
  uniUserCircle,
} from 'vue-unicons/dist/icons';

import setupInterceptors from './services/setupInterceptors';

Vue.config.productionTip = false;

Vue.use(Vuex);

Unicon.add([uniArrowCircleLeftThinline, uniUserCircle]);
Vue.use(Unicon);
Vue.use(MainLayout);
setupInterceptors(store);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
