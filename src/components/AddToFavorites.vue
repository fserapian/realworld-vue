<template>
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavorited,
      'btn-outline-primary': !isFavorited,
    }"
  >
    <i class="ion-heart" />
    <span>&nbsp; {{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import { actionTypes } from '@/store/modules/addToFavorites';

export default {
  name: 'AppAddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      require: true,
    },
    favoritesCount: {
      type: Number,
      require: true,
    },
    articleSlug: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    };
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic,
      });

      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic = this.favoritesCountOptimistic - 1;
      } else {
        this.favoritesCountOptimistic = this.favoritesCountOptimistic + 1;
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic;
    },
  },
};
</script>
