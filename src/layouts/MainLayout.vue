<template>
  <v-app id="app">
    <v-card>
      <v-navigation-drawer
        class="navigation-drawer-layout elevation-7"
        app
        clipped
        permanent
        :mini-variant.sync="clickSidebar"
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
            fill="grey"
            icon-style="thinline"
          />
        </v-btn>

        <div class="container-user-info">
          <v-avatar color="rgba(247,152,36, 0.5)" size="47">
            <span class="white--text text-h5">?</span>
          </v-avatar>
          <div class="container-user-action">
            <v-btn text rounded><span>Войти</span></v-btn>
            <v-btn text rounded><span>Зарегистрироваться</span></v-btn>
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
// import {mapGetters} from 'vuex';

export default {
  components: {},
  data() {
    return {
      clickSidebar: true,
    };
  },
  computed: {},
  watch: {},

  methods: {},
};
</script>
