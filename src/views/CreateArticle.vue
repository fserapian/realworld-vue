<template>
  <div>
    <h2>Create Article</h2>
    <app-article-form></app-article-form>
  </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm';

export default {
  name: 'AppCreateArticle',
  components: {
    AppArticleForm,
  },
};
</script>
