<template>
  <v-app id="app">
    <v-sheet>
      <v-sheet>
        <Form
          v-if="forms.register.active"
          title="Регистрация"
          :isActive="forms.register.active"
          :isSucces="forms.register.isSucces"
          :model="forms.register.modelData"
          :toSubmit="onClickApplyRegister"
          :toCancel="onClickCancelRegister"
        >
          <v-expand-transition>
            <v-sheet
              v-if="forms.register.isSucces"
              class="transition-fast-in-fast-out v-card--reveal"
              style="height: 100%"
            >
              <v-card-text class="pb-0 text-h6 text-center">
                {{ stateCreateUser.message }}
              </v-card-text>

              <v-card-actions class="cards-container-buttons">
                <v-flex align-self-center>
                  <v-btn
                    color="green darken-1"
                    @click.prevent="onClickLogIn"
                    class="pr-2 pl-2 pt-0 pb-0 mr-1"
                    outlined
                    rounded
                  >
                    войти
                  </v-btn>
                  <v-btn
                    color="red darken-1"
                    @click.prevent="onClickCancelLogin"
                    class="pl-2 pr-2 pt-0 pb-0 ml-1"
                    outlined
                    rounded
                  >
                    закрыть
                  </v-btn>
                </v-flex>
              </v-card-actions>
            </v-sheet>
          </v-expand-transition>
        </Form>
        <Form
          v-if="forms.createTopic.active"
          title="Создание темы"
          :isActive="forms.createTopic.active"
          :isSucces="forms.createTopic.isSucces"
          :model="forms.createTopic.modelData"
          :toSubmit="onClickApplyCreateTopic"
          :toCancel="onClickCancelCreateTopic"
        />
      </v-sheet>
      <Form
        v-if="forms.login.active"
        title="Вход"
        :isActive="forms.login.active"
        :isSucces="forms.login.isSucces"
        :model="forms.login.modelData"
        :toSubmit="onClickApplyLogin"
        :toCancel="onClickCancelLogin"
      />
      <!-- <Form
        v-if="forms.createCard.active"
        title="Создание поста"
        :fullscreen="true"
        :isActive="forms.createCard.active"
        :isSucces="forms.createCard.isSucces"
        :model="forms.createCard.modelData"
        :toSubmit="onClickApplyCreateCard"
        :toCancel="onClickCancelCreateCard"
      /> -->
      <Post
        v-if="forms.createCard.active"
        :isActive="forms.createCard.active"
        :isSucces="forms.createCard.isSucces"
        :toSubmit="onClickApplyCreateCard"
        :toCancel="onClickCancelCreateCard"
      />

      <v-navigation-drawer
        class="navigation-drawer-layout elevation-7"
        color="grey lighten-1"
        app
        clipped
        permanent
        :mini-variant="clickSidebar"
        right
      >
        <div class="header-nav-drawer-layout">
          <v-btn
            class="ma-2"
            x-small
            color="red darken-1"
            text
            icon
            @click.prevent="clickSidebar = !clickSidebar"
          >
            <unicon
              :class="'menu-toggle'"
              name="arrow-circle-left"
              fill="white"
              icon-style="thinline"
            />
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="user.status.loggedIn"
            text
            color="white"
            @click.prevent="onClickLogOut"
          >
            <span v-if="!clickSidebar">выйти</span>
            <unicon name="signout" fill="white" icon-style="line" />
          </v-btn>
        </div>

        <div class="container-user-info">
          <v-avatar color="orange accent-3" :size="clickSidebar ? 47 : 65">
            <span class="white--text text-h5">
              {{ user.username[0] }}
            </span>
          </v-avatar>

          <v-card-text
            v-if="user.status.loggedIn"
            class="text-center text-h6 pt-0 white--text"
          >
            {{ clickSidebar ? '' : user.username }}
          </v-card-text>
        </div>
        <div class="container-user-action">
          <div
            v-if="!user.status.loggedIn"
            class="container-actions-before-login container-user-action"
          >
            <v-btn
              text
              :icon="clickSidebar"
              rounded
              color="white"
              @click.prevent="onClickLogIn"
            >
              <span v-if="!clickSidebar">Войти</span>
              <unicon
                class="sidebar-icon"
                name="signin"
                fill="white"
                icon-style="line"
              />
            </v-btn>
            <v-btn
              text
              :icon="clickSidebar"
              rounded
              color="white"
              @click.prevent="onClickRegister"
            >
              <span v-if="!clickSidebar">Зарегистрироваться</span>
              <unicon name="user-plus" fill="white" icon-style="line" />
            </v-btn>
          </div>
          <v-select
            v-if="!clickSidebar"
            dark
            v-model="currentCategory"
            class="pa-2 white--text"
            :items="categories"
            item-text="title"
            item-value="id"
            item-color="deep-orange"
            color="white"
            label="Разделы:"
          ></v-select>
          <div v-if="user.status.loggedIn">
            <v-btn
              class="ma-0"
              text
              color="white"
              @click.prevent="onClickCreateTopic"
            >
              <span v-if="!clickSidebar">Создать тему</span>
            </v-btn>
            <v-btn
              class="ma-0"
              text
              color="white"
              @click.prevent="onClickCreateCard"
            >
              <span v-if="!clickSidebar">Создать карточку</span>
            </v-btn>
          </div>
        </div>
      </v-navigation-drawer>
    </v-sheet>
    <v-main>
      <v-container fluid>
        {{ currentCategory }}
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';
import Form from '@/UI/Form';
import Post from '@/UI/Post';

