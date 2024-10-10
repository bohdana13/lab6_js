<template>
  <span class="badge blue" v-if="winner">
    {{ winner.name }}
    <button @click="removeWinner" class="btn btn-sm btn-danger">&times;</button>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Participant } from "../models/Participant";

export default defineComponent({
  name: "WinnerComponent",
  props: {
    winner: {
      type: Object as PropType<Participant>,
      required: true,
    },
    removeWinner: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const removeWinner = () => {
      props.removeWinner();
    };

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      removeWinner,
    };
  },
});
</script>
