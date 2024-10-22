<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="modal" v-if="isVisible" @keyup.esc="cancelUpdate">
    <div class="modal-content">
      <h4>Edit Participant</h4>
      <form @submit.prevent="submitUpdate">
        <InputComponent
          label="Name"
          v-model="participant.name"
          type="text"
          placeholder="Enter user name"
          :error="errors.name"
        />
        <InputComponent
          label="Date of Birth"
          v-model="participant.dateOfBirth"
          type="date"
          :error="errors.dateOfBirth"
        />
        <InputComponent
          label="Email"
          v-model="participant.email"
          type="email"
          placeholder="Enter email"
          :error="errors.email"
          disabled
        />
        <InputComponent
          label="Phone number"
          v-model="participant.phoneNumber"
          type="tel"
          placeholder="Enter phone number"
          :error="errors.phoneNumber"
        />
        <ButtonComponent type="submit">Update data</ButtonComponent>
      </form>
      <ButtonComponent @click="cancelUpdate" class="btn btn-secondary">Cancel</ButtonComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import InputComponent from "./InputComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
import { Participant } from '../models/Participant';
import { Validator } from '../validation/Validator';

export default defineComponent({
  name: "EditParticipantModal",
  components: { InputComponent, ButtonComponent },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    participant: {
      type: Object as () => Participant,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    }
  },
  emits: ["update", "cancel"],
  setup(props, { emit }) {
    const errors = ref(props.errors);

    const submitUpdate = () => {
      errors.value.name = Validator.validateName(props.participant.name);
      errors.value.dateOfBirth = Validator.validateDateOfBirth(
        props.participant.dateOfBirth, 
        new Date().toISOString().split('T')[0]
      );
      errors.value.phoneNumber = Validator.validatePhoneNumber(props.participant.phoneNumber);

      if (!errors.value.name && !errors.value.dateOfBirth && !errors.value.phoneNumber) {
        emit("update", props.participant);
      }
    };

    const cancelUpdate = () => {
      emit("cancel");
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        cancelUpdate();
      }
    };

    onMounted(() => {
      document.addEventListener('keyup', handleKeyUp);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keyup', handleKeyUp);
    });

    return {
      submitUpdate,
      cancelUpdate,
    };
  },
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
}
</style>
