<template>
    <header>
      <h1>Lottery App</h1>
      <AppNavigation />
    </header>
  </template>
  
  <script lang="ts">
  import AppNavigation from './AppNavigation.vue';
  
  export default {
    name: 'AppHeader',
    components: { AppNavigation },
  };
  </script>
  