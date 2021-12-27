<template>
  <div class="home-page">
    <h2>BANNER</h2>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed :api-url="apiUrl"></app-feed>
        </div>
        <div class="col-md-3">
          <div>POPULAR TAGS</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from '@/components/Feed';

export default {
  name: 'AppGlobalFeed',
  components: {
    AppFeed
  },
  data() {
    return {
      apiUrl: '/articles',
    };
  },
}
</script>
