<template>
  <div class="pagination">
    PAGINATION!!!!
    <ul>
      <li>{{ total }}</li>
      <li>{{ limit }}</li>
      <li>{{ currentPage }}</li>
      <li>{{ pages }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    pages: {
      type: Array,
      required: true,
    },
  },
};
</script>
