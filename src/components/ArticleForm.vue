<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <app-validation-errors
            v-if="errors"
            :validationErrors="errors"
          ></app-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  type="text"
                  class="form-control"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Tags"
                  v-model="tagList"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                  type="submit"
                  class="btn btn-lg pull-xs-right btn-primary"
                  :disabled="isSubmitting"
                >
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from '@/components/ValidationErrors';

export default {
  name: 'AppArticleForm',
  components: {
    AppValidationErrors,
  },
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: '',
      description: '',
      body: '',
      tagList: '',
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(','),
      };

      this.$emit('articleSubmit', formData);
    },
  },
};
</script>
