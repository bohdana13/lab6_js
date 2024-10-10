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
  name: "InputField",
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
