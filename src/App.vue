<template>
  <div id="app">
    <app-topbar></app-topbar>
    <router-view></router-view>
  </div>
</template>

<script>
import AppTopbar from '@/components/Topbar';

export default {
  name: 'App',
  components: {
    AppTopbar,
  },
};
</script>
