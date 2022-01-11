<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" alt="Author image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span>
            <router-link
              style="margin-right: 0.5rem"
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit"></i>
              Edit article
            </router-link>
            <button class="btn btn-outline-danger btn-sm">
              <i class="ion-trash-a"></i>
              Delete article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <app-loading v-if="isLoading"></app-loading>
      <app-error-message v-if="error" :message="error"></app-error-message>
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          TAG LIST...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { actionTypes } from '@/store/modules/article';
import AppLoading from '@/components/Loading';
import AppErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'AppArticle',
  components: {
    AppLoading,
    AppErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      article: (state) => state.article.data,
      error: (state) => state.article.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
};
</script>
