<template>
  <span class="badge blue" v-if="winner">
    {{ winner.name }}
    <button @click="handleRemove" class="btn btn-sm">&times;</button>
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
    const handleRemove = () => {
      props.removeWinner();  // Call the removeWinner prop function when the button is clicked
    };

    return {
      handleRemove,
    };
  },
});
</script>


<style scoped>
.lottery-app {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

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

form div {
  margin-bottom: 10px;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
}

table {
  width: 100%;
}

thead {
  background-color: #e9ecef;
}

th,
td {
  padding: 8px;
  text-align: center;
}

button {
  margin-top: 10px;
}
</style>

