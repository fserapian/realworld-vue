<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="title">Title</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div>
        <label for="description">Description</label>
        <input type="text" name="description" v-model="description">
      </div>
      <div>
        <label for="body">Body</label>
        <textarea type="text" name="body" v-model="body"></textarea>
      </div>
      <div>
        <label for="tagList">Tag List</label>
        <input type="text" name="tagList" v-model="tagList">
      </div>
      <button type="submit">Add Article</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AppArticleForm',
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
        tagList: this.tagList,
      };

      this.$emit('articleSubmit', formData);
    },
  },
};
</script>
