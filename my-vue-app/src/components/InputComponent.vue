<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :class="{ 'is-invalid': error }"
      class="form-control"
    />
    <div class="text-danger" v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "InputComponent",
  props: {
    label: String,
    type: String,
    modelValue: String,
    placeholder: String,
    error: String,
  },
  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLInputElement | null;
      if (target) { 
        this.$emit('update:modelValue', target.value);
      }
    },
  },
};
</script>
