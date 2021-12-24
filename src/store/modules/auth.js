import auth from '@/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null,
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  registerFailure(state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      context.commit('registerStart');
      auth
        .register(credentials)
        .then((res) => {
          context.commit('registerSuccess', res.data.user);
          setItem('accessToken', res.data.user.token);
          resolve();
        })
        .catch((err) => {
          context.commit('registerFailure', err.response.data.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
