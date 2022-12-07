<template>
  <div class="login-layout">
    <v-container class="login-content">
      <v-card class="login-card-content">
        <v-card-title>Добро пожаловать на сайт</v-card-title>
        <v-card-actions>
          <v-btn text color="orange">Вход</v-btn>
          <v-btn text color="orange" @click.prevent="onClickRegister"
            >Зарегистрироваться</v-btn
          >
        </v-card-actions>
      </v-card>
      <Form v-if="isRegister" :model="forms.register.model" />
    </v-container>
  </div>
</template>

<script>
import UserRegister from '@/models/model.user.register';
import Form from '@/UI/Form.vue';
export default {
  components: {Form},
  async created() {},
  data() {
    return {
      isRegister: false,
      forms: {register: {model: new UserRegister()}},
    };
  },
  methods: {
    onClickRegister() {
      this.isRegister = true;
    },
  },
};
</script>
