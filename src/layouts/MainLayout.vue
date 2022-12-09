<template>
  <v-app id="app">
    <v-card>
      <Form
        v-if="forms.register.active"
        title="Регистрация"
        :active="forms.register.active"
        :model="forms.register.modelData"
        :toSubmit="onClickApplyRegister"
        :toCancel="onClickCancelRegister"
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
        <v-btn
          class="ma-2"
          x-small
          color="red"
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

        <div class="container-user-info">
          <v-avatar color="orange accent-3" size="47">
            <span class="white--text text-h5">
              {{ user ? user.username[0] : '?' }}
            </span>
          </v-avatar>

          <div class="container-user-action">
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
        </div>
      </v-navigation-drawer>
    </v-card>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';
import Form from '@/UI/Form';
import UserRegister from '@/models/model.user.register';

export default {
  components: {Form},
  data() {
    return {
      clickSidebar: true,
      forms: {
        login: {active: false, modelData: undefined},
        register: {active: false, modelData: UserRegister},
      },
    };
  },
  computed: {
    ...mapGetters[{user: 'auth/initState'}],
  },
  watch: {},

  methods: {
    onClickLogIn() {},
    onClickRegister() {
      console.warn('onClickRegister');
      this.forms.register.active = true;
      this.clickSidebar = true;
    },
    async onClickApplyRegister(data) {
      console.warn('onClickRegister');
      console.log(data);
    },
    onClickCancelRegister() {
      console.warn('OnClickCancel Register');
      this.forms.register.active = false;
    },
  },
};
</script>
