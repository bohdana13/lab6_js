<template>
  <button
    class="btn btn-primary"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: "ButtonComponent",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
};
</script>
