import auth from '@/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

const state = {
  isLoading: false,
  isSubmitting: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null,
};

export const mutationTypes = {
  registerStart: '[auth] Register start',
  registerSuccess: '[auth] Register success',
  registerFailure: '[auth] Register failure',

  loginStart: '[auth] Login start',
  loginSuccess: '[auth] Login success',
  loginFailure: '[auth] Login failure',

  getCurrentUserStart: '[auth] Get current user start',
  getCurrentUserSuccess: '[auth] Get current user success',
  getCurrentUserFailure: '[auth] Get current user failure',

  updateCurrentUserStart: '[auth] Update current user start',
  updateCurrentUserSuccess: '[auth] Update current user success',
  updateCurrentUserFailure: '[auth] Update current user failure',
};

export const actionTypes = {
  register: '[auth] Register',
  login: '[auth] Login',
  getCurrentUser: '[auth] Get current user',
  updateCurrentUser: '[auth] Update current user',
};

export const getterTypes = {
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
  currentUser: '[auth] currentUser',
};

const getters = {
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
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
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
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
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart);
      auth
        .login(credentials)
        .then((res) => {
          context.commit(mutationTypes.loginSuccess, res.data.user);
          setItem('accessToken', res.data.user.token);
          resolve();
        })
        .catch((err) => {
          context.commit(mutationTypes.loginFailure, err.response.data.errors);
        });
    });
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart);
      auth
        .getCurrentUser()
        .then((res) => {
          context.commit(mutationTypes.getCurrentUserSuccess, res.data.user);
          resolve();
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure);
        });
    });
  },
  [actionTypes.updateCurrentUser](context, { currentUserInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateCurrentUserStart);
      auth
        .updateCurretUser(currentUserInput)
        .then((res) => {
          context.commit(mutationTypes.updateCurrentUserSuccess, res.data.user);
          resolve();
        })
        .catch((err) => {
          context.commit(mutationTypes.updateCurrentUserFailure, err.response.data.errors)
        });
    });
  },
  [actionTypes.logout](context) {
    context.commit(mutationTypes.logout);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
