<template>
  <span class="badge blue">
    {{ winner.name }}
    <button @click="remove" class="btn btn-sm">&times;</button>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Participant } from '../models/Participant';

export default defineComponent({
  name: "WinnerComponent",
  props: {
    winner: {
      type: Object as PropType<Participant>,
      required: true
    }
  },
  emits: ["remove"],
  methods: {
    remove() {
      this.$emit("remove");
    }
  }
});
</script>

<style scoped>
.winner-tags .badge {
  display: flex;
  color: rgb(249, 249, 249);
  height: 35px;
  align-items: center;
  gap: 5px;
  padding: 10px;
  font-size: 1rem;
  
}

.blue {
  background-color: rgba(13, 110, 253, 0.5);
}
</style>
