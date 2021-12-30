<template>
  <ul class="pagination">
    <li v-for="page in pages" :key="page" :class="{ active: currentPage === page, 'page-item': true }">
      <router-link class="page-link" :to="{ path: url, query: { page: page } }">
        {{ page }}
      </router-link>
    </li>
  </ul>
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
    url: {
      type: String,
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
