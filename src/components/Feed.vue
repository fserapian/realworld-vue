<template>
  <div class="feed">
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something went wrong</div>
    <div v-if="feed">
      <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
        <div class="article-meta">
          <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
            <img :src="article.author.image">
          </router-link>
          <div class="info">
            <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
      <app-pagination
        :total="total"
        :limit="limit"
        :url="url"
        :current-page="currentPage"
        :pages="pages"
      ></app-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { actionTypes } from '@/store/modules/feed';
import { range } from '@/helpers/utils';
import AppPagination from '@/components/Pagination';

export default {
  name: 'AppFeed',
  components: {
    AppPagination,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      total: 501,
      limit: 20,
      url: '/articles',
      currentPage: 5,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      error: (state) => state.feed.error,
      feed: (state) => state.feed.data,
    }),
    pages() {
      // return Math.ceil(this.total / this.limit);
      const pagesCount = Math.ceil(this.total / this.limit);
      return range(pagesCount, 1);
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed, { apiUrl: this.apiUrl });
  }
}
</script>
