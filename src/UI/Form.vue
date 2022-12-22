<template>
  <div>
    <v-overlay :value="isActive" :dark="false">
      <v-sheet
        :class="
          'pt-2 pb-2 pr-3 pl-3 mx-auto ' +
          (fullscreen ? 'layout-form-fullscreen' : 'layout-form')
        "
      >
        <v-form
          v-model="valid"
          ref="form"
          v-if="!isSucces"
          @submit.prevent="onClickSubmit"
        >
          <div class="form-header-layout">
            <v-card-title class="text-center">{{ title }}</v-card-title>
            {{ fullscreen ? 'layout-form-fullscreen' : '' }}
          </div>

          <div v-for="prop in fields" :key="prop">
            <v-text-field
              v-if="prop.toLowerCase() == 'password'"
              color="orange accent-4"
              type="password"
              v-model="dataForm[prop]"
              :label="model.props[prop]"
              :loading="load"
              :disabled="load"
            >
            </v-text-field>
            <v-text-field
              v-else
              color="orange accent-4"
              v-model="dataForm[prop]"
              :label="model.props[prop]"
              :rules="rules[model.rules[prop]]"
              :loading="load"
              :disabled="load"
            >
            </v-text-field>
          </div>

          <v-card-actions>
            <v-btn text color="green accent-4" @click.prevent="onClickSubmit">
              {{ btnsTitle.submit }}
            </v-btn>
            <v-btn text color="red accent-4" @click.prevent="onClickCancel">
              {{ btnsTitle.cancel }}
            </v-btn>
          </v-card-actions>
        </v-form>
        <slot></slot>
      </v-sheet>
    </v-overlay>
  </div>
</template>

<script>
import {copyObjectProperty} from '@/helpers/helper.objects';
export default {
  props: {
    title: {type: String, required: false},
    isActive: {
      type: Boolean,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    toSubmit: {type: Function, required: false},
    toCancel: {type: Function, required: false},
    btnsTitle: {
      type: Object,
      required: false,
      default() {
        return {submit: 'принять', cancel: 'закрыть'};
      },
    },
    isSucces: {
      type: Boolean,
      required: false,
    },
    fullscreen: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  data() {
    return {
      valid: false,
      load: false,
      dataForm: {},
      fields: [],
      showPassword: false,
      rules: {
        field: [(v) => !!v || 'Обязательное поле'],
        email: [(v) => /.+@.+/.test(v) || 'Неверный формат электронной почты'],
        number: [(v) => /[0-9]/.test(v) || 'Поле должно быть числом'],
      },
    };
  },
  async created() {
    console.log('Form.vue created');
    const propsHide = this.model.propsHide;
    const props = this.model.props;
    const fields = Object.keys(props).filter((item) => !propsHide[item]);
    this.fields = fields;
    const data = copyObjectProperty(props);
    this.dataForm = data;
  },
  watch: {
    isSucces: function (isSucces) {
      if (isSucces) {
        this.load = false;
        this.$refs.form.reset();
      }
    },
  },

  methods: {
    async onClickSubmit() {
      this.load = true;
      console.warn('onClickSubmit');
      const data = this.dataForm;
      console.log(data);

      return await this.toSubmit(data);
    },
    onClickCancel() {
      console.warn('OnClicCancel');
      this.toCancel();
    },
  },
};
</script>
