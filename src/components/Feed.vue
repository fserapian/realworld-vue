<template>
  <div class="feed">
    <app-loading v-if="isLoading"></app-loading>
    <app-error-message v-if="error"></app-error-message>
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
          <div class="pull-xs-right">
            <app-add-to-favorites
              :is-favorited="article.favorited"
              :favorites-count="article.favoritesCount"
              :article-slug="article.slug"
            >
            </app-add-to-favorites>
          </div>
        </div>
        <router-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <app-tag-list :tags="article.tagList"></app-tag-list>
        </router-link>
      </div>
      <app-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :url="baseUrl"
        :current-page="currentPage"
        :pages="pages"
      ></app-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { parseUrl, stringify } from 'query-string';

import { actionTypes } from '@/store/modules/feed';
import { range } from '@/helpers/utils';
import { limit } from '@/helpers/vars';
import AppPagination from '@/components/Pagination';
import AppLoading from '@/components/Loading';
import AppErrorMessage from '@/components/ErrorMessage';
import AppTagList from '@/components/TagList';
import AppAddToFavorites from '@/components/AddToFavorites';

export default {
  name: 'AppFeed',
  components: {
    AppPagination,
    AppLoading,
    AppErrorMessage,
    AppTagList,
    AppAddToFavorites,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      error: (state) => state.feed.error,
      feed: (state) => state.feed.data,
    }),
    pages() {
      const pagesCount = Math.ceil(this.feed.articlesCount / this.limit);
      return range(pagesCount, 1);
    },
    limit() {
      return limit;
    },
    baseUrl() {
      return this.$route.path;
    },
    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    offset() {
      return this.currentPage * limit - limit;
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
  data() {
    return {
      // isFavorited: 
    };
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });

      this.$store.dispatch(actionTypes.getFeed, { apiUrl: `${parsedUrl.url}?${stringifiedParams}` });
    },
  },
};
</script>
