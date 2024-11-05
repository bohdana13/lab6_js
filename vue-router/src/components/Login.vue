<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" placeholder="Enter email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Enter password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuth } from "../useAuth";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();
    const { login } = useAuth();
    
    const handleLogin = async () => {
      try {
        const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
          email: email.value,
          password: password.value,
        });

        login(response.data.access_token, response.data.refresh_token);

        router.push("/home");
      } catch (error) {
        errorMessage.value = "Invalid email or password";
        console.error("Login failed:", error);
      }
    };

    return {
      email,
      password,
      errorMessage,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
