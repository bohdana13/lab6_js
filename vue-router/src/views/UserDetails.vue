<template>
  <div v-if="user" class="user-details">
    <h2>User Details for {{ user.name }}</h2>
    <p><strong>ID:</strong> {{ user.id }}</p>
    <p><strong>Name:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Role:</strong> {{ user.role }}</p>
    <p><strong>Avatar:</strong></p>
    <img :src="user.avatar" alt="User Avatar" v-if="user.avatar" />
  </div>
  <div v-else>
    <p>Loading user details...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { User } from "../models/User";

export default defineComponent({
  name: "UserDetails",
  setup() {
    const route = useRoute();
    const user = ref<User | null>(null);

    const fetchUser = async (id: string) => {
      try {
        const response = await axios.get<User>(`https://api.escuelajs.co/api/v1/users/${id}`);
        user.value = response.data;
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    onMounted(() => {
      fetchUser(route.params.id as string);
    });

    watch(() => route.params.id, (newId) => {
      if (newId) {
        fetchUser(newId as string);
      }
    });

    return {
      user,
    };
  },
});
</script>

<style scoped>
.user-details {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
img {
  max-width: 100px;
  border-radius: 50%;
}
</style>
