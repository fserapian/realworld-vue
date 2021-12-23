import auth from '@/api/auth';

const state = {
  isSubmitting: false,
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
  },
  registerSuccess(state) {
    state.isSubmitting = false;
  },
  registerFailure(state) {
    console.log('register failure running');
    state.isSubmitting = false;
  }  
};

const actions = {
  register(context, credentials) {
    return new Promise((resolve, reject) => {
      auth.register(credentials)
        .then((res) => {
          console.log('success', res);
          context.commit('registerSuccess');
          resolve(res);
      })
        .catch((err) => {
          console.log('error', err.response.data.errors);
          context.commit('registerFailure');
          reject('Rejection!', err);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions,
};
