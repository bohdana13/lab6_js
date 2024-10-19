<template>
  <div class="card">
    <div class="d-flex"> 
  <div class="winner-tags gray-border">
    <WinnerComponent
      v-for="(winner, index) in winners"
      :key="index"
      :winner="winner"
      @remove="removeWinner(index)"
    />
    <span class="badge">Winners</span>
  </div>

</div>
</div>



</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WinnerComponent from "./WinnerComponent.vue";
import { Participant } from '../models/Participant'; // Імпортуємо тип Participant

export default defineComponent({
  name: "WinnerList",
  components: { WinnerComponent },
  props: {
    winners: {
      type: Array as PropType<Participant[]>, // Визначаємо, що winners — це масив Participant
      required: true,
    },
  },
  emits: ["remove-winner"],
  methods: {
    removeWinner(index: number) {
      this.$emit("remove-winner", index);
    },
  },
});
</script>
