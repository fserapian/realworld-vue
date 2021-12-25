<template>
  <div class="error-messages">
    <ul v-for="errorMessage in errorMessages" :key="errorMessage">
      <li>{{ errorMessage }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map((key) => {
        const messages = this.validationErrors[key].join(', ');

        return `${key} ${messages}`;
      });
    },
  },
};
</script>
