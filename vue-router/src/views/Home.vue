<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <UserForm :isCreateMode="true" />
      <UserTable />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import UserTable from '../components/UserTable.vue';
  import UserForm from '../components/UserForm.vue';
  
  export default defineComponent({
    components: {
      UserTable,
      UserForm,
    },
  });
  </script>
  