<template>
    <div>      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <!-- <th>Actions</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>
              <router-link :to="`/users/${user.id}`">View Details</router-link>
            </td>
            <!-- <td>
              <button @click="openEditUserModal(user)">Edit</button>
            </td> -->
          </tr>
        </tbody>
      </table>
  
      <div v-if="showUserModal" class="modal">
        <div class="modal-content">
          <h3>{{ isCreateMode ? 'Create User' : 'Edit User' }}</h3>
          <UserForm :isCreateMode="isCreateMode" :user="selectedUser" @close="closeUserModal" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import UsersRepository from '../repository/UsersRepository';
  import { User } from "../models/User";
  import UserForm from './UserForm.vue';
  
  export default defineComponent({
    name: "UserTable",
    components: { UserForm },
    setup() {
      const users = ref<User[]>([]);
      const showUserModal = ref(false);
      const isCreateMode = ref(true);
      const selectedUser = ref<Partial<User> | null>(null);
        
      onMounted(async () => {
        users.value = await UsersRepository.fetchParticipants();
      });
  
      const openCreateUserModal = () => {
        isCreateMode.value = true;
        selectedUser.value = { name: "", email: "", password: "", avatar: "" };
        showUserModal.value = true;
      };
  
      const openEditUserModal = (user: User) => {
        isCreateMode.value = false;
        selectedUser.value = { ...user };
        showUserModal.value = true;
      };
  
      const closeUserModal = async () => {
        showUserModal.value = false;
        users.value = await UsersRepository.fetchParticipants(); 
      };
  
      return {
        users,
        showUserModal,
        isCreateMode,
        selectedUser,
        openCreateUserModal,
        openEditUserModal,
        closeUserModal,
      };
    },
  });
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
  }
  </style>
  