import feed from '@/api/feed';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getFeedStart: '[feed] Get feed start',
  getFeedSuccess: '[feed] Get feed success',
  getFeedFailure: '[feed] Get feed failure',
};

export const actionTypes = {
  getFeed: '[feed] Get feed',
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getFeed](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getFeedStart);
      feed
        .getFeed()
        .then((res) => {
          context.commit(mutationTypes.getFeedSuccess, res.data);
          resolve(res.data);
        })
        .catch(() => {
          context.commit(mutationTypes.getFeedFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
