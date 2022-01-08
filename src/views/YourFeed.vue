<template>
  <div class="home-page">
    <app-banner></app-banner>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-toggler></app-feed-toggler>
          <app-feed :api-url="apiUrl"></app-feed>
        </div>
        <div class="col-md-3">
          <div>
            <app-tags></app-tags>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from '@/components/Feed';
import AppTags from '@/components/Tags';
import AppBanner from '@/components/Banner';
import AppFeedToggler from '@/components/FeedToggler';

export default {
  name: 'AppYourFeed',
  components: {
    AppFeed,
    AppTags,
    AppBanner,
    AppFeedToggler,
  },
  data() {
    return {
      apiUrl: '/articles/feed',
    };
  },
}
</script>
