<template>
  <button :class="['btn', type]" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonComponent",
  props: {
    type: {
      type: String,
      default: "btn-primary",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
});
</script>
