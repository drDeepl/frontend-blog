import User from './models/User';

export const user = {
  namespaced: true,
  state: {
    createUser: {status: null, message: ''},
  },
  actions: {
    async createUser(context, payload) {
      console.warn('module.user: createUser');
      let status = 'create';
      let message = '';
      let stateData = {status: status, message: message};
      context.commit('SET_CREATE_USER', stateData);
      const responseWrap = await User.api().createUser(payload);
      const response = responseWrap.response;
      const data = response.data;
      const statusCode = response.status;
      if (statusCode === 200) {
        status = 'complete';
        message = 'Аккаунт успешно создан!';
        stateData.status = status;
        stateData.message = message;
        console.log(stateData);
        return data;
      } else {
        status = 'error';
        message = 'произошла ошибка';
        return {};
      }
    },
  },
  getters: {
    GET_CREATE_USER: (state) => {
      return state.createUser;
    },
  },
  mutations: {
    SET_CREATE_USER: function (state, stateData) {
      console.warn('SET_CREATE_USER');

      state.createUser = stateData;
    },
    SET_DEFAULT_CREATE_USER: function (state) {
      state.createUser = {status: null, message: ''};
    },
  },
};
