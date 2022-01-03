<template>
  <div>
    <ul>
      <li v-for="(tag, index) in tags" :key="index">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { actionTypes } from '@/store/modules/tags';

export default {
  name: 'AppTags',
  methods: {
    fetchTags() {
      // console.log('Tags fetched');
      this.$store.dispatch(actionTypes.getTags);
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tags.data,
    }),
  },
  mounted() {
    this.fetchTags();
  }
};
</script>
