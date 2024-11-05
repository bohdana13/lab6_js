<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name</label>
      <input v-model="userData.name" id="name" type="text" placeholder="Enter name" />
    </div>
    <div>
      <label for="email">Email</label>
      <input v-model="userData.email" id="email" type="email" placeholder="Enter email" />
    </div>
    <div v-if="isCreateMode">
      <label for="password">Password</label>
      <input v-model="userData.password" id="password" type="password" placeholder="Enter password" />
    </div>
    <div v-if="isCreateMode">
      <label for="avatar">Avatar URL</label>
      <input v-model="userData.avatar" id="avatar" type="text" placeholder="Enter avatar URL" />
    </div>
    <button type="submit">{{ isCreateMode ? 'Create User' : 'Update User' }}</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { User } from "../models/User";

export default defineComponent({
  name: "UserForm",
  props: {
    isCreateMode: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const userData = ref<Partial<User>>({
      name: "",
      email: "",
      password: "",
      avatar: "",
    });

    onMounted(async () => {
      if (!props.isCreateMode) {
        const userId = route.params.id;
        try {
          const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${userId}`);
          userData.value = response.data;
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    const handleSubmit = async () => {
      if (props.isCreateMode) {
        try {
          await axios.post("https://api.escuelajs.co/api/v1/users/", {
            name: userData.value.name,
            email: userData.value.email,
            password: userData.value.password,
            avatar: userData.value.avatar,
          });
          alert("User created successfully!");
        } catch (error) {
          console.error("Error creating user:", error);
        }
      } else {
        const userId = route.params.id;
        try {
          await axios.put(`https://api.escuelajs.co/api/v1/users/${userId}`, {
            name: userData.value.name,
            email: userData.value.email,
          });
          alert("User updated successfully!");
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }
      router.push("/users");
    };

    return {
      userData,
      handleSubmit,
    };
  },
});
</script>
