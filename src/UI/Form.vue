<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <!-- // FIX duplicate keys '' -->
        <v-text-field
          v-for="prop in model.props"
          v-model="data[prop]"
          :key="prop"
          :label="model.props[prop]"
          :rules="rules[model.rules[prop]]"
        >
          {{ prop }}
        </v-text-field>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  async created() {
    for (let prop in this.model.props) {
      this.data[prop] = '';
    }
  },
  data() {
    return {
      valid: false,
      data: Object.create(this.model.props),
      rules: {
        field: [(v) => !!v || 'Обязательное поле'],
        email: [(v) => /.+@.+/.test(v) || 'Неверный формат электронной почты'],
        number: [(v) => /[0-9]/.test(v) || 'Поле должно быть числом'],
      },
    };
  },
};
</script>
