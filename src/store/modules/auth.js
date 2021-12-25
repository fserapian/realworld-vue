import auth from '@/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null,
};

export const mutationTypes = {
  registerStart: '[auth] Register start',
  registerSuccess: '[auth] Register success',
  registerFailure: '[auth] Register failure',
};

export const actionTypes = {
  register: '[auth] Register',
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart);
      auth
        .register(credentials)
        .then((res) => {
          context.commit(mutationTypes.registerSuccess, res.data.user);
          setItem('accessToken', res.data.user.token);
          resolve();
        })
        .catch((err) => {
          context.commit(mutationTypes.registerFailure, err.response.data.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
