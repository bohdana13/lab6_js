<template>
  <div class="app">
    <AppHeader />
    <nav>
      <router-link to="/home">Home</router-link>
      <router-link to="/lottery">Lottery</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from './components/AppHeader.vue';
import { useRouter } from "vue-router";
import { useAuth } from './useAuth';
export default defineComponent({
  components: {
    AppHeader,
  },
  setup() {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();
    
    const handleLogout = () => {
      logout();
      router.push("/login");
    };

    return {
      isAuthenticated,
      logout: handleLogout,
    };
  },
});
</script>

<!-- <style lang="scss" scoped>
.lottery-app {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background-color: #f8f9fa;
  padding: 3%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.d-flex {
  display: flex;
  flex-direction: column;
}

.winner-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  &:hover {
      color: rgb(19, 18, 18);
    }
}

.winner-tags .badge {
  display: flex;
  color: rgb(14, 13, 13);
  height: 35px;
  align-items: center;
  gap: 5px;
  padding: 10px;
  font-size: 1rem;
  
}

.blue {
  background-color: rgba(13, 110, 253, 0.5);
}

.winner-tags button {
  margin-left: 2px;
  margin-top: 1px;
}

.gray-border {
  border: solid gray 1px;
  border-radius: 10px;
  padding: 10px;
}

form div {
  margin-bottom: 10px;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
}

table {
  width: 100%;
}

thead {
  background-color: #e9ecef;
}

th,
td {
  padding: 8px;
  text-align: center;
}

button {
  margin-top: 10px;
}
.delete-btn {
  width: 80px;
  height: 30px;
  margin: 0 auto;
  display: block;
}
</style> -->
