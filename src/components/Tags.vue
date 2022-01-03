<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something went wrong...</div>
    <div class="sidebar" v-if="tags">
      <!-- <li v-for="(tag, index) in tags" :key="index">
        {{ tag }}
      </li> -->
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

export default {
  name: 'AppTags',
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
