import {Model} from '@vuex-orm/core';
import instance from '@/api/main';
console.warn('MODEL.USER');

export default class User extends Model {
  static entity = 'users';
  static fields() {
    return {
      id: this.number(null),
      username: this.attr(''),
      email: this.attr(''),
      role: this.attr(''),
    };
  }
  static axios = instance;
  static apiConfig = {
    headers: {'Content-Type': 'application/json'},
    actions: {
      async getListUsers() {
        console.warn('MODEL.USER: getListUsers');
        return this.get('users');
      },
      async createUser(modelCreateUser) {
        console.warn('MODEL.USER: createUser');
        return await this.post('users', modelCreateUser);
      },
      async getUserByUsername(username) {
        return this.get('users/name/' + username);
      },
      async getUser(userId) {
        console.warn('MODEL.USER: createUser');
        return this.get('users/' + userId);
      },
      async updateUser(userId, data) {
        console.warn('MODEL.USER: updateUser');

        return this.put('users/' + userId, data);
      },
      async deleteUser(userId) {
        return this.delete('users/' + userId, {delete: userId});
      },

      async deleteUsers(flag) {
        return this.delete('users/delete/' + flag);
      },
      async getRoles() {
        console.warn('MODEL.USER: getRules');

        return this.get('roles');
      },
    },
  };
}
