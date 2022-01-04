<template>
  <div>
    <app-loading v-if="isLoading"></app-loading>
    <app-error-message v-if="error"></app-error-message>
    <div class="sidebar" v-if="tags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          v-for="tag in tags"
          :key="tag"
          :to="{ name: 'tag', params: { slug: tag } }"
          class="tag-default tag-pill"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { actionTypes } from '@/store/modules/tags';
import AppLoading from '@/components/Loading';
import AppErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'AppTags',
  components: {
    AppLoading,
    AppErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.tags.isLoading,
      error: (state) => state.tags.error,
      tags: (state) => state.tags.data,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getTags);
  },
};
</script>
