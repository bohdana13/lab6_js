<template>
    <nav class="app-navigation">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/lottery">Lottery</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: "AppNavigation",
  };
  </script>
  
  <style scoped>
  .app-navigation {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: #444;
    color: white;
  }
  </style>
  