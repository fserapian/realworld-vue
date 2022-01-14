<template>
  <div>
    <app-article-form
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    ></app-article-form>
  </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm';

export default {
  name: 'AppCreateArticle',
  components: {
    AppArticleForm,
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      validationErrors: null,
      isSubmitting: false,
    };
  },
  methods: {
    onSubmit(data) {
      console.log('data', data);
    },
  },
};
</script>
