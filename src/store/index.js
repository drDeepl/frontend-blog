// import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import User from './models/User';
import Category from './models/Category';

import {auth} from './module.auth';
import {user} from './module.user';
import {category} from './module.category';
import instance from '@/api/main';

const userInfo = localStorage.getItem('user');
if (userInfo) {
  console.warn('TOKEN EXIST');
  instance.defaults.headers.common['Authorization'] = userInfo.access;
}

Vue.use(Vuex);
VuexORM.use(VuexORMAxios, {axios: instance});

// INFO: create a new instance of Database
const database = new VuexORM.Database();

// INFO: Register model to Database
database.register(User);
database.register(Category);
export default new Vuex.Store({
  state: {
    connect: false,
    message: null,
  },
  mutations: {
    SOCKET_CONNECT: (state) => {
      state.connect = true;
    },
  },
  modules: {
    auth,
    user,
    category,
  },
  plugins: [VuexORM.install(database)],
});
