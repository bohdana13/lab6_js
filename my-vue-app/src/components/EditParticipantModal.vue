<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Modal v-if="isVisible" @close="cancelEdit">
    <h3>Edit Participant</h3>
    <div>
      <InputComponent 
        :id="idName"
        label="Name"
        type="text"
        v-model="participant.name"
      />
      
      <InputComponent 
        :id="idDateOfBirth"
        label="Date of Birth"
        type="date"
        v-model="participant.dateOfBirth"
      />
     
      <InputComponent 
        :id="idEmail"
        label="Email"
        type="email"
        v-model="participant.email"
      />
      
      <InputComponent 
        :id="idPhone"
        label="Phone Number"
        type="text"
        v-model="participant.phoneNumber"
      />
    </div>
    <button @click="saveChanges">Save</button>
    <button @click="cancelEdit">Cancel</button>
  </Modal>
</template>

<script>
import { defineComponent } from 'vue';
import Modal from './Modal.vue';
import InputComponent from './InputComponent.vue';

export default defineComponent({
  components: { Modal, InputComponent },
  props: {
    participant: Object,
    isVisible: Boolean,
    id: String,
    idName: String,
    idEmail: String,
    idDateOfBirth: String,
    idPhone: String,
  },
  emits: ['update', 'cancel'],
  methods: {
    saveChanges() {
      this.$emit('update', this.participant);
    },
    cancelEdit() {
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
  background-color: rgba(179, 170, 170, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}
</style>
