<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <app-validation-errors
            :validation-errors="validationErrors"
          ></app-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="formData.image"
                  placeholder="URL of profile image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="formData.username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  type="text"
                  class="form-control form-control-lg"
                  v-model="formData.bio"
                  placeholder="Short bio about you"
                >
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="formData.image"
                  placeholder="URL of profile image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="formData.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="formData.password"
                  placeholder="Password"
                />
              </fieldset>
              <button type="submit" class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting">Update Settings</button>
            </fieldset>
            <hr>
            <button type="button" class="btn btn-outline-danger" @click="logout">Or click here to logout</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import AppValidationErrors from '@/components/ValidationErrors';
import {
  getterTypes as authGetterTypes,
  actionTypes as authActionTypes,
} from '@/store/modules/auth';

export default {
  name: 'AppSettings',
  components: {
    AppValidationErrors,
  },
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
      this.$store.dispatch(authActionTypes.logout).then(() => {
        this.$router.push({ name: 'globalFeed' });
      });
    },
  },
};
</script>
