import Category from './models/Category';
const STATES = {
  RUN: 'RUN',
  ERROR: 'ERROR',
  COMPLETE: 'COMPLETE',
};
export const category = {
  namespaced: true,
  state: {
    getCategories: {status: '', message: ''},
    createCategory: {status: '', message: ''},
  },
  actions: {
    async getCategories(context) {
      console.warn('MODULE.CATEGORY: getCategories');
      context.commit('SET_STATE_GET_CATEGORIES', STATES.RUN);
      const responseWrap = await Category.api()
        .getCategories()
        .catch((error) => {
          return error;
        });
      context.commit('SET_STATE_GET_CATEGORIES', STATES.COMPLETE);
      return responseWrap.response;
    },
    async createCategory(context, data) {
      console.warn('MODULE.CATEGORY: createCategory');
      context.commit('SET_STATE_GET_CATEGORIES', STATES.RUN);
      const responseWrap = await Category.api()
        .createCategory(data)
        .catch((error) => {
          return error;
        });
      context.commit('SET_STATE_GET_CATEGORIES', STATES.COMPLETE);
      return responseWrap.response;
    },
  },
  getters: {
    GET_STATE_getCategories: (state) => {
      return state.getCategories;
    },

    GET_STATE_createCategory: (state) => {
      return state.createCategory;
    },
  },
  mutations: {
    SET_STATE_GET_CATEGORIES: function (state, status) {
      state.getCategories.status = status;
    },
    SET_STATE_CREATE_CATEGORY: function (state, status) {
      state.createCategory.status = status;
    },
  },
};
