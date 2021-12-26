<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand">
        MediumClone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'home' }"
            >Home</router-link
          >
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'createArticle' }">
              <i class="ion-compose"></i> New Post
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'settings' }">
              <i class="ion-gear-a"></i> Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'userProfile', params: { slug: currentUser.username } }">
              <img class="user-pic" :src="currentUser.image" /> {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if="!isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }">
              Sign up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppTopbar',
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.isLoggedIn,
      currentUser: (state) => state.auth.currentUser,
    }),
  },
};
</script>
