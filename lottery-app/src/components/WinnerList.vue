<template>
  <div class="card">
    <div class="d-flex">
      <div class="winner-tags gray-border">
        <Winner
          v-for="(winner, index) in winners"
          :key="index"
          :winner="winner"
          :removeWinner="() => removeWinner(index)"
        />
        <span class="badge">Winners</span>
      </div>
    </div>
    <button
      class="btn btn-primary mt-2"
      :disabled="winners.length >= 3 || participants.length === 0"
      @click="selectWinner"
    >
      New Winner
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Participant } from "../models/Participant";
import Winner from "./WinnerComponent.vue";

export default defineComponent({
  name: "WinnerListBlock",
  components: {
    Winner,
  },
  props: {
    winners: {
      type: Array as PropType<Participant[]>,
      required: true,
    },
    participants: {
      type: Array as PropType<Participant[]>,
      required: true,
    },
    selectWinner: {
      type: Function as PropType<() => void>,
      required: true,
    },
    removeWinner: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
  },
  setup(props) {
    const removeWinner = (index: number) => {
      props.removeWinner(index);
    };

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      removeWinner,
    };
  },
});
</script>
<style scoped>
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
</style>
