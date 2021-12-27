<template>
  <div class="home">
    <h1>Global Feed</h1>
    <h1>{{ data.articlesCount }}</h1>
    <app-feed></app-feed>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AppFeed from '@/components/Feed.vue'

export default {
  name: 'AppGlobalFeed',
  components: {
    AppFeed
  },
  computed: {
    ...mapState({
      data: (state) => state.feed.data,
    }),
  },
  mounted() {
    this.$store.dispatch('[feed] Get feed');
  }
}
</script>
