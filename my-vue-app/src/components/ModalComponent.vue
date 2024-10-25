<template>
  <Modal v-if="isVisible" @close="cancelDelete">
    <h4>Delete confirmation</h4>
    <p>
      Do you really want to delete the participant "{{ participant?.name }}", "{{ participant?.email }}"?
    </p>
    <button @click="confirmDelete">Yes</button>
    <button @click="cancelDelete">No</button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from './Modal.vue';
import { Participant } from "../models/Participant";

export default defineComponent({
  components: { Modal },
  props: {
    isVisible: Boolean,
    participant: {
    type: Object as () => Participant | null,
    required: false
  }  },
  emits: ['confirm', 'cancel'],
  methods: {
    confirmDelete() {
      this.$emit('confirm');
    },
    cancelDelete() {
      this.$emit('cancel');
    }
  }
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}
</style>
