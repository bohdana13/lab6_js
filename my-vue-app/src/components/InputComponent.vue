<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      :class="{ 'is-invalid': error }"
      class="form-control"
    />
    <div class="text-danger" v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: String,
    modelValue: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    error: String,
  },
  emits: ["update:modelValue"],
  methods: {
    updateValue(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target) {
        this.$emit("update:modelValue", target.value);
      }
    },
  },
});
</script>



<style scoped>
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
}

.winner-tags .badge {
  display: flex;
  color: black;
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
</style>
