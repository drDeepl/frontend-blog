import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import store from './store';
import Vuex from 'vuex';
import vuetify from '@/plugins/vuetify';
import Close from 'vue-material-design-icons/Close.vue';
import Delete from 'vue-material-design-icons/Delete.vue';
import BackupRestore from 'vue-material-design-icons/BackupRestore.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown';
import DeleteCircleOutline from 'vue-material-design-icons/DeleteCircleOutline';
import MainLayout from './layouts/MainLayout.vue';
import setupInterceptors from './services/setupInterceptors';

Vue.config.productionTip = false;

Vue.use(VeeValidate);

// Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('arrow-icon', ChevronDown);
Vue.component('close-icon', Close);
Vue.component('delete-icon', Delete);
Vue.component('restore-icon', BackupRestore);
Vue.component('delete-icon', DeleteCircleOutline);
Vue.use(Vuex);

Vue.use(MainLayout);
setupInterceptors(store);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