import UserRegister from '@/models/model.user.register';
import UserLogin from '@/models/model.user.login';
import CreateTopic from '@/models/model.create.topic';
import CreateCard from '@/models/model.create.card';

export default {
  components: {Form, Post},
  data() {
    return {
      clickSidebar: true,
      forms: {
        login: {active: false, modelData: UserLogin, isSucces: false},
        register: {active: false, modelData: UserRegister, isSucces: false},
        createTopic: {active: false, modelData: CreateTopic, isSucces: false},
        createCard: {active: false, modelData: CreateCard, isSucces: false},
      },
      currentCategory: '',
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/initState',
      stateCreateUser: 'user/GET_CREATE_USER',
      createCategory: 'category/GET_STATE_createCategory',
      getCategories: 'category/GET_STATE_getCategories',
    }),
    categories: function () {
      return this.$store.$db().model('categories').all();
    },
  },
  async created() {
    console.warn('created MainLayout');
    await this.$store.dispatch('category/getCategories');
  },
  watch: {},
  methods: {
    onClickLogIn() {
      console.warn('onClickLogIn');
      this.forms.login.active = true;
      if (this.forms.register.active) {
        this.onClickCancelRegister();
      }
    },
    onClickCancelLogin() {
      console.warn('onClickCancelLogin');
      this.forms.login.active = false;
      this.forms.login.isSucces = false;
    },
    async onClickApplyLogin(data) {
      console.warn('onClickApplyLogin:');
      const response = await this.$store.dispatch('auth/login', data);
      console.log(response);
      this.forms.login.isSucces = true;
      this.forms.login.active = false;
    },
    onClickRegister() {
      console.warn('onClickRegister');
      this.forms.register.active = true;
      this.clickSidebar = true;
      if (this.forms.login.active) {
        this.onClickCancelRegister();
      }
    },
    async onClickApplyRegister(data) {
      console.warn('onClickRegister');
      data['role'] = 'USER';
      const payload = data;
      console.log(payload);
      const dataResponse = await this.$store.dispatch(
        'user/createUser',
        payload
      );
      console.log(dataResponse);
      this.forms.register.isSucces = true;
    },
    onClickCancelRegister() {
      console.warn('OnClickCancel Register');
      this.forms.register.active = false;
      this.forms.register.isSucces = false;
    },
    onClickCreateTopic() {
      console.warn('onClickCreateTab');
      this.forms.createTopic.active = true;
    },
    onClickCancelCreateTopic() {
      this.forms.createTopic.active = false;
    },
    async onClickApplyCreateTopic(data) {
      console.warn('onClickApplyCreateTopic');
      const response = await this.$store.dispatch(
        'category/createCategory',
        data
      );
      this.onClickCancelCreateTopic();
      console.log(response);
    },

    onClickLogOut() {
      console.log('onClickLogOut');
      this.$store.commit('auth/logout');
    },
    onClickSelectCategory(item) {
      console.warn('onClickSelectCategory');
      console.log(item);
    },
    onClickCreateCard() {
      this.forms.createCard.active = true;
    },
    async onClickApplyCreateCard() {
      // TODO
    },
    onClickCancelCreateCard() {
      this.forms.createCard.active = false;
    },
  },
};
</script>
