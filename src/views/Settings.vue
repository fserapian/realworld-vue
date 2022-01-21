<template>
  <div v-if="currentUser">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="image">Image</label>
        <input type="text" id="image" name="image" v-model="formData.image" />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          v-model="formData.username"
        />
      </div>
      <div class="form-group">
        <label for="bio">Bio</label>
        <input type="text" id="bio" name="bio" v-model="formData.bio" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" v-model="formData.email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          v-model="formData.password"
        />
      </div>
      <button type="submit">Update</button>
    </form>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import {
  getterTypes as authGetterTypes,
  actionTypes as authActionTypes,
} from '@/store/modules/auth';

export default {
  name: 'AppSettings',
  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      validationErrors: (state) => state.settings.validationErrors,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    formData() {
      if (this.currentUser) {
        return {
          image: this.currentUser.image,
          username: this.currentUser.username,
          bio: this.currentUser.bio,
          email: this.currentUser.email,
          password: '',
        };
      }

      return {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
      };
    },
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(authActionTypes.updateCurrentUser, {
        currentUserInput: this.formData,
      });
    },
    logout() {
      this.$store.dispatch(authActionTypes.logout)
        .then(() => {
          this.$router.push({ name: 'globalFeed' });
        });
    },
  },
};
</script>
