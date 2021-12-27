<template>
  <div class="home">
    <h1>Global Feed</h1>
    <app-feed></app-feed>
  </div>
</template>

<script>
import AppFeed from '@/components/Feed.vue'

export default {
  name: 'AppGlobalFeed',
  components: {
    AppFeed
  }
}
</script>
