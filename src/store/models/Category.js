import {Model} from '@vuex-orm/core';
import instance from '@/api/main';
export default class Token extends Model {
  static entity = 'categories';
  static fields() {
    return {
      id: this.attr(''),
      title: this.attr(''),
    };
  }
  static axios = instance;
  static apiConfig = {
    headers: {},
    actions: {
      async createCategory(data) {
        console.warn('MODELS.Category: createCategory');
        return this.post('categories', data);
      },
      async getCategories() {
        console.warn('MODELS: getCategories');
        return this.get('categories');
      },
    },
  };
}
