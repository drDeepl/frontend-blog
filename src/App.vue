<template>
  <v-app id="inspire">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {},
};
</script>
