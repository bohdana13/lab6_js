<template>
  <div class="search-bar">
    <input
      v-model="searchTerm"
      @input="filterByName"
      type="text"
      class="form-control"
      placeholder="Search by name..."
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchBar",
  emits: ["filter-by-name"],
  setup(_, { emit }) {
    const searchTerm = ref("");

    const filterByName = () => {
      emit("filter-by-name", searchTerm.value);
    };

    return {
      searchTerm,
      filterByName,
    };
  },
});
</script>

<style scoped>
.search-bar {
  margin-bottom: 15px;
}
</style>
