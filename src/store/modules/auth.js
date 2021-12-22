const state = {
  isSubmitting: false,
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
  },

  registerSuccess(state) {
    state.isSubmitting = false;
  }
};

const actions = {
  register(context) {
    context.commit('registerStart');
    setTimeout(() => {
      context.commit('registerSuccess');
    }, 2000);
  },
};

export default {
  state,
  mutations,
  actions,
};
