<template>
  <div>
    <v-overlay :value="isActive" :dark="false">
      <!-- TODO  -->
      <v-textarea autocomplete :v-model="text" class="layout-form-fullscreen">
      </v-textarea>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default() {
        return false;
      },
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
  },
  data() {
    return {
      text: '',
    };
  },
};
</script>
