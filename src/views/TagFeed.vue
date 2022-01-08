<template>
  <div class="home-page">
    <app-banner></app-banner>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed :api-url="apiUrl"></app-feed>
        </div>
        <div class="col-md-3">
          <div>
            <app-tags></app-tags>
            {{ tagName }}
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

export default {
  name: 'AppTagFeed',
  components: {
    AppFeed,
    AppTags,
    AppBanner,
  },
  computed: {
    tagName() {
      return this.$route.params.slug;
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`;
    },
  },
}
</script>
