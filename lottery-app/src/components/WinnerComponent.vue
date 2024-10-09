<template>
  <span class="badge blue">
    {{ winner.name }}
    <ButtonComponent @click="handleRemove" class="btn btn-sm btn-danger">&times;</ButtonComponent>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Participant } from "../models/Participant";
import ButtonComponent from "./ButtonComponent.vue"; // Import ButtonComponent

export default defineComponent({
  name: "WinnerComponent",
  components: { ButtonComponent },
  props: {
    winner: {
      type: Object as () => Participant,
      required: true,
    },
    removeWinner: {
      type: Function as () => (index: number) => void, // Define the specific function type
      required: true,
    },
    index: {
      type: Number, // Introduce an index prop to track the winner's position
      required: true,
    },
  },
  setup(props) {
    // Method to handle removing the winner
    const handleRemove = (event: MouseEvent) => {
      props.removeWinner(props.index); // Call removeWinner with the provided index
    };

    return {
      handleRemove,
    };
  },
});
</script>