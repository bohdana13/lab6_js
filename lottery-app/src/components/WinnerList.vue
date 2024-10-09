<template>
  <div class="winner-tags gray-border">
    <WinnerComponent
      v-for="(winner, index) in winners"
      :key="index"
      :winner="winner"
      :removeWinner="() => removeWinner(index)"
    />
    <span class="badge">Winners</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WinnerComponent from "./WinnerComponent.vue";
import { Participant } from "../models/Participant";

export default defineComponent({
  name: "WinnerList",
  components: { WinnerComponent },
  props: {
    winners: {
      type: Array as () => Participant[],
      required: true,
    },
    removeWinner: {
      type: Function,
      required: true,
    },
  },
});
</script>
